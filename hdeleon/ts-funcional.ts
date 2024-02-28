/*
  1. funciones de primer orden son volcadas como variables
  2. funciones de orden superior o HOC reciben funciones de primer orden como parámetro -> notar que va sin ()
  3. función pura no tiene side effects y si recibo los mismos inputs siempre devolverá lo mismo 
  4. transparencia referencial se dice si al recibir lo mismo y solo cambiar el procesamiento vuelve a devolver lo mismo o viceversa con los args -> se cumple si hay inmutabilidad
  5. inmutabilidad es procesar sin alterar el valor de una variable -> si hacemos un mutable como .push entonces no se respetará la transparencia referencial
  6. un closure es una función que devuelve una función de primer orden tal cual como ejecutar un arrow function, pero agregándole un estado, ese estado se entierra en la memoria reservada de la función, por eso debe guardarse como variable esa función xd así tendremos el control sobre las ejecuciones como si fuera un for controlado iterador :v -> parece a private class
  7. un currying es un chaining de closures, así se pueden concatenar funciones de primer orden con un solo parametro y sería lo mismo que una función con muchos params, puedeser a varios niveles o jerarquías
*/

interface Beer {
  name: string
  abv: number
}

const data: Array<Beer> = [
  {
    name: 'Corona',
    abv: 4.5
  },
  {
    name: 'Heineken',
    abv: 5
  },
  {
    name: 'Stella Artois',
    abv: 4.2
  },
  {
    name: 'Budweiser',
    abv: 5.5
  }
]

function getInfo(
  beers: Beer[],
  fn: (b: string[]) => void){
    
  const beersInfo = beers.map(e=>`${e.name} - ${e.abv}`)
  fn(beersInfo)
}

function show(beerInfo: string[]) {
  beerInfo.forEach(items => console.log(items))
}

function showToUpperCase(beerInfo: string[]) {
  beerInfo.forEach(items => console.log(items.toUpperCase()))
}

function showOrdered(beerInfo: string[]) {
  beerInfo.sort().forEach((item, index) => console.log(`${index+1}. ${item}`))
}

getInfo(data, show)
getInfo(data, showToUpperCase)
getInfo(data, showOrdered)

// ---

// esto es función y no someRandom: number xD
const someRandom: () => number = () => Math.random();
console.log(someRandom())
console.log(someRandom())
console.log(someRandom())

// siempre da el mismo valor a diferencia del random
const sum = (a: number, b: number):number => a + b
console.log(sum(1,2))
console.log(sum(1,2))
console.log(sum(1,2))
console.log(sum(2,2))
console.log(sum(2,2))

// ---
// transparencia referencial es como la inyección de depdencias de postgres y mongo: cambias uno pero tu controller no se da cuenta

const numbers: number[] = [3, 4, 5, 6, 7, 8, 9, 1, 2]

function sort(numbers: number[]) {
  return numbers.sort()
}

console.log(sort(numbers))
console.log(numbers)

const numbers2: number[] = [5, 6, 7, 8, 9, 1, 2, 3, 4]

function sort2(numbers: readonly number[]) {
  return [...numbers].sort()
}

console.log(numbers2)
console.log(sort2(numbers2))

// ---
// closure es una función con estado, no estoy seguro si sea necesario guardar el estado volcando en una nueva variable interna así
function counter(n: number = 1) {
  return () => n++
} 

// function counter2(n: number = 1) {
//   let number = n
//   return function() {
//     return number++
//   }
// }

const c1 = counter(1)
const c2 = counter(10)
console.log(c1())
console.log(c1())
console.log(c1())
console.log(c2())
console.log(c2())
console.log(c1())

// ---

const getTotal = (amount: number, tax: number) => amount + (amount * tax)

// notar que la HCO tiene el param común y la de primer orden tiene lo que varia como el amount
function getTotalCurry(tax: number) {
  return (amount: number) => amount + (amount * tax)
}

console.log(getTotal(100, 0.19))
console.log(getTotal(200, 0.19))
console.log(getTotal(300, 0.19))

const calc = getTotalCurry(0.19)

console.log(calc(100))
console.log(calc(200))
console.log(calc(300))