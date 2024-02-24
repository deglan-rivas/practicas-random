// 1. ts NO FUNCIONAs  en el tiempo de ejecución, "traspila" que es lo mismo que compilar pero no a binario sino a js xd, el navegador sigue usando js como lenguaje -> validar con ts playground
// cada vez hay más gente usando ts, da más ventajas por eso microsoft creó js xd por eso Google lo adoptó en angular por ejemplo xd, lo hace legible y hasta sirve como documentación
// extesnsión de typescript error prettier para ver errores más bonitos : v
// 2. ts usa tipos fuertes y ESTÁTICOS por su tiempo de ejecución, las validaciones de hacen antes de compilar, luego ya no funciona nada y vuelve a js, habría que usar js nativo -> validar con el playground use strict o Object.freeze, 
// 3. lo mejor es dejar que ts infiera los datos como se ve abajo, sin declarar su tipo de dato, el mismo puede sugerir los métodos, soporta todos lso tipos de datos clásicos de js como null o undefined

// const number = 5;
// let n: number = 5;

// let a = 'hola';
// let aaaa = null;
// let b:undefined = undefined;

// ---
// 4. tipo de dato any signfiica que ignore el tipado de ts, por eso ya no autocompleta, SIEMPRE evitarlo xd, tipo de dato unknown es que no sabemos su tipo de dato, por eso tampoco puede extraer values .aa

let aa: unknown = 'hola';
// aa.aa;

// inferencia
const a=1;
const b=2;
const c=a+b;

// let cadena: string = 'hola';
let cadena = 'hola';
// autocompletado de métodos propios para un string sin definirle el tipo a "cadena"
console.log(cadena.toLocaleUpperCase());

// 5. por defecto, las funciones asignan el any a sus params, si no tiene contexto no aplicará inferencia, pues nacen como any xd, el contexto se verá más adelante con el narrowing en donde sí podrá inferir, por ahora siempre definir tipo de dato así

function fn(cadena: string): void {
  console.log(cadena);
}

// fn(1);
fn('hola');

// tipar funciones sin interface ni types xd
// notar que no se puede desestructurar y tipar al mismo tiempo en params, pues así js es como renombra :'v, ejm: en los imports se desestructura y renombra con : 

// function saludar({ name }: { name: string }) {
//   console.log(`hola ${name}`);
// }

// function saludar(persona: { name: string }) {
//   const { name } = persona;
//   console.log(`hola ${name}`);
// }

// por lo general no se define lo que devuelve la función pues nos valemos de la inferencia de datos, siempre que se puede hay que valerse de la inferencia
// al colocar el cursor sobre saludar ahora nos da un : number pues retorna el age que es number y no se puede volcar en un string
// function saludar(persona: { name: string, age: number }) {
//   const { name, age } = persona;
//   console.log(`hola ${name}`);
//   return age;
// }

// let mensajeSaludo: string
// mensajeSaludo = saludar({ name: 'hola', age: 5 });

// callbacks o composiciones de funciones primer orden con hco en js
// buena pepa genera codeium xd el github copilot de los pobres

// const add = (a: number, b: number) => a + b;
// const multiply = (a: number, b: number) => a * b;

// const higherOrderFunction = (callback: (a: number, b: number) => number, x: number, y: number) => {
//     return callback(x, y);
// };

// console.log(higherOrderFunction(add, 3, 4)); // Output: 7
// console.log(higherOrderFunction(multiply, 3, 4)); // Output: 12

// el Function no debe usarse pues es el any de las funciones, tipar la función
// const sayHiFromFunction = (fn: Function) => {
  // el void indica que no importa lo que devuelva, útil para cuando no se hace nada como console.log(), aún así si devuelve algo no da error y lo usa
  const sayHiFromFunction = (fn: (n: string) => void) => {
  fn('Miguel');
  return 3;
}

const sayHi = (name: string) => {
  console.log(`hola ${name}`);
}

const respuesta = sayHiFromFunction(sayHi)
console.log(respuesta)

// tipar las arrow function 2 formas 
const add = (a: number, b: number): number => a + b;
const multiply: (a: number, b: number) => number = (a: number, b: number) => a * b;

// tipo never es para funciones que nodeuvelven nada como throw error, así te aseguras que nunca devolverá valor, void sí puede devolver, pero no nos importa, es más permisivo

