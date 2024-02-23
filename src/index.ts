/* 
  1. it was necessary to add --respawn to restart and a folder to --watch to look for changes -> plantilla https://github.com/monkeywit/nodejs-typescript-setup/blob/master/package.json
  2. instalar el typescript y ts-node-dev
  3. crear tipos primitivos y clases
  4. la clase puede tenerun valor por defecto o no, si quieres obligrarlo a que tenga valor usar un constructor que es triggereado en el new Sale()
  5. al heredar clases se usa el extends, protected para accerder desde la misma clase y sus derivados,
  6. llamar a su constructor también xd super(los del padre)
  7. el this del hijo no es el mismo que el this del padre xd si quieres ese debes usar el super.getTotal()
  8. el getTotal del hijo es suyo, se puede especificar más usando el override y asegurando la sobreescritura pues deben llamarse igual o dará error, no había debugger antes xD
  9. types con type Beer = {}, usa readonly y nullish ?: number siendo opcionales, sin otros campos adicionales,
  10. las interfaces son las bases de los patrones de diseño agrupar y categorizara objetos, validar, cumplir contratos xd
  11. accesors get y set para privates usar get para obtener y set para settear xd
  12. el problema del diamante herencia múltiple se emula y soluciona ocnl as interfaces de c++ y ts -> https://www.youtube.com/watch?v=ZwtQJ8oYfWE
  13. codeium para mi vscode = github copilot gratis - midudev tiene el api rest gratuito en sus repos para aprender xd
*/

const nombre: string = "titis ka deglan"
console.log('hola mundo ' + nombre)

function sumar(a: number, b: number): number {
  return a + b
}

const resultado = sumar(1,2)
console.log(resultado)

class Sale {
  // private name: string
  readonly name: string
  price: number
  amount: number = 10
  other?: string
  constructor(name: string, price: number = 10) {
    this.name = name
    this.price = price
  }

  protected getTotal() {
    return this.amount * this.price
  }
}

// let sale = new Sale('deglan', 12)
let sale = new Sale('deglan')
// console.log(sale.getTotal())
console.log(sale.other)
console.log(sale.name)
// sale.name = 'tatas'
// sale.getTotal()

class SaleWithTax extends Sale {
  private tax: number
  constructor(name: string, price: number = 10, tax: number = 0.21) {
    super(name, price)
    this.tax = tax
  }
  override getTotal(): number {
    return super.getTotal() * (1 + this.tax)
  }
}

let saleWithTax = new SaleWithTax('deglan', 12, 0.21)
console.log(saleWithTax.getTotal())

// ---

type Beer = {
  readonly name: string
  alcohol: string
  brand?: string
}

function showBeer(beer: Beer): void {
  console.log('info ', beer.name, beer.alcohol)
}

const myBeer: Beer = {
  name: 'deglan',
  alcohol: '4,5'
}

showBeer(myBeer)
// myBeer.adas = 'asdasd'
// myBeer.name = 'kakak'
// showBeer(myBeer)

type Snack = {
  nameSnack: string
  price: number
}

type Combo = Beer & Snack

const myCombo: Combo = {
  name: 'combo',
  price: 10,
  brand: 'kakak',
  alcohol: '4,5',
  nameSnack: 'kakak',
}

// ------

interface Drink {
  name: string
}

interface AlcoholicDrink extends Drink {
  alcohol: number
  showInfo(): string
}

interface mixedDrink {
  ingredients: string[]
}

class Wine implements AlcoholicDrink {
  name: string
  alcohol: number
  constructor(name: string, alcohol: number) {
    this.name = name
    this.alcohol = alcohol
  }
  showInfo(): string {
    return `${this.name} - ${this.alcohol}`
  }
}

// la plantilla del showInfo sirve para que todos las clases se llamen igual y no hay addIngredient insertIng ni addIng xd
class Cocktail implements AlcoholicDrink, mixedDrink {
  name: string
  alcohol: number
  ingredients: string[]
  constructor(name: string, alcohol: number, ingredients: string[]) {
    this.name = name
    this.alcohol = alcohol
    this.ingredients = ingredients
  }

  showInfo(): string {
    const ingredientsInfo = this.ingredients.reduce((acc, ing) => `${acc} - ${ing}`)
    return `info: ${this.name} - ${this.alcohol} - ${ingredientsInfo}`
  }
}

const margarita = new Cocktail('margarita', 10, ['agua', 'tomate', 'limon'])
const rioja = new Wine('rioja', 10)
const malbec = new Wine('malbec', 10)

const ad: AlcoholicDrink[] = [margarita, rioja, malbec]

// interfaces son para agrupar clases incluso cuando no tienen nada que ver, los estandariza
function showDrinks(drinks: AlcoholicDrink[]) {
  drinks.forEach(drink => console.log(drink.showInfo()))
}

showDrinks(ad)

// ---

class Account {
  private amount: number
  private comission: number

  constructor(amount: number, comission: number) {
    this.amount = amount
    this.comission = comission
  }

  set setAmount(amount: number) {
    if (amount < 0) {
      throw new Error('negative amount')
    }
    this.amount = amount
  }

  get getAmount() {
    return this.amount + this.comission
  }
}

const account = new Account(10, 0.21)
// console.log(account.amount)
account.setAmount = 20;
console.log(account.getAmount)