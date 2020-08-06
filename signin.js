var app = new Vue({
    el: '#app',
    data: {
        user: {
            email: '',
            password: ''
        }
    },
    methods: {
        signin() {
            const api = "https://course-ec-api.hexschool.io/api/auth/login";
            axios.post(api, this.user)
                //發送api位置和帳號資訊
                .then(function(res) {
                    //如果登入成功，伺服器會回傳訊息，可透過console看到傳回的資料
                    //宣告變數，將token & expired日期儲存起來
                    console.log(res);
                    const token = res.data.token;
                    const expired = res.data.expired;
                    //https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
                    //利用語法，把token和expired資訊存在cookie內
                    document.cookie = `reyToken=${token}; expires=${new Date(expired*1000)}; path=/`;
                    window.location = "product.html";
                })
                .catch(function(error) {
                    console.log(error);
                })
        },
    }
});