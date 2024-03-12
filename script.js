const inputTitle = document.getElementById('inputTitle');
const inputText  = document.getElementById('inputText' );
const btnAdd     = document.getElementById('btnAdd'    );
const itemsList  = document.getElementById('itemsList' );
const searchItem = document.getElementById('searchItem');

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
        <li class="item itemActive container-fluid border border-dark rounded mb-2">
            <div class="row d-flex justify-content-center align-items-center py-2">
                <div class="col-10 col-md-11 text-start border-end border-dark">
                    <h3 class="title overflow-auto text-uppercase m-0">${title}</h3>
                    <p class="overflow-auto m-0">${text}</p>
                </div>
                <div class="col-2 col-md-1 d-flex justify-content-center">
                    <button class="btnDelete border-0 rounded text-danger bg-white fs-1">X</button>
                </div>
            </div>
        </li>
    `;
    itemsList.appendChild(divItem);
    inputTitle.value = '';
    inputText.value = '';
    lengthItems();
    boolean ? sweetAlert("Item agregado.", "success") : '';
};

// REMOVE ITEM
itemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnDelete')) {
        e.target.closest('.item').parentElement.remove();
        saveLocalStorage();
        lengthItems();
        sweetAlert("Item eliminado.", "error");
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
    const items = Array.from(itemsList.children).map(item => ({
        title: item.querySelector('.title').textContent,
        text: item.querySelector('p').textContent
    }));

    localStorage.setItem('itemsList', JSON.stringify(items));
};

function loadLocalStorage() {
    const storedItems = localStorage.getItem('itemsList');

    if (storedItems) {
        const parsedItems = JSON.parse(storedItems);

        parsedItems.forEach(item => {
            addItem(item.title, item.text, false);
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