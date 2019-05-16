// Defino la clase Cliente

class Cliente {
  constructor (apellido, nombre, dni, balance) {
    this._apellido = apellido;
    this._nombre = nombre;
    this._dni = dni;
    this._balance = balance;
  }

  //Defino el método para obtener el nombre y apellido del cliente
  
  obtenerApNom () {
    return `${this._apellido}, ${this._nombre}`;
  }
}

//Para mantener HTML semántico, creo los nodos a usarse para listar los clientes desde JS
//Estos son el título del listado en un elemento <h1> y el propio listado en un elemento <ul>

const main = document.getElementById("main")
var tituloListado = document.createElement("h1")
tituloListado.appendChild(document.createTextNode('Listado de Clientes:'))
main.appendChild(tituloListado)
var listado = document.createElement("ul")
main.appendChild(listado)

//Obtengo el formulario

const formulario = document.getElementById("formulario")

//Verifico si ya se encuentran clientes cargados en el localStorage. En caso positivo, los agrego al listado
//previamente creado. En caso negativo, creo un array vacío

var listadoClientes = localStorage.getItem('clientes')
listadoClientes = JSON.parse(listadoClientes)
if (!listadoClientes) {
  listadoClientes = []
} else {
  listadoClientes.forEach(c => {
    var cliente = new Cliente(c._apellido, c._nombre, c._dni, c._balance)
    appendCliente(cliente)    
  });
}

//Creo una función para controlar que no se ingresen campos vacíos

function controlCliente(cliente) {
  if (cliente._apellido && cliente._nombre && cliente._dni && cliente._balance) {
    return true
  } else return false
}

//Creo la función que permitirá agregar los clientes al listado que se mostrará en la página

function appendCliente(cliente) {
  var li = document.createElement("li")
  li.appendChild(document.createTextNode(`${cliente.obtenerApNom()} - DNI: ${cliente._dni} - Balance: $${cliente._balance}`))
  listado.appendChild(li)
}

//Finalmente utilizo event listeners para obtener el cliente agregao en el formulario, 
//realizo el control de que no esté vacío para luego agregarlo al array y al documento.
//Después de esto, guardo el array en el localStorage bajo el id = clientes

formulario.addEventListener("submit", function(event) {
  event.preventDefault();
  cliente = new Cliente (formulario.apellido.value, formulario.nombre.value, formulario.dni.value, formulario.balance.value)
  if (controlCliente(cliente)) {
    listadoClientes.push(cliente)
    appendCliente(cliente)
    formulario.reset();
    localStorage.setItem('clientes', JSON.stringify(listadoClientes));
  } else {
    alert('No puede dejar campos vacíos')
  }  
});