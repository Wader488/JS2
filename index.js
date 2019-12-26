
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const cart = [];

Vue.component('goods-item', {
  props: ['good'],
  template: `
     <div class="goods-item">
       <a href="#" class="imageLink"><div class="image">Image</div></a><a href="#" class="productTitleLink"><h3 class="productTitle">{{ good.product_name }}</h3></a><p>{{ good.price }} &#8381;</p><a href=# class="buyButton">Купить</a>
  `,
});

Vue.component('goods-list', {
  props: ['goods'],
  computed: {
    isGoodsEmpty() {
      return this.goods.length === 0;
    }
  },
  template: `
    <div class="goods-list" v-if="!isGoodsEmpty">
      <goods-item v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
    </div>
    <div class="not-found-items" v-else>
      <h2>Нет данных</h2>
    </div>
  `,
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const body = JSON.parse(xhr.responseText);
              resolve(body)
            } else {
              reject(xhr.responseText);
            }
          }
        };
        xhr.onerror = function (err) {
          reject(err);
        };

        xhr.open('GET', url);
        xhr.send();
      });
    },
    toggleCartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
  computed: {
    filteredGoods() {
      const searchValue = this.searchLine.replace(/[\*]/gi, '');
      const regexp = new RegExp(searchValue, 'i');
      return this.goods.filter((good) => regexp.test(good.product_name));
    },
  },
  async mounted() {
    try {
      this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
    } catch (e) {
      console.error(e);
    }
  }
});




/*
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: ''
    },
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest();
                } else {
                    xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            const body = JSON.parse(xhr.responseText);
                            resolve(body)
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };

                xhr.open('GET', url);
                xhr.send();
            });
        },
        filterGoods() {
            const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            //const value = searchInput.value;
            //this.filterGoods(value);
        })
        const regexp = new RegExp(this.searchLine, 'i');
        this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name)); 
    },
        initEvents() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            //const value = searchInput.value;
            //this.filterGoods(value);
        })
    }
   
    },


    async mounted() {
        try {
            this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
            this.filteredGoods = [...this.goods];
        } catch (e) {
            console.error(e);
        }
    }
});
*/
