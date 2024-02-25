// recordar que el readonly no lo ha inmutable, solo te da un error cuando escribes o lo intentas, son diferentes xd al compilar sigue siendo mutable xd
// al declarar un array por defecto es never :o
// const languages = [];

// las tuplas son mutables, por eso está mejor agregarle un readonly

// type Coordinates = readonly [number, number];
// type Coordinates = [number, number];
// const myCoordinate: Coordinates = [0, 0];
// myCoordinate.push(4)
// console.log(myCoordinate)

// enums para hacer el código más limpio, similar a un objeto de constantes, notar que no usa el = y compilar a JS un código :o 
// comparar ambos códigos al traspilar 
// enum ERROR_TYPES {
const enum ERROR_TYPES {
  NOT_FOUND = "not_found",
  SERVER_ERROR = "server_error",
  BAD_REQUEST = "bad_request",
}

function mostrarMensajeError (error: ERROR_TYPES) {
  // console.log(error);

  if (error === ERROR_TYPES.SERVER_ERROR) {
    console.log(error)
  }

  if (error === ERROR_TYPES.NOT_FOUND) {
    console.log(error)
  }

  if (error === ERROR_TYPES.BAD_REQUEST) {
    console.log(error)
  }
}

// usar el const enum para generar menos código o 
// usar el enum directo si tu código se consumirá externamente como si fuera una librería, pues ayuda a un JS dev a tener las constantes

// aserciones de tipo
// cuando ts no es capaz de inferir el tipo de dato porque así está diseñado o porque es externo se usa el as para indicar que ya no dude y confie en nosotros xd
// el problema es que no somos confiables xd y cualquier cosa externa puede pasar, no lo sabremos hasta que pase o los test lo indiquen, no fiarse del as 
// el codeium agregó un ! al final antes del ; significa lo mismo, confía en que no será nulo, pero en realidad sí puede ser nulo si no encuentra esa clase o id xd
// const canvas = document.querySelector("canvas")!;
// const ctx = canvas.getContext("2d")!;
// el ts solito marca que canvas puede ser un null o undefined, lo que no es bueno xd 

// 3 soluciones al HTMLElement del DOM de JS en el navegador
// acá peta porque puede ser null como en este caso que estamos corriéndolo localmente en node desde backend, desde el front en chrome sí funcaría al traspilar con un build, pero digamos que estamos buscando el span en el DOM de JS y no era el canvas, igual daría un null
// const canvas = document.querySelector("canvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");

// ahora hacemos una validación para evitar el null, pero como ts solo reconoce el HTMLElement no va a encontrar el método de getContext propio de un canvas tag, por eso usamos el asertion type dentro de la validación del null
// const canvas = document.querySelector("canvas");
// if (canvas === null) {
//   const ctx = (canvas as HTMLCanvasElement).getContext("2d");
// }

// finalmente lo mejor es validar con un instanceof y dentro el mismo ts podrá inferir su tipo de dato
// funciona en ts y js porque es nativo xd es bueno adoptar el js cuando busquemos evitar el error en tiempo de ejecución pues ahí ya no actúa ts
// instanceof es potente para inferir tipos de datos sobretodo para asegurar que funque en ejecución y tengamos el tipo de dato en ts estático antes de compilar
// typeof es para tipos primitivos y instanceof para objetos
// const canvas = document.querySelector("canvas");
// if (canvas instanceof HTMLCanvasElement) {
//   const ctx = canvas.getContext("2d");
// }

// para usar await hay que renombrar a .mts de module ts según la documentación parece omitiremos esta parte xD ver en el otro file add.ts

//  interfaces son intercambiables con types en el 99% de veces menos la sobreescritura
// las interfaces son contratos que modelan o moldean el comportamiento de un objeto o clase nada más, la lógica interna viene luego de implementar o extender

interface Producto {
  id: number
  name: string
  price: number
  quantity: number
}

interface Zapatilla extends Producto {
  brand: string
  color: string
}

// interface carritoOps {
//   addProduct(product: Zapatilla): void
//   removeProduct(id: number): void
// }

// interface carritoOps {
//   addProduct: (product: Zapatilla) =>  void
//   removeProduct:(id: number)=> void
//   getProducts:()=> Zapatilla[]
//   getTotal:()=> number
// }

