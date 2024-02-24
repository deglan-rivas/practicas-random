let num = 0
const matrix = new Array(10)
                .fill("")
                .map(() => new Array(10)
                            .fill("")
                            .map(()=> new Array(10)
                                        .fill("")
                                        .map(()=>num++)))

console.log(matrix)
console.log(matrix[0][9][9])

// --- factorial
// 1. crear el arreglo
// 2. llenarlo de número contiguos hasta el name
// 3. usar un reduce para multiplicar y acumular

// imperativa
// for (let i = 1; i <= 10; i++) {
//     factorial *= i
// }
// console.log(factorial)

// declarativa
const factorial: (n: number) => number = (n) => {
  let base = 1
  return new Array(n)
    .fill(0)
    .map(() => base++)
    .reduce((a, b) => a * b, 1)
}

// function factorial2(n: number): number {
//     return n
// }

console.log(factorial(3))
console.log(factorial(4))
console.log(factorial(5))

// fibonacci
// 1. crear el arreglo
// 2. llenarlo de números contiguos hasta el name
// 3. usar un reduce para sumar para crear el próximo número
// 4. usar un par de valores para el 0, 1 y un auxiliar que actualiza el actual

// no fue necesario el base pues solo importaban las posiciones, pro eso solo se uso el ac y no el valor actual
// el antiguo error fue que reduce se ejecuta por cada iteración y se reiniciaban los valores de b y temp, al menos un scope más arriba funcó
const fibonacci: (n: number) => number = (n) => {
  // let base = 1
  let b=1
  let temp=1
  return new Array(n)
    .fill(0)
    // .map(() => base++)
    .reduce((ac) => {
      ac=b
      b=temp
      temp = ac+b
      // console.log(ac, b, temp)
      return ac
    }, 0)
  // return new Array(n)
  //   .fill(0)
  //   .map(() => base++)
  //   .reduce((ac) => {
  //     let a=1
  //     let b=1
  //     let temp
  //     temp = a+b
  //     a=b
  //     b=temp
  //     ac = ac+b
  //     return ac
  //   }, 0)
}

console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))
console.log(fibonacci(6))