function updateLocalStorage(items) {
    localStorage.setItem('productData', JSON.stringify(items));
}

function removeItemFromLocalStorage(id) {
    const items = JSON.parse(localStorage.getItem('productData'));
    const updatedItems = items.filter(item => item.id !== id);
    updateLocalStorage(updatedItems);
}

function generateProductList(filterSize) {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';

    const items = JSON.parse(localStorage.getItem('productData')) || [];

    items.forEach(item => {
        if (!filterSize || item.size === filterSize) {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>Naam: ${item.name}</p>
                <p>Grootte: ${item.size}</p>
                <p>Aantal: ${item.amount}</p>
                <button onclick="increaseAmount('${item.id}')">+</button>
                <button onclick="decreaseAmount('${item.id}')">-</button>
            `;
            productListDiv.appendChild(itemDiv);
        }
    });
}

function decreaseAmount(id) {
    const items = JSON.parse(localStorage.getItem('productData'));
    const updatedItems = items.map(item => {
        if (item.id === id) {
            item.amount = Math.max(item.amount - 1, 0);
        }
        return item;
    });
    updateLocalStorage(updatedItems);
    generateProductList(document.getElementById('size-filter').value);
}

function increaseAmount(id) {
    const items = JSON.parse(localStorage.getItem('productData'));
    const updatedItems = items.map(item => {
        if (item.id === id) {
            item.amount++;
        }
        return item;
    });
    updateLocalStorage(updatedItems);
    generateProductList(document.getElementById('size-filter').value);
}

function filterProducts(size) {
    document.getElementById('size-filter').value = size;
    generateProductList(size);
}

document.getElementById('size-filter').addEventListener('change', function () {
    const filterSize = this.value;
    generateProductList(filterSize);
});

if (!localStorage.getItem('productData')) {
    const productData = [
        {
            id: "141283",
            name: "T-shirt blauw",
            size: "L",
            amount: 6,
        },
        {
            id: "141284",
            name: "T-shirt rood",
            size: "M",
            amount: 8,
        },
        {
            id: "141285",
            name: "T-shirt groen",
            size: "M",
            amount: 5,
        },
        {
            id: "141286",
            name: "T-shirt groen",
            size: "S",
            amount: 8,
        },
        {
            id: "141287",
            name: "T-shirt geel",
            size: "L",
            amount: 10,
        },
        {
            id: "141288",
            name: "T-shirt geel",
            size: "M",
            amount: 9,
        },
        {
            id: "141289",
            name: "T-shirt geel",
            size: "S",
            amount: 11,
        },
        {
            id: "153824",
            name: "Trui blauw",
            size: "L",
            amount: 4,
        },
        {
            id: "153825",
            name: "Trui blauw",
            size: "M",
            amount: 6,
        },
        {
            id: "153826",
            name: "Trui groen",
            size: "L",
            amount: 9,
        },
        {
            id: "153827",
            name: "Trui geel",
            size: "S",
            amount: 6,
        },
    ];
    updateLocalStorage(productData);
}

generateProductList();