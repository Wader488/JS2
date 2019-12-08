//задание 1
class cart {
    cartDelivery(){
        //расчет стоимости доставки
    }
    cartSumm(){
        //Подсчет общей суммы товаров в корзине
    }
}

class cartProduct{
    cartProductSumm(){
        //Подсчет суммы товара каждого типа в корзине
    }
    cartProductDiscount(){
        //Подсчет скидки на товар каждого типа в корзине
    }
}


class GoodsItem {
    constructor(title = 'Без имени', price = '') {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><a href="#" class="imageLink"><div class="image">Image</div></a><a href="#" class="productTitleLink"><h3 class="productTitle">${this.title}</h3></a><p>${this.price} &#8381;</p><a href=# class="buyButton">Купить</a></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.totalSumm = 0;
    }
    fetchGoods()  {
        this.goods = [
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
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    
    //Задание 2: Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    //Вариант 1
    summGoods1(){
        let summ = 0;
        this.goods.forEach(good =>
            summ += good.price
        );
        console.log(summ);
    }
    
    //Вариант 2, добавлено свойство totalSumm
    summGoods2(){
         this.goods.forEach(good => 
            this.totalSumm += good.price
        );
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();

console.log('Вариант 1');
list.summGoods1();

console.log('Вариант 2');
list.summGoods2();
console.log(list.totalSumm);


