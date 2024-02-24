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