// esto con los types no ocurre, pero con interface sí ocurre, es la única diferencia resaltante que hay xd extiende automáticamente
interface carritoOps {
  addProduct: (product: Zapatilla) => void
  removeProduct: (id: number) => void
}

interface carritoOps {
  getProducts(): Producto[]
  getTotal(): number
  clear(): void
}

interface CarritoCompras {
  totalPrice: number
  products: Producto[]
}

const carrito: CarritoCompras = {
  totalPrice: 0,
  products: [],
}

const ops: carritoOps = {
  addProduct(product: Zapatilla) {
    carrito.totalPrice += product.price
    carrito.products.push(product)
  },
  removeProduct(id: number) {
    carrito.totalPrice -= carrito.products[id].price
    carrito.products.splice(id, 1)
  },
  getProducts() {
    return carrito.products
  },
  getTotal() {
    return carrito.totalPrice
  },
  clear() {
    carrito.totalPrice = 0
    carrito.products = []
  },
}

// diferencias interface vs type
// la de arriba de la sobreescritura que extiende automáticamente es la más resaltante
// ahora las interfaces sí aguanta template union type :o

interface Test {
  id: number
  name: `test-${string}`
}

const test: Test = {
  id: 1,
  name: "test-1",
}

// el type me parece más cómodo xd es más cercano a los primitivos, mientras que interface es maestro de las clases

// narrowing o type guard

function mostrarLongitud(obj: string | number) {
  if (typeof obj === "string") {
    return console.log(obj.length)
  } 

  return console.log(obj.toLocaleString().length)
}

// company = 'Nintendo'
interface Mario {
  company: string
  nombre: string
  saltar: () => void
}

// company = 'Sega'
interface Sonic {
  company: string
  nombre: string
  correr: () => void
}

type Personaje = Mario | Sonic

// usar un type guard booleano
// si tienen un discriminante como 'company' Nintendo o Sega es fácil, pero sino lo mejor es crear un booleano para aplicar narrowing
// el instanceof es eficiente cuando se trata de instancias xd y mejor cuando son varias para evitar tanto checkIs...
// lo malo es que tu código se hace más verboso, pero la validación ocurre en runtime pues es JS
function checkIsSonic(personaje: Personaje): personaje is Sonic {
  return (personaje as Sonic).correr !== undefined
}

function checkIsMario(personaje: Personaje): personaje is Mario {
  return (personaje as Mario).saltar !== undefined
}

function jugar(personaje: Personaje) {
  // if ("saltar" in personaje) {
  //   return personaje.saltar()
  // } 

  // esto falla sea 'Mario' o Mario
  // if (typeof personaje === 'Mario' ) {
  //   return personaje.saltar()
  // }

  if (checkIsSonic(personaje)) {
    return personaje.correr()
  }

  // así se puede ver el never
  // if (checkIsMario(personaje)) {
  //   return personaje.saltar()
  // }

  // aquí se ve una intersección por teoría de conjuntos: el | es un or que suma todas las props, arriba entra si es Sonic, acá entra si no es Sonic y para que no sea Sonic basta que le falte un campo o tengo un campo de más -> en tipado fuerte o estático ese is Sonic significa que solo tiene las props de Sonic ni más ni menos, en este caso la intersección es company y nombre, daría never si no hubiera intersección es decir fueran excluyentes como string y number o simplemente borrásemos el company y nombre xd
  if (!checkIsSonic(personaje)) {
    return personaje.saltar()
  }

  return personaje.nombre
}

// tipo never investigar porque midu se loqueó xd arriba le entendí
function fn2(obj: string | number) {
  if (typeof obj === "string") {
    return obj.toLocaleUpperCase
  }

  if (typeof obj === "number") {
    return obj.toFixed
  }

  return obj
}

// clases
// existe el readonly private public protected todo igual al POO Java
// notar que el private no traspila a diferencia del # nativo de js que sí lo hace
// lo normal es importar el types.d.ts que no tenga código d de definitions
// las clases son nativas de js desde hace un tiempo es5 o es6 supongo por eso funcionan en runtime mientras que interface solo en compilación y desaparecen en runtime, por eso se usan más como contratos, si hay que inicializar props o métodos usar clase