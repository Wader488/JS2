const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        
        let xhr;
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else {
        xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 ){
            if (xhr.status === 200) {
            const body = JSON.parse(xhr.responseText);
            resolve(body);
            } else {
            reject(xhr.responseText);
            }
        
        }
    };
        
    xhr.onerror = function (error){
        reject(error);
    }
        
    xhr.open('GET', url);
    xhr.send(); 
    }
    )  
}
/*    asyncFunc(5).then((res) => {
        return asyncFunc(res + 1);
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.error(err);
    });*/



class cart {
    cartDelivery() {
        //расчет стоимости доставки
    }
    cartSumm() {
        //Подсчет общей суммы товаров в корзине
    }
}

class cartProduct {
    cartProductSumm() {
        //Подсчет суммы товара каждого типа в корзине
    }
    cartProductDiscount() {
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
   /* fetchGoods(cb)  {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = goods;
            cb();
        });
    }*/
    fetchGoods(cb)  {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = goods;
            cb();
        });
    }

    totalPrice() {
        return this.goods.reduce((accum, item) => {
            if (item.price) accum += item.price;
            return accum;
        }, 0);
    }


    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    //Задание 2: Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    //Вариант 1
    summGoods1() {
        let summ = 0;
        this.goods.forEach(good =>
            summ += good.price
        );
        console.log(summ);
    }

    //Вариант 2, добавлено свойство totalSumm
    summGoods2() {
        this.goods.forEach(good =>
            this.totalSumm += good.price
        );
    }
}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
    
    console.log('Вариант 1');
    list.summGoods1();

    console.log('Вариант 2');
    list.summGoods2();
    console.log(list.totalSumm);
});
