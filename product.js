var app = new Vue({
    el: '#app',
    data: {
        product: [{
                id: 1586934917210,
                unit: '台',
                category: '撒卡蘭姆盾牌',
                title: '龍鱗',
                origin_price: 4500,
                price: 3900,
                description: 'Dragonscale Zakarum Shield',
                content: '(聖騎士專用)',
                is_enabled: 1,
                imageUrl: 'http://iyazero.tw/JEPG/aerinshield[1].gif?MywebPageId=201021270180434836',
            },
            {
                id: 1586934917211,
                unit: '把',
                category: '巨神之刃',
                title: '祖父',
                origin_price: 6345,
                price: 4500,
                description: '+20 轉為所有的屬性',
                content: '+150-250% 增強傷害 (變動)',
                is_enabled: 0,
                imageUrl: 'http://iyazero.tw/JEPG/thepatriarch[1].gif?MywebPageId=2010151271345542781',
            },
            {
                id: 1586934917212,
                unit: '根',
                category: '法杖',
                title: '迦陀朵的遺志',
                origin_price: 10000,
                price: 8900,
                description: '化為御法者型態時每秒會發出一道毀滅浪潮，對 30 碼內的敵人造成 1000% 武器傷害',
                content: '非御法者型態時，每次擊中可疊加 1000% 武器傷害至毀滅浪潮，最多可堆疊 20 次',
                is_enabled: 1,
                imageUrl: 'https://www.google.com.tw/url?sa=i&url=https%3A%2F%2Fforum.gamer.com.tw%2FCo.php%3Fbsn%3D21400%26sn%3D1034934&psig=AOvVaw3s1B2kkcUt55_NpXD05vg-&ust=1596296117016000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiY8sro9-oCFQAAAAAdAAAAABAD',
            }
        ],
        tempProduct: {},
    },
    methods: {
        //把每個按鈕都綁定開啟modal事件，然後用switch做功能上的分流
        activateModal(action, item) {
            switch (action) {
                case 'add':
                    this.tempProduct = {};
                    //先執行case判斷，再來開啟modal
                    $('#productModal').modal('show', item);
                    break;
                case 'edit':
                    this.tempProduct = Object.assign({}, item); //淺層複製
                    $('#productModal').modal('show');
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#deleteModal').modal('show');
                    break;
                default:
                    break;
            }
        },
        //刪除確認事件
        deleteProduct() {
            const vm = this;
            if (vm.tempProduct.id) {
                const id = vm.tempProduct.id;
                vm.product.forEach(function(item, index) {
                    if (item.id === id) {
                        vm.product.splice(index, 1);
                        vm.tempProduct = {};
                    }
                })
            }
            $('#deleteModal').modal('hide');
        },
        //新增or編輯確認事件
        editOrUpdate() {
            const vm = this;
            //如果id為真值，代表是編輯產品
            if (vm.tempProduct.id) {
                const id = vm.tempProduct.id;
                vm.product.forEach(function(item, index) {
                    //使用id當做比對的標的物，對id相符的才做更新
                    if (item.id === id) {
                        vm.product[index] = vm.tempProduct;
                    }
                });
            } //else代表新增產品 
            else {
                const id = new Date().getTime();
                //因為表單內沒有新增id的地方，這裡可以先把id push進去array
                vm.tempProduct.id = id;
                vm.product.push(vm.tempProduct)
            }
            vm.tempProduct = {};
            //清空暫時資料，然後關閉modal
            $('#productModal').modal('hide');
        },
    }
})