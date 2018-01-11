var express = require('express');
var model = require('../model')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/getList', function (req, res) {
    model.productBarListModel.find({}, function (err, result) {
        model.productTopListModel.find({}, function (err, over) {
            res.status(200).json({data: result, topData: over})
            })

        })
        // res.end("链接成功")
    })

router.get('/getMainList',function(req,res) {
    model.starProductListModel.find({},function(err,result) {
        if(err) throw err
        model.contentListModel.find({},function(err,resu) {
            res.status(200).json({starData: result,contentData: resu})
        })
    })
})

// 购买页
router.get("/buyproduct",function(req,res) {
    //console.log(req.query)
    var table = req.query.table
    model[table].find({name:req.query.name},function(err,result) {
        if(err) throw err
        res.status(200).json({data:result[0]})
    })
})

// 注册
router.post("/signUser",function(req,res) {
    model.userModel.find({tel:req.body.telNum},function(err,result) {
        console.log(result)
        if(err) throw err
        if(result.length === 0) {
            var newtime = Date.now()
            var miID = Math.floor(Math.random()*10000) + newtime + ''
            model.userModel.insertMany({tel:req.body.telNum,country:req.body.country,password:req.body.password,telPlace:req.body.telPlace,miID:miID},function(err,data) {
                if(err) throw err
                console.log("注册成功",data)
                res.status(200).json({errno:1,msg:"注册成功"})
            })
        }else {
            res.status(200).json({errno:0,msg:"注册失败"})
        }
    })
})

// 注册验证手机
router.post("/telConfirm",function(req,res) {
    model.userModel.find({tel:req.body.tel},function(err,result) {
        if(err) throw err
        //console.log('result',result)
        //console.log('tel',req.body)
        if(result.length === 0) {
            res.status(200).json({errno: 1,msg: "可以注册"})
        }else {
            res.status(200).json({errno: 0, msg: "此手机号码已经注册,请前往登录"})
        }
    })
})

// 登录
router.post("/login",function(req,res) {
    model.userModel.find({tel:req.body.user,password:req.body.password},function(err,result) {
        if(err) throw err
        if(result.length === 0) {
            res.status(200).json({errno: 0,msg: "登录失败"})
        }else if(result.length === 1){
            res.status(200).json({errno: 1 ,msg: "登录成功",data: result[0].miID})
        }else {
            res.status(200).json({errno: 2, msg: "服务器故障"})
        }
    })
})

// 添加购物车
router.post("/addtocar",function(req,res) {
    console.log('请求数据',req.body)
    model.userModel.find({miID:req.body.miID},function(err,result) {
        if(err) throw err
        console.log("查询结果",result)
        console.log("数组长度",result[0].shoppingCar.length)
        if(result[0].shoppingCar.length<=0) {
            result[0].shoppingCar.push(req.body)
            model.userModel.update({miID:req.body.miID},result[0],function(err,resu) {
                if(err) throw err
                console.log("更新结果",resu)
                console.log('更新后obj',result[0])
                if(resu.n = 1) {
                    res.status(200).json({errno:0,msg:"添加购物车成功",data: result[0].shoppingCar})
                    return
                }else {
                    res.status(200).json({errno:1,msg:"添加购物车失败,请重新添加"})
                    return
                }
            })
        }else {
            var changenum = false
            for(var i =0;i<result[0].shoppingCar.length;i++) {
                if(result[0].shoppingCar[i].product === req.body.product) {
                    
                    result[0].shoppingCar[i].num += req.body.num
                    changenum = true 
                    console.log("更新后产品数量",req.body.num)
                    break
                }
            }
            if(!changenum) {
                console.log("没有相同项,新增一条")
                result[0].shoppingCar.push(req.body)
            }
            model.userModel.update({miID:req.body.miID},result[0],function(err,re) {
                if(err) throw err
                console.log(re)
                console.log('data--->',result[0].shoppingCar)
                if(re.n = 1) {
                    res.status(200).json({errno:0,msg:"添加购物车成功",data: result[0].shoppingCar})
                   
                }else {
                    res.status(200).json({errno:1,msg:"添加购物车失败,请重新添加"})
                  
                }
            })
        }
        
    })
    //res.status(200).json({errno: 0,msg:"添加成功"})
})

// 获取购物车内容
router.get('/shopcar',function(req,res) {
    console.log(req.query)
    model.userModel.find({miID:req.query.miID},function(err,result) {
        if(err) throw err
        res.status(200).json({errno:0,data:result[0].shoppingCar})
    })
    //res.status(200).json({errno:0,data:"链接成功"})
})

module.exports = router;
