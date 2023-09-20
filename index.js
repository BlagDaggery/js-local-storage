const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const deleteAllBtn = document.getElementById('deleteAll');
const checkAll = document.getElementById('checkAll');
const uncheckAll = document.getElementById('uncheckAll');

function addItem(e) {
    e.preventDefault();

    const text = this.querySelector('[name="item"]').value;
    const item = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
          <li>
              <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} >
              <label for="item${i}">${plate.text}</label>
          </li>
      `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    
    const element = e.target;
    const index = element.dataset.index;

    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteAllItems() {
    if (!items.length) return;
    localStorage.removeItem('items');
    items.splice(0, items.length);
    populateList(items, itemsList);
}

function checkAllItems() {
    if (!items.length) return;
    items.forEach(item => { item.done = true });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function uncheckAllItems() {
    if (!items.length) return;
    items.forEach(item => { item.done = false });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

deleteAllBtn.addEventListener('click', deleteAllItems);
checkAll.addEventListener('click', checkAllItems);
uncheckAll.addEventListener('click', uncheckAllItems);

populateList(items, itemsList);
