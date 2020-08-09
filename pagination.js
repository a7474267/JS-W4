export default {
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item" v-for="item in pages.total_pages" :key="item"><a class="page-link" href="#" v-on:click.prevent="updatePage(item)">{{item}}</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
</nav>`,
    //props 代表將資料從外層傳到內層
    props: ['pages'],
    //點擊頁數，觸發切換頁面
    methods:{
        updatePage(num){
            const vm=this;
            this.$emit("pages")
        },
    },
};

