// ELEMENTS
const { inputTitle, inputText, btnAdd, itemsList, searchItem } = {
    inputTitle: document.getElementById('inputTitle'),
    inputText:  document.getElementById('inputText' ),
    btnAdd:     document.getElementById('btnAdd'    ),
    itemsList:  document.getElementById('itemsList' ),
    searchItem: document.getElementById('searchItem')
};

// LOAD ITEMS
document.addEventListener('DOMContentLoaded', loadLocalStorage);

// LENGTH ITEMS
function lengthItems() {
    const divItemCount = document.getElementById('divItemCount');
    const itemsLength = document.querySelectorAll('.itemActive').length;
    divItemCount.textContent = `ÍTEMS: ${itemsLength}`;
};

// ADD ITEM
btnAdd.addEventListener('click', () => {
    if (inputTitle.value !== '' && inputText.value !== '') {
        addItem(inputTitle.value, inputText.value, true);
        saveLocalStorage();
    } 
    else {
        sweetAlert("Completa ambos campos.", "info");
    }
});

function addItem(title, text, boolean) {
    const divItem = document.createElement('div');
    divItem.innerHTML = 
    `
        <li class="item itemActive container-fluid mb-2 border border-dark rounded text-dark">
            <div class="row d-flex justify-content-center align-items-center py-2">
                <div class="col-10 col-md-11 text-start border-end border-dark">
                    <h3 class="title overflow-auto m-0">${title}</h3>
                    <p class="overflow-auto m-0">${text}</p>
                </div>
                <div class="col-2 col-md-1 d-flex justify-content-center gap-2">
                    <button class="btnPalette d-flex align-items-center border-0 rounded p-0 fs-5">
                        <img class="btnPalette" src="./icons/palette.svg" alt="Editar ítem." class="m-0">
                    </button>
                    <button class="btnEdit d-flex align-items-center border-0 rounded p-0 fs-5">
                        <img class="btnEdit" src="./icons/edit.svg" alt="Editar ítem." class="m-0">
                    </button>
                    <button class="btnDelete d-flex align-items-center border-0 rounded p-0 fs-5">
                        <img class="btnDelete" src="./icons/delete.svg" alt="Eliminar ítem.">
                    </button>
                </div>
            </div>
        </li>
    `;
    itemsList.appendChild(divItem);
    inputTitle.value = '';
    inputText.value = '';
    lengthItems();
    boolean ? sweetAlert("Ítem agregado.", "success") : '';
};

// CHANGE ITEM COLOR
itemsList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btnPalette')) {
        const item = e.target.closest('.item');

        const { value: color } = await Swal.fire({
            title: "Elige un color:",
            input: "select",
            inputOptions: {
                white: "Blanco",
                gray: "Gris",
                red: "Rojo",
                blue: "Azul",
                yellow: "Amarillo",
                green: "Verde",
                orange: "Naranja",
                purple: "Violeta"
            },
            showCloseButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                const classMap = {
                    "white": "item-white",
                    "gray": "item-gray",
                    "red": "item-red",
                    "blue": "item-blue",
                    "yellow": "item-yellow",
                    "green": "item-green",
                    "orange": "item-orange",
                    "purple": "item-purple"
                };
                
                item.classList.remove('item-white', 'item-gray', 'item-red', 'item-blue', 'item-yellow', 'item-green', 'item-orange', 'item-purple');

                const itemColor = classMap[value];
                item.classList.add(itemColor);

                resolve();
              });
            }
        });

        color ? sweetAlert("Color modificado.", "warning") : '';

        saveLocalStorage();
        lengthItems();
    }
});

// EDIT ITEM
itemsList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btnEdit')) {
        const item = e.target.closest('.item');
        const title = item.querySelector('h3').textContent;
        const text = item.querySelector('p').textContent;  

        const { value: editedTitle } = await Swal.fire({
            title: "Título",
            input: "text",
            inputPlaceholder: title,
            showCloseButton: true
        });
        editedTitle ? item.querySelector('h3').textContent = editedTitle : '';
        
        const { value: editedText } = await Swal.fire({
            title: "Texto",
            input: "textarea",
            inputPlaceholder: text,
            inputAttributes: {
                style: "resize: none;"
            },
            showCloseButton: true
        });
        editedText ? item.querySelector('p').textContent = editedText : '';

        editedTitle || editedText ? sweetAlert("Ítem modificado.", "warning") : '';
        saveLocalStorage();
        lengthItems();
    }
});

// REMOVE ITEM
itemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnDelete')) {
        e.target.closest('.item').parentElement.remove();
        saveLocalStorage();
        lengthItems();
        sweetAlert("Ítem eliminado.", "error");
    }
});

// SEARCH ITEM
searchItem.addEventListener('input', () => {
    const searchString = searchItem.value.trim().toLowerCase();
    search(searchString);
    lengthItems();
});

function search(searchString) {
    const array = Array.from(itemsList.querySelectorAll('.title'));
    
    array.forEach(element => {
        const containsString = element.textContent.toLowerCase().includes(searchString);
        if (containsString) {
            element.closest('.item').classList.add('itemActive'); // activo, facilita calcular la cantidad al filtrar
            element.closest('.item').classList.remove('filteredText'); // muestra el item
        }
        else {
            element.closest('.item').classList.add('filteredText'); // no muestra el item
            element.closest('.item').classList.remove('itemActive'); // no activo, facilita calcular la cantidad de al filtrar
        }
    });
};

// LOCAL STORAGE
function saveLocalStorage() {
    const items = Array.from(itemsList.children).map(item => {
        const li = item.firstElementChild;
        const classes = Array.from(li.classList);
        const colorClass = classes.find(className => className.startsWith('item-'));
        
        return {
            title: item.querySelector('.title').textContent,
            text: item.querySelector('p').textContent,
            color: colorClass
        }
    });

    localStorage.setItem('itemsList', JSON.stringify(items));
};

function loadLocalStorage() {
    const storedItems = localStorage.getItem('itemsList');

    if (storedItems) {
        const parsedItems = JSON.parse(storedItems);

        parsedItems.forEach(item => {
            addItem(item.title, item.text, false);

            const lastItemColor = itemsList.lastElementChild.firstElementChild;
            lastItemColor.classList.add(item.color);
        });
    }
};

// SWEET ALERT 2
function sweetAlert(title, icon) {
    Swal.fire({
        toast: true,
        position: "bottom-end",
        timer: 1000,
        title: title,
        icon: icon,
        showConfirmButton: false,
        timerProgressBar: true
    });
}