var mongoose = require('mongoose')

//1. 链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/mi')

//获取链接数据库的句柄
var db = mongoose.connection

db.on('open', function(err) {
        if (err) throw err
        console.log("connect success")
    })
    //3. 定义数据结构
    //轮播图侧边栏数据
var productBarListSchema = new mongoose.Schema({
    name: String,
    src_lit: String,
    buy: String,
    type: String,
    describe: String,
    activities: String,
    gift: Array,
    vertion: Array,
    color: Array,
    colorName: Array,
    buypic: Array,
    price: Object,
    packageList: String,
    src: String,
    value: Number
}, {
    versionKey: false
})

//顶部导航数据
var productTopListSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: Number,
    show: String,
    src: String,
    describe: String,
    activities: String,
    vertion: Array,
    color: Array,
    colorName: Array,
    buypic: Array,
    price: Object,
    packageList: String,
    valueNum: Boolean,
}, {
    versionKey: false
})

//小米明星单品数据

var starProductListSchema = new mongoose.Schema({
    name: String,
    describe: String,
    value: String,
    src: String
}, {
    versionKey: false
})

// 用户信息
var userSchema = new mongoose.Schema({
    name: String,
    tel: String,
    password: String,
    shoppingCar: Array,
    address: String,
    sex: String,
    like: String,
    telPlace: String,
    miID: String
})

var contentListSchema = new mongoose.Schema({
    name: String,
    oldprice: String,
    newprice: String,
    type: String,
    show: String,
    showColor: String,
    describe: String,
    src: String,
    pinjiaNum: String
})

//链接数据结构至数据库
var productBarListModel = mongoose.model("productBarList", productBarListSchema, "productBarList")

var productTopListModel = mongoose.model("productTopList", productTopListSchema, "productTopList")

var starProductListModel = mongoose.model("starProductList", starProductListSchema, "starProductList")

var contentListModel = mongoose.model("contentList",contentListSchema,"contentList")
var userModel = mongoose.model("users",userSchema,"users")
module.exports = {
    productBarListModel: productBarListModel,
    productTopListModel: productTopListModel,
    starProductListModel: starProductListModel,
    contentListModel: contentListModel,
    userModel: userModel
}