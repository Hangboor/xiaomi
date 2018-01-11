$('.tel-box input').blur(function() {
    //console.log('value',$(this)[0].value)
    var ma = $(this)[0].value.match(/^1[3|4|5|8][0-9]\d{4,8}$/g)
    if(!$(this)[0].value) {
        $('.msg-box').show()
    }else {
        $('.msg-box').hide()
        if(!ma) {
            $('.msg-type-box').show()
        }else{
            $('.msg-type-box').hide()
        }
    }
})

$('.inputconfirm input').blur(function() {

    if(!$(this)[0].value) {
        $('.confirm-msg-box').show()
    }else {
        $('.confirm-msg-box').hide()
    }
})
var itfName 
var mobile
$(".reg-btn").click(function() {
    var ma = $(".tel-box input")[0].value.match(/^1[3|4|5|8][0-9]\d{4,8}$/g)
    itfName = Math.floor(Math.random()*1000000)+""
    mobile = $(".tel-box input")[0].value
    var tNum = "T150606060601"
    if(!mobile || !ma){
        return
    }
    //console.log('电话',$(".tel-num").text())
    //mobile = $(".tel-num").text() + mobile
    //console.log(mobile)
    //console.log(itfName,mobile)
    var content =  '{"code": '+itfName+',"minute": "5","comName": "小米科技"}'
    $.ajax({
        type: "POST",
        url: "/telConfirm",
        data: {tel: mobile},
        success: function(data) {
            //console.log(data)
            if(data.errno === 1) {
                $.ajax({
                    type: "GET",
                    beforeSend:function(request) {
                        request.setRequestHeader("Authorization","APPCODE 16dc764a6fbe41e4819b277e5ab7628d")
                    },
                    headers: {
                        "Authorization": "APPCODE 16dc764a6fbe41e4819b277e5ab7628d"
                    },
                    data:"",
                    url:"http://ali-sms.showapi.com/sendSms?"+"content="+content+"&mobile="+mobile+"&tNum="+tNum,
                    success: function(data) {
                        alert("发送成功")
                        $(".reg-box").hide()
                        $(".reg-box-2").show()
                        $(".address-place").text($(".tel-num").text() + " "+mobile)
                        var times = 60
                        var time
                        var date = setInterval(function(){
                           time = "重新发送" + "("+times+")"
                            if(times<=0) {
                                $(".inputconfirm button").text("重新发送")
                               
                                clearInterval(date)
                                return
                            }
                            
                            $(".inputconfirm button").text(time)
                            //console.log($(".inputconfirm button"))
                            //console.log(time)
                            times--
                        },1000)
                    },
                    error: function(err) {
                        console.log(err)
                    }
                })
            }else {
                alert(data.msg)
                return
            }

        },
        error: function(err) {
            console.log(err)
        }
    })
    
})

$(".reg-next-btn").click(function() {
    if($(".inputconfirm input").val()=== itfName) {
        $(".reg-box-2").hide()
        $(".reg-box-3").show()
        return
    }else {
        alert("验证码错误")
        return
    }
})

$(".reg-next-btn").click(function() {
    if(!$(".inputconfirm input").val()) {
        //console.log('验证码',$(".inputconfirm input").val())
        return
    }
    //console.log(itfName)
    if(itfName === $(".inputconfirm input").val()) {
        alert("验证码输入正确")
    }
})

$(".reg-box-3 input").eq(1).blur(function() {
    if(!$(this).val()) {
        $(".msg-last-box").show()
    }else {
        $(".msg-last-box").hide()
    }
})

$(".reg-box-3 button").click(function() {
    console.log($(".reg-box-3 input").eq(0).val())
    if(!$(".reg-box-3 input").eq(0).val() || !$(".reg-box-3 input").eq(1).val()) {
        alert('密码不能为空')
        return
    }
    if($(".reg-box-3 input").eq(0).val().match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/g)){
        if($(".reg-box-3 input").eq(0).val() === $(".reg-box-3 input").eq(1).val()) {
            alert("可以提交ajax注册")
            $.ajax({
                type: "POST",
                url: "/signUser",
                data: {
                    country: $(".nation-content").text(),
                    telPlace: $(".tel-num").text(),
                    telNum: mobile,
                    password: $(".reg-box-3 input").eq(0).val()
                },
                success: function(data) {
                    //console.log(data)
                    
                    if(data.errno === 1) {
                        alert(data.msg)
                        window.location="/login.html"
                        return
                    }
                    alert(data.msg)
                },
                error: function() {
                    alert("注册失败")
                }
            })
        }else {
            alert("两次密码输入必须一致")
        }
    }else {
        alert("只能输入5-20个以字母开头、可带数字、“_”、“.”的字串")
    }
    
})