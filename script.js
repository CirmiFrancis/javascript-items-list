const inputTitle = document.getElementById('inputTitle');
const inputText  = document.getElementById('inputText' );
const btnAdd     = document.getElementById('btnAdd'    );
const btnDelete  = document.getElementById('btnDelete' );
const itemsList  = document.getElementById('itemsList' );

// LENGTH ITEMS
function lengthItems() {
    const divItemCount = document.getElementById('divItemCount');
    const itemsLength = document.querySelectorAll('.item').length;
    divItemCount.textContent = `ÍTEMS: ${itemsLength}`;
}

// ADD ITEM
btnAdd.addEventListener('click', () => {
    (inputTitle.value !== '' && inputText.value !== '') ? addItem(inputTitle.value, inputText.value) : alert('Completa ambos campos.');
})

function addItem(title, text) {
    const divItem = document.createElement('div');
    divItem.innerHTML = 
    `
        <li class="item container-fluid border border-dark rounded mb-2">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-10 col-md-11 text-start border-end border-dark">
                    <h3 class="overflow-auto text-uppercase pt-3 m-0">${title}</h3>
                    <p class="overflow-auto pb-3 m-0">${text}</p>
                </div>
                <div class="col-2 col-md-1">
                    <button id="btnDelete" class="rounded">X</button>
                </div>
            </div>
        </li>
    `;

    itemsList.appendChild(divItem);
    inputTitle.value = '';
    inputText.value = '';
    lengthItems();
}

// REMOVE ITEM
itemsList.addEventListener('click', (e) => {
    if (e.target.id === 'btnDelete') {
        e.target.closest('.item').remove()
        lengthItems();
    }
})

// AGREGAR UN 'BUSCADOR DE ÍTEM'
// LA BÚSQUEDA TIENE QUE COINCIDIR CON EL TÍTULO DEL ÍTEM
// SE ACTUALIZA A MEDIDA QUE ESCRIBO
// 'DISPLAY: NONE' O 'VISIBILITY: HIDDEN', PARA AQUELLOS QUE NO COINCIDA CON LA BÚSQUEDA