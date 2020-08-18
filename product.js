import pagination from './pagination.js';
//使用全域註冊來註冊元件
Vue.component('pagination', pagination);


var app = new Vue({
    el: '#app',
    data: {
        product: [],
        tempProduct: {
            imageUrl:[],
        },
        //用來存取分頁的資訊
        pagination: {},
        user: {
            token: '',
            uuid: 'c7149c74-55bd-4358-90a9-1a5c0b1f88be',
        }
    },
    methods: {
        //把每個按鈕都綁定開啟modal事件，然後用switch做功能上的分流
        activateModal(action, item) {
            switch (action) {
                case 'add':
                    this.tempProduct = {
                        imageUrl:[],
                    };
                    //先執行case判斷，再來開啟modal
                    $('#productModal').modal('show', item);
                    break;
                case 'edit':
                    // this.tempProduct = Object.assign({}, item); //淺層複製
                    // $('#productModal').modal('show');
                    this.getProduct(item.id);
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#deleteModal').modal('show');
                    break;
                default:
                    break;
            }
        },
        getProduct(id) {
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
            axios.get(api).then((res) => {
              // 取得成功後回寫到 tempProduct
              this.tempProduct = res.data.data;
              // 確保資料已經回寫後在打開 Modal
              $('#productModal').modal('show');
      
            }).catch((error) => {
              console.log(error); // 若出現錯誤則顯示錯誤訊息
            });
          },
        //刪除確認事件
        deleteProduct() {
            //使用這個方式，只能在畫面上刪除資料，但實際上資料還是存在於遠端的伺服器內，並沒有真正做到刪除
            // const vm = this;
            // if (vm.tempProduct.id) {
            //     const id = vm.tempProduct.id;
            //     vm.product.forEach(function (item, index) {
            //         if (item.id === id) {
            //             vm.product.splice(index, 1);
            //             vm.tempProduct = {};
            //         }
            //     })
            // }
            // $('#deleteModal').modal('hide');
            const vm = this;
            const url = `https://course-ec-api.hexschool.io/api/${vm.user.uuid}/admin/ec/product/${vm.tempProduct.id}`;
            // 預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${vm.user.token}`;
            axios.delete(url)
                .then(() => {
                    $('#deleteModal').modal('hide'); // 刪除成功後關閉 Modal
                    vm.getList(); // 重新取得全部資料
                });
        },
        //新增or編輯確認事件
        editOrUpdate() {
            //使用這個方式，只能在畫面上新增或編輯資料，但實際上資料沒有存到位於遠端的伺服器內
            // const vm = this;
            // //如果id為真值，代表是編輯產品
            // if (vm.tempProduct.id) {
            //     const id = vm.tempProduct.id;
            //     vm.product.forEach(function (item, index) {
            //         //使用id當做比對的標的物，對id相符的才做更新
            //         if (item.id === id) {
            //             vm.product[index] = vm.tempProduct;
            //         }
            //     });
            // } //else代表新增產品 
            // else {
            //     const id = new Date().getTime();
            //     //因為表單內沒有新增id的地方，這裡可以先把id push進去array
            //     vm.tempProduct.id = id;
            //     vm.product.push(vm.tempProduct)
            // }
            // vm.tempProduct = {};
            // //清空暫時資料，然後關閉modal
            // $('#productModal').modal('hide');
            const vm = this;
            const editUrl = `https://course-ec-api.hexschool.io/api/${vm.user.uuid}/admin/ec/product/${vm.tempProduct.id}`;
            const addUrl = `https://course-ec-api.hexschool.io/api/${vm.user.uuid}/admin/ec/product`;
            // 預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${vm.user.token}`;
            //如果id為真值，代表是編輯產品，使用patch覆蓋伺服器內的資料
            if (vm.tempProduct.id) {
                axios.patch(editUrl,vm.tempProduct)
                    .then(function () {
                        $('#productModal').modal('hide'); // AJAX 新增成功後關閉 Modal
                        vm.getList();//重新呈現產品列表
                    })
            }
            else {
                axios.post(addUrl,vm.tempProduct)
                    .then(function () {
                        $('#productModal').modal('hide'); // AJAX 新增成功後關閉 Modal
                        vm.getList();//重新呈現產品列表
                    })
            };
        },
        //進入頁面後立刻載入現有的產品列表
        getList(num) {
            const vm = this;
            //為了避免num出現undefined的情形，於是預設num=1
            if (!num) { num = 1 };
            //為了在網址顯示頁數，於是在url內增加 ?page=${num}, num 的參數由外面傳入
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${num}`;
            axios.get(url)
                .then(function (res) {
                    console.log(res);
                    vm.product = res.data.data;
                    vm.pagination = res.data.meta.pagination;
                })
        },
    },
    created() {
        const vm=this;
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)reyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
        console.log(this.user.token);
        //進入頁面後立刻執行一次更新頁面
        vm.getList();
        //之後設定成會自動更新網頁
        setInterval(function(){vm.getList();},1000000);
    }
});