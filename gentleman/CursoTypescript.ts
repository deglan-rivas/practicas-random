// 1. ts inferencia de tipo reconoce el tipo sin usar declarar su tipo
// antes de ES6 se usaba el prototype en lugar de las clases x.rpototype.nuevFuncion = function () { };
// 2. las clases son el molde de una tarta, se usan como plantilla para tener la misma bases sobre la cual se hacen personalizaciones, las propiedades son los ingredientes y cada tarta es una instancia u objeto al que les pasas sus cantidades o pesos en el constructor
// 3. en el poo de ts se usa el encapsulamiento para darle private a las propiedades y solo usar sus getters y setters ez
// 4. la herencia es usar el extends para usar props y métodos de una clase en la creación de otra
// 5. polimorfismo es que una función por lo general xd se comporte distinto de acuerdo al contexto, ejm: si viene de auto o de vehíulo un getTotalPuertas xd
// faltó la abstracción que es extraer características y acciones de un bojeto real hacia props y métoods ez de una clase
class Vehiculo {
  private numPuertas: number;
  private velocidad: number;
  private marca: string;

  constructor(numPuertas: number, velocidad: number, marca: string) {
    this.numPuertas = numPuertas;
    this.velocidad = velocidad;
    this.marca = marca;
  }

  getNumeroPuertas(): number {
    return this.numPuertas;
  }

  setNumeroPuertas(numPuertas: number) {
    this.numPuertas = numPuertas;
  }
}

class Auto extends Vehiculo {
  private cantidadRuedas: number;
  constructor(numPuertas: number, velocidad: number, marca: string, cantidadRuedas: number) {
    super(numPuertas, velocidad, marca);
    this.cantidadRuedas = cantidadRuedas;
  }

  getCantidadRuedas(): number {
    return this.cantidadRuedas;
  }

  setCantidadRuedas(cantidadRuedas: number) {
    this.cantidadRuedas = cantidadRuedas;
  }

  getNumeroPuertas(): number {
    return super.getNumeroPuertas() + 200;
  }
}

const ferrari = new Auto(2, 300, 'Ferrari', 4);
const moto = new Vehiculo(2, 300, 'Moto');

// notar que ferrari es un Auto que es una hijo de Vehiculo por eso ts acepta ese arreglo
const arregloDeVehiculos: Vehiculo[] = [ferrari, moto];
for (const vehiculo of arregloDeVehiculos) {
  console.log(vehiculo.getNumeroPuertas());
}

class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string='', edad: number=0) {
    this.nombre = nombre;
    this.edad = edad;
  }
}

class Persona2 {
  nombre: string;
  edad: number;
  constructor(nombre: string='', edad: number=0) {
    this.nombre = nombre;
    this.edad = edad;
  }
}

// a ts solo le importa el shape y el espacio en memoria de la clase, no importa si viene de la misma clase solo su shape o valor o sus keys tal cual como en JS 1 == '1' pero no 1 === '1'
let persona1 = new Persona();
let persona2 = new Persona2();
let persona3: Persona = persona2;

'Class vs Interface';
// las interfaces son como una subcapa de las clases, contratos que se deben cumplir, como clases de las clases xD
// los decoradores extienden las funcionalidades de un componente o una clase 
// las interfaces también pueden extender de otras clases


interface PersonaInterface {
  nombre: string;
  edad: number;
  dni?: string;
}

interface AlumnoInterface extends PersonaInterface {
  curso: string;
}

// recordar que el & indica que debe satisfacer a ambos y el | indica que debe satisfacer al menos uno de ellos o dos o tres o todos xd
const alumnoOPersona: PersonaInterface & AlumnoInterface = {
    curso: 'Angular',
    edad: 30,
    nombre: 'Juan'
};

// utility type de Required para usar todas las props de una interface o Partial para usar algunas, pero nunca agregar nuevas props xd Readonly no se puede modificar ninguna
// validarlo en el playground de ts para ver su compilación, pues capaz ts no deja compilar, pero una vez compilado a js sí se puede modificar, habría que usar el Object.freeze
const personaInterface: Required<PersonaInterface> = {
  nombre: 'Juan',
  edad: 30,
  dni: '123123412'
};

const alumnoInterface: AlumnoInterface = {
  nombre: 'Juan',
  edad: 30,
  dni: '12345678',
  curso: 'Angular'
};

// la mejor práctica es crear un tipo que englobe el Readonly y así lo podamos reutilizar más adelante
type PersonaReadOnly = Readonly<Persona>;

const personaModificable: PersonaReadOnly = {
  nombre: 'Juan',
  edad: 30
};

// personaModificable.nombre = 'Pedro';

interface Curso {
  nombre: string;
  duracion: number;
}

interface GentlemanProgramming {
  nombre: string;
  edad: number;
  cursos: Curso[];
}

const gentlemanProgramming: Partial<GentlemanProgramming> = {
  nombre: 'gentleman',
  edad: 30
};

// los genéricos encapsulan el tipo de dato en una variable, no quiere decir que sea dinámico, sino que al instanciarla se debe definir el tipo de dato para toda su vida
// en mi opinión no hay que darle tanta complejidad sino anidarlo con curryfication a otras funciones que reciban el mismo tipo de dato pues sino dentro coloco un JSON.stringfy para la Persona, pero si alguien me pasa un primitivo muere y lo mismo que usar JS xd 
const logger = <T>(variable: T) => {
  console.log(variable);
};

logger<Persona>(personaModificable);

// el as sirve para avisarle a ts que la variable es de tipo GentlemanProgramming, aunque el no lo infiera, es para salir del paso y por eso no debería usarse, similar a un any o !important del css, 
let variable = '1';
logger<GentlemanProgramming>(gentlemanProgramming as GentlemanProgramming);
