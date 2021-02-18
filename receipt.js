const SHIPPING = 2;
const items = [
    { name: 'pizza 001', quantity: 1, price: 5.9 },
    { name: 'pizza 002', quantity: 1, price: 6.9 },
    { name: 'pizza 003', quantity: 1, price: 7.9 },
];

document.querySelector('#btn-addfood').addEventListener('click', () => {
    items.push({
        name: `pizza 00${Math.floor(Math.random() * 10)}`,
        quantity: 1,
        price: (Math.random() * 10).toFixed(2)
    });
    render();
});

function remove(i) {
    items.splice(i, 1);
    render();
}

function updateQuantity(i, quantity) {
    if (quantity < 1) return;
    items[i].quantity = quantity;
    render();
}

function render() {
    // Calculate price
    let subTotal = 0;
    items.forEach(item => subTotal += item.price * item.quantity);
    const total = SHIPPING + subTotal;

    document.querySelector('#sub-total').innerHTML = `$${subTotal.toFixed(2)}`;
    document.querySelector('#shipping').innerHTML = `$${SHIPPING}`;
    document.querySelector('#total').innerHTML = `$${total.toFixed(2)}`;

    // Add item
    const html = items.map(item =>
        `<li class="order-item">
            <span class="item-name">${item.name}</span>
            <span class="item-quantity">
                <button class="dec">-</button>
                <input class="quantity" type="number" value="${item.quantity}" />
                <button class="inc">+</button>
            </span>
            <span class="item-price">
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button class="delete btn-delete">X</button>
            </span>
        </li>`
    ).join('');

    document.querySelector('#order-items').innerHTML = html;

    // Update item
    const deleteButtons = document.querySelectorAll('.delete')
    const decButtons = document.querySelectorAll('.dec')
    const incButtons = document.querySelectorAll('.inc')

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            remove(i)
        })
        decButtons[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity - 1)
        })
        incButtons[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity + 1)
        })
    };
}


render();