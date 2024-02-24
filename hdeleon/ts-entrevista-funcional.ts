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