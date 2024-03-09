// Creo una clase llamada item.
// La clase va a tener dos propiedades: titulo y texto, cada uno con sus metodos para ingresar.
// La clase va a tener una propiedad extra: un id unico e irrepetible.
// Voy a tener un array vacio. Los nuevos items que vaya creando puedo agregarlos a este array.
// Mientras los agrego al array, deberia de haber un codigo que tambien incorpore al html un contenedor con esa informacion.

let lista = [];

class Item {
    static contadorId = 0;

    constructor(titulo, texto) {
      this.id = Item.contadorId++;
      this.titulo = titulo;
      this.texto = texto;
    }
  
    agregarItem() {
        lista.push(this);
    }

    eliminarItem() {
        lista = lista.filter(item => item.id !== this.id);
    }
}

// Se crean los items
const item1 = new Item("Quiero comer",    "Ayer no cené y ahora me duele la panza del hambre que tengo.");
const item2 = new Item("Tengo sueño",     "Estuve todo el día laburando y me agarró pachorra jaja"      );
const item3 = new Item("Me tengo que ir", "Qué lástima pero adiós, me despido de ti y me voy..."        );

// Se agregan los items a la lista de items
// item1.agregarItem();
// item2.agregarItem();
// item3.agregarItem();

// Se eliminan los items de la lista de items
// item1.eliminarItem();
// item2.eliminarItem();
// item3.eliminarItem();

function lengthLista() {
    return lista.length;
}

crearDivsDeItems();

// ============================ DOM ============================

// AGREGAR ITEM
document.getElementById('agregarItem').addEventListener('click', agregarItem);

function mostrarTitulo() {
    let tituloItem = document.getElementById('tituloItem').value;
    return tituloItem;
}

function mostrarTexto() {
    let textoItem = document.getElementById('textoItem').value;
    return textoItem;
}

function agregarItem(e) {
    e.preventDefault();

    if (mostrarTitulo() !== '' && mostrarTexto() !== ''){
        const item = new Item(mostrarTitulo(), mostrarTexto());
        lista.push(item);
        crearDivsDeItems();
    }
}

function crearDivsDeItems() {

    let listaItems = document.getElementById('listaItems');

    // Detectamos los divs activos y los eliminamos para luego volver a recorrer el array con las notas. Esto evita que se repitan items del array que ya habian sido mostrados.
    let itemsDivActivo = document.getElementsByClassName('divActivo');
    let arrayDivActivo = Array.from(itemsDivActivo);

    arrayDivActivo.forEach(function(item) {
        item.parentNode.removeChild(item);
    });


    //
    lista.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add('divActivo');
        divItem.innerHTML=
        `
        <div class="container text-dark border border-dark rounded py-3 my-2">
            <div class="row">
                <div class="col-11 d-flex flex-column justify-content-start align-items-start text-start border-end border-dark">
                    <div class="row">
                        <h3>${item.titulo}</h3>
                    </div>
                    <div class="row">
                        <p class="fs-5 m-0">${item.texto}</p>
                    </div>
                </div>
                <div class="col-1 text-end d-flex justify-content-evenly align-items-center">
                    <img src="./assets/x.svg" width="28" alt="">
                </div>
            </div>            
        </div>
        `;
        
        listaItems.appendChild(divItem);
    });
}

// ELIMINAR ITEM