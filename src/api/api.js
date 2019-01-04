import axios from 'axios'
import { setStore, getStore } from './mutils'
var root = process.env.API_ROOT;
window.__orderData = '';
    //系统参数
window.__CFG = window.__CFG || {
    'APIURL': root,
    'CLIENT_OS': "VUEAPP",
    "WX_OPENID": '',
    "TOKEN": "16-KTB591F6CF535A917E0BEE0D47A199C6DF",
    // "TOKEN": "",
    // "UxLocation": { "lng": "", "lat": "" },
    "UxLocation": { "lng": "117.257186", "lat": "31.835828" },
    "CITY_ID": "",
    "CITY": "",
    "C_PREFIX": "KT-",
    "IMG_URL": "",
    "SITEURL":"",
    "IN_APP_CLIENT":"",
    "DOCUMENT_TITLE":document.title,
    "CLIENT_VER":"3.1.20180523",
    "BDKEY":"",
};

//请求方法
function callapi(api, parmas, callback) {
    get_parmas();
    parmas = parmas || {};
    callback = typeof(callback) == 'function' ? callback : function(res) {};
    //公共参数
    var common_parmas = {
        'TOKEN': window.__CFG.TOKEN,
        "CITY": window.__CFG.CITY,
        "CITY_ID": window.__CFG.CITY_ID,
        "LNG": window.__CFG.UxLocation.lng,
        "LAT": window.__CFG.UxLocation.lat,
        "CLIENT_OS": "VUEAPP",
        "CLIENT_API": "CUSTOM",
        "CLIENT_VER":window.__CFG.CLIENT_VER,
        "API": api,
        "data": JSON.stringify(parmas)
    };
    var config = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "post",
        baseURL: '/'
    }
    var postdata = [];
    for (var k in common_parmas) {
        postdata.push(k + "=" + common_parmas[k]);
    }
    axios.post(window.__CFG.APIURL+"?_"+Math.random(), postdata.join("&"), config)
        .then(function(res) {            
            if(res.data.error == 101){
                login();
            }else{
                callback(res.data);
            }
            //callback(res.data);
        })
        .catch(function(err) {
            // console.log(err)
        })

};

//检查是否在APP端
function checkIsApp(){
    return typeof(window.JHAPP) == 'object' ? true :false;
};
function checkIsAndroid(){
    return typeof(window.jsObj) == 'object' ? true :false;
};
function checkIsIOS(){
    return typeof(window.JH) == 'object' ? true :false;
};

//登录
function login(){
    var isapp = checkIsApp();
    var rebackurl = window.location.href;
    rebackurl = encodeURIComponent(rebackurl);
    var request = '/passport/login';
    window.location.href = request + "?rebackurl=" + rebackurl;
    // if(isapp && typeof(window.JHAPP.onLogin) == 'function'){        
    //     setTimeout(function(){
    //         var params = {rebackurl:rebackurl};
    //         window.JHAPP.onLogin(JSON.stringify(params));
    //     }, 10)
    // }else{
        
    // }
};

//获取系统参数
function get_parmas() {
    if (!window.__CFG.TOKEN) {
        var document_TOKEN = get_cookie('TOKEN');
        var Local_TOKEN = getStore('TOKEN');
        if (document_TOKEN == Local_TOKEN) {
            window.__CFG.TOKEN = Local_TOKEN;
        } else {
            window.__CFG.TOKEN = get_cookie('TOKEN');
            setStore('TOKEN', document_TOKEN);
        }

    }
    if (!window.__CFG.CITY_ID) {
        var local_CITY_ID = getStore('CITY_ID');
        var doucment_CITY_ID = get_cookie('UxCityId');
        if (local_CITY_ID == doucment_CITY_ID) {
            window.__CFG.CITY_ID = local_CITY_ID;
        } else {
            window.__CFG.CITY_ID = doucment_CITY_ID;
            setStore('CITY_ID', doucment_CITY_ID);
        }
    }
    if (!window.__CFG.CITY) {
        var local_CITY = getStore('CITY');
        var doucment_CITY = get_cookie('UxCity');
        if (local_CITY = doucment_CITY) {
            window.__CFG.CITY = local_CITY;
        } else {
            window.__CFG.CITY = doucment_CITY;
            setStore('CITY', doucment_CITY);
        }
    }
    if (!window.__CFG.UxLocation.lng || !window.__CFG.UxLocation.lat) {
        var document_UxLocation = get_cookie('UxLocation');
        // console.log(document_UxLocation)
        if (document_UxLocation) {
            var format_document_UxLocation =document_UxLocation.split(",");
            // console.log(format_document_UxLocation)
            if (format_document_UxLocation) {
                var data_uxlocation = {
                    "lng":format_document_UxLocation[1],
                    "lat":format_document_UxLocation[0]

                }
                window.__CFG.UxLocation = data_uxlocation;
            }
        }
    }
};

//获取浏览区cookie
function get_cookie(key) {
    if (!key) {
        return false;
    } else {
        var keys = window.__CFG.C_PREFIX + key;
        var reg = new RegExp("(^| )" + keys + "=([^;]*)(;|\x24)");
        var result = reg.exec(document.cookie);
        if (result) {
            return result[2] || '';
        }
        return '';
    }
};

//判断是否微信
function checkIsWeixin(){
    if(/(micromessenger)/.test(navigator.userAgent.toLowerCase())){
        return true;
    }else{
        return false;
    }
};

export default {
    //商圈的APP分享
    // showshare(link, title, content, imageurl,hideqq) {
    //     if(window.__CFG.Request_In_App == 'IOS'){
    //         var isIOS = checkIsIOS();
    //         if(isIOS) {
    //            setTimeout(function(){
    //                 window.jsObj.AppToShare(link, title, content, imageurl,0);
    //             },10);
    //         };
    //     }else if(window.__CFG.Request_In_App == 'Android'){
    //         var isAndroid = checkIsAndroid();
    //         if(isAndroid){
    //             setTimeout(function(){
    //                 window.JH.AppToShare(link, title, content, imageurl);
    //             },10);
    //         };
    //     };
    // },
    //外卖的APP分享
    showshare(link, title, content, imageurl) {
        var isapp = checkIsApp();
        if(isapp) {
           setTimeout(function(){
                var params = {
                    type:"share",
                    params:{
                        "title":title,
                        "desc":content,
                        "img":imageurl,
                        "link":link
                    }
                };
                window.JHAPP.onContextMenu(JSON.stringify(params));
            },10);
        }
    },
    //网页分享
    webshare(title,desc,link,imgUrl){
        if(checkIsWeixin()){
            wx.ready(function(){
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link

                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // callback();
                    },
                    cancel: function () {
                    }
                });
                wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                       // callback();
                    },
                    cancel: function () {
                       // 用户取消分享后执行的回调函数
                    }
                });
            });
        };
    },
    //跳此vue项目以外的链接
    rebackUrl(request, rebackurl) {
        var rebackurl = rebackurl || window.location.href;
        if (request) {
            window.location.href = request + "?rebackurl=" + encodeURIComponent(rebackurl);
        }
    },

    //提示框
    tipload(glo, msg, isback) {
        glo.tipshow = true
        glo.tips = msg
        setTimeout(function() {
            glo.tipshow = false;
            if (isback) {
                glo.$router.go(-1)
            }
        }, 2000)
    },

    //接口
    index(params, callback) {
        return callapi('client/v3/life/index/index', params, callback) //首页
    },
    lifeCate(params, callback) {
        return callapi('client/v3/life/life/cate', params, callback) //发布分类
    },
    fabuForm(params, callback) {
        return callapi('client/v3/life/life/info', params, callback) //发布表单
    },
    upload(params,callback) {
        return callapi('client/v3/life/index/upload', params,callback) //上传图片
    },
    fabuSubmit(params,callback) {
        return callapi('client/v3/life/life/create', params,callback) //创建发布
    },
    lifeList(params,callback) {
        return callapi('client/v3/life/life/items', params,callback) //帖子列表
    },
    lifeDetail(params,callback) {
        return callapi('client/v3/life/life/detail', params,callback) //帖子详情
    },
    lifeComplaint(params,callback) {
        return callapi('client/v3/life/life/complaint', params,callback) //帖子举报
    },
    lifeComment(params,callback) {
        return callapi('client/v3/life/ucenter/comment/comment', params,callback) //帖子评论
    },
    lifeReply(params,callback) {
        return callapi('client/v3/life/ucenter/comment/reply', params,callback) //帖子评论回复
    },
    lifeCollectList(params,callback) {
        return callapi('client/v3/life/ucenter/collect/items', params,callback) //我的收藏列表
    },
    lifeCollect(params,callback) {
        return callapi('client/v3/life/ucenter/collect/collect', params,callback) //帖子收藏
    },
    lifeCancel(params,callback) {
        return callapi('client/v3/life/ucenter/collect/cancel', params,callback) //帖子取消收藏
    },
    lifeMineList(params,callback) {
        return callapi('client/v3/life/ucenter/life/items', params,callback) //我的帖子列表
    },
    lifeDrop(params,callback) {
        return callapi('client/v3/life/ucenter/life/drop', params,callback) //我的帖子下架
    },
    lifeUp(params,callback) {
        return callapi('client/v3/life/ucenter/life/up', params,callback) //我的帖子上架
    },
    lifeRefresh(params,callback) {
        return callapi('client/v3/life/ucenter/life/refresh', params,callback) //我的帖子刷新
    },
    lifeDelete(params,callback) {
        return callapi('client/v3/life/ucenter/life/delete', params,callback) //我的帖子删除
    },
    lifePromot(params,callback) {
        return callapi('client/v3/life/ucenter/life/promot', params,callback) //我的帖子推广
    },
    lifePromotset(params,callback) {
        return callapi('client/v3/life/ucenter/life/promotset', params,callback) //推广创建支付单
    },
    lifePayInfo(params,callback) {
        return callapi('client/payment/info', params,callback) //支付信息
    },
    lifePay(params,callback) {
        return callapi('client/payment/life', params,callback) //创建支付
    },
    lifeAgain(params,callback) {
        return callapi('client/v3/life/ucenter/life/again', params,callback) //帖子重新发布
    },
    lifeAgainset(params,callback) {
        return callapi('client/v3/life/ucenter/life/againset', params,callback) //帖子重新发布提交
    }
}