// la inferencia no depende de si es función anónima, igualmente siempre validar con el cursor que infiera correctamente, usar forEach, map

// type alias es crear nuestros propios tipos, SIEMPRE usar PascalCase: type Hero
// el ?: indica propiedades opcionales

// template union types para tipar strings con formato
type HeroId = `${string}-${string}-${string}-${string}-${string}`
type HeroScalePower = 'super' | 'mega' | 'ultra'

// type Hero = {
//   // id?: string,
//   // recordar que esto no indica que el código sea inmutable, sino que mientras codeamos ts nos avisa, una vez compilado se va la magia, habría que usar el Object.freeze()
//   readonly id?: HeroId,
//   name: string,
//   age: number,
//   isActive?: boolean,
//   scalePower?: HeroScalePower
// }

// se puede refactorizar el type usando los unions types cuando haya una intersección de los campos
type HeroBasicInfo = {
  name: string,
  age: number,
}

type HeroExtraInfo = {
  isActive?: boolean,
  scalePower?: HeroScalePower
  readonly id?: HeroId
}

type Hero = HeroBasicInfo & HeroExtraInfo

function createHero(input: HeroBasicInfo): Hero {
  const { name, age } = input;
  return {
    id: crypto.randomUUID(),
    name,
    age,
    isActive: true,
    scalePower: 'mega'
  }
}

const thor = createHero({
  name: 'thor',
  age: 1000,
})
console.log(thor)
// autocompleta solo el nullish ?: que pregunta y si no tiene id da un undefined sin usar if ez xd
console.log(thor.id?.toLocaleString())
// thor.id = 232323

// template union types para tipar strings con formato
type HexadecimalColor = `#${string}`

// const colorHTML: HexadecimalColor = '0000ff';
const colorHTML2: HexadecimalColor = '#ff0000';

// DENUEVO ts no es para validación de usuario pues eso es tiempo de ejecución, ts es estático antes de compilar ahí nos avisa nuestros errores, no tiene sentido validar un email con types pues al compilarse no estará como js cuando el usuario ingrese su tipo de email inválido xd
// el valor por defecto sería ?? 'valor por defecto'

// union types
// fue el split de arriba para crear el type Hero usando el &

// type indexing permite acceder a las props de un type para poder reciclarlas al tipar
// personalmente yo prefiero lo opuesto: ir de menos a más: crear un type addresHero de street y city
type HeroProperties = {
  isActive: boolean,
  address: {
    street: string,
    city: string
  }
}

const addressHero: HeroProperties['address'] = {
  street: 'calle 123',
  city: 'bogota'
}

// el type from value permite crear un type a partir de un valor, puede generar un poco de desorden al buscar una const para hallar el "typeof", pero es útil cuando no tenemos tiempo para prod, así escribimos los test y lo refactorizamos correctamente más adelante
const address = {
  street: 'calle 123',
  city: 'bogota'
}

type AddressType = typeof address

const addressHero2: AddressType = {
  street: 'calle 123',
  city: 'bogota'
}

// type from function return es lo mismo: recuperar el tipo pero a través del return de una function
function createAddress() {
  return {
    street: 'calle 123',
    city: 'bogota'
  }
}

type AddressType2 = ReturnType<typeof createAddress>

// arrays
// const languages: (string | number)[] = ['python', 'java', 'typescript', 1, 2]
const languages: Array<string | number> = ['python', 'java', 'typescript', 1, 2]

languages.push(3)
languages.push('c++')
// languages.push(true)

type CellValue = 'X' | '0' | ''
type GameBoard = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
]

const gameBoard: GameBoard = [
  ['X', '0', '0'],
  ['0', 'X', ''],
  ['0', 'X', '0']
]

// gameBoard[0][1] = 'XXX'
// gameBoard[0][4] = 'XXX'
// gameBoard[2][5] = 'XXX'

// gameBoard[0][1] = 'X'
// gameBoard[0][4] = 'X'
// gameBoard[2][5] = 'X'

console.log(gameBoard)

// type State = [string, (s: string) => void]
// const [name, setName] = useState('titis')

// type Coordenadas = [number, number, number]
// const coordenadas:Coordenadas = [1, 2, 3]

type RGB = [number, number, number]
const rgb = [255, 255, 255]