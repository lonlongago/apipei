<template>
    <div class="Listinfor">
        <ul>
            <li class="list" v-for="item in lists">
                <div class="top">
                    <div class="head" v-if="item.member" :style="'background-image:url('+ item.member.face +');'"></div>
                    <div class="txt">
                        <h4 v-if="item.member">{{item.member.nickname}}</h4>
                        <small>{{item.dateline_lable}}</small>
                    </div>
                    <a :href="'tel:' + item.mobile" class="tel"><i class="ico"></i>聊一下</a>
                </div>
                <div class="cont" @click='gotoDetail(item.life_id)'>
                    <h3 class="overflow_clear">{{item.title}}</h3>
                    <div class="bq">
                        <span v-if="item.top_lable != ''" style="background:#f30;">{{item.top_lable}}</span>
                        <span v-if="item.promot_lable != ''">{{item.promot_lable}}</span>
                    </div>
                    <div class="tag">
                        <span v-for="li in item.lable">{{li}}</span>
                    </div>
                    <div class="nr">
                        <div class="txt"><span class="bt">#{{item.cate_lable}}#</span>
                            <span v-html="item.content"></span>
                        </div>
                        <!-- <span class="fold">展开</span> -->
                    </div>
                    <div class="img">
                        <ul>
                            <li v-for="li in item.thumb_list" :style="'background-image:url('+ li.photo +');'"></li>
                        </ul>
                    </div>
                    <div class="addr overflow_clear" v-if="item.addr.length"><i class="ico"></i>{{item.addr}}</div>
                </div>
                <div class="bottom">
                    <div><i class="ico_browse"></i>{{item.views}}</div>
                    <div><i class="ico_focus"></i>{{item.collects}}</div>
                    <div><i class="ico_message"></i>{{item.comments}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:['lists'],
        data(){
            return{
            }
        },
        methods:{
            //跳转信息详情页
            gotoDetail(life_id){
                var url='/life/infordetail'
                this.$router.push({path:url,query:{life_id:life_id}});
            }
        }
    }
</script>
<style type="text/css">
    .Listinfor .list{background:#fff; margin-bottom:10px;}
    .Listinfor .list .top{padding:10px; overflow:hidden; position:relative;}
    .Listinfor .list .top .head{width:44px; height:44px;border-radius:100%; overflow:hidden;float:left; background-size:cover; background-repeat: no-repeat; background-position: center;}
    .Listinfor .list .top .txt{margin-left:54px;line-height:20px; margin-right:80px;}
    .Listinfor .list .top .txt h4{font-size:14px;}
    .Listinfor .list .top .txt small{font-size:12px; color:#999;}
    .Listinfor .list .top .tel{position:absolute; right:10px; top:10px; border:1px solid #fc6723; border-radius:3px;line-height:24px; color:#fc6723;font-size:12px; padding:0 8px; display:inline-block;}
    .Listinfor .list .top .tel .ico{display:inline-block;width:12px; height:14px; background:url('../../assets/tel_ico.png') center no-repeat;background-size:contain;margin-right:4px;vertical-align:text-bottom;font-size:0;line-height:0;}
    .Listinfor .list .cont{padding:0 10px 10px;}
    .Listinfor .list .cont h3{font-size:16px; line-height:20px;margin-bottom:10px;}
    .Listinfor .list .cont .bq{overflow:hidden; margin-bottom:6px;}
    .Listinfor .list .cont .bq span{display: inline-block; padding: 0 4px; background: #f70; color: #fff; margin-right: 4px;}
    .Listinfor .list .cont .tag{overflow:hidden; margin-bottom:6px;}
    .Listinfor .list .cont .tag span{display:inline-block;padding:0 5px; line-height:18px;background:#f4f5f7; border-radius:2px; margin-right:4px; margin-bottom:4px; font-size:12px;}
    .Listinfor .list .cont .nr{position:relative;}
    .Listinfor .list .cont .nr .fold{font-size:14px; line-height:20px; color:#4f7bb3;}
    .Listinfor .list .cont .nr .txt{font-size:14px; line-height:20px;color:#666;max-height: 80px;overflow: hidden;text-overflow: ellipsis;text-overflow: -o-ellipsis-lastline;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;}
    .Listinfor .list .cont .nr .txt .bt{color:#4f7bb3;}
    .Listinfor .list .cont .img{overflow:hidden;margin:6px 0;}
    .Listinfor .list .cont .img ul{margin:0 -2px;}
    .Listinfor .list .cont .img ul li{position:relative; width:calc(33.33% - 4px); padding:16% 0; height :0px; float:left; margin: 0 2px; background-size:cover; background-repeat: no-repeat; background-position: center;}
    .Listinfor .list .cont .img ul li img{position:absolute;width:100%; height:100%; left:0px; top:0px;}
    .Listinfor .list .cont .addr{font-size:12px; line-height:20px; color:#4f7bb3;}
    .Listinfor .list .cont .addr .ico{display:inline-block; width:10px; height:15px; background:url('../../assets/addr_ico.png') center no-repeat; background-size:contain; margin-right:4px; vertical-align:text-bottom; font-size:0; line-height:0;}
    .Listinfor .list .bottom{border-top:1px solid #e6e6e6; display:flex; text-align:center;}
    .Listinfor .list .bottom div{flex:1;font-size:14px; padding:12px 0px; line-height:20px;color:#999;}
    .Listinfor .list .bottom div i{display:inline-block; width:18px; height:20px;background:url('../../assets/list_browse.png') center no-repeat;background-size:contain;margin-right:4px;vertical-align:text-bottom;font-size:0; line-height:0;}
    .Listinfor .list .bottom div .ico_browse{background-image:url('../../assets/list_browse.png');}
    .Listinfor .list .bottom div .ico_focus{background-image:url('../../assets/list_focus.png');}
    .Listinfor .list .bottom div .ico_message{background-image:url('../../assets/list_message.png');}
</style>