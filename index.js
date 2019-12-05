const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 150 },
    { title: 'Jacket', price: 150 },
    { title: 'Shoes', price: 150 },
    { title: 'Shirt red', price: 250 },
    { title: 'Socks red', price: 250 },
    { title: 'Jacket red', price: 250 },
    { title: 'Shoes red', price: 250 },
    { title: 'Shirt blue', price: 350 }
    
];

const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3>${title}</h3><div class="image">Image</div><p>${price}</p><a href=#>Купить</a></div>`
};

const renderGoodsList = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    
    // Задание 3
    //В следующей строке мы выводили товары, goodsList является массивом и при выводе мы получаем его элементы с разделителем запятой, что нам не нужно
    //document.querySelector('.goods-list').innerHTML = goodsList;
    // я заменил вывод целого массива на вывод его эелементов путем обхода каждого элемента и вставки его в класс goods-list
    
    goodsList.forEach(goodsListItem => document.querySelector('.goods-list').insertAdjacentHTML('beforeEnd', goodsListItem));
};

renderGoodsList(goods);
