<template>
    <div class="footer">
        <div class="list" v-for="(item,index) in lists" :class="{on:footerIdx == index}" @click="gotopage(item.link)">
            <i :class="item.class"></i>
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props:['footerIdx'],
        data(){
            return{
                lists:[
                    {
                        class:"ico_home",
                        name:'首页',
                        link:'/life/home'
                    },
                    {
                        class:"ico_fabu",
                        name:'发布',
                        link:'/life/fabucates'
                    },
                    {
                        class:"ico_post",
                        name:'我的帖子',
                        link:'/life/post'
                    }
                ]
            }
        },
        methods:{
            // 跳转底部导航页面
            gotopage(link){
                this.$router.push(link);
            }
        }
    }
</script>


<style type="text/css">
    .footer{display: block; position: fixed; z-index:10; left:0px; bottom:0px; right:0px; height: 50px; background-color: #fff; box-shadow:inset 0px 1px 0px #e6e6e6; display: flex;}
    .footer .list{flex:1; text-align:center; font-size:12px; padding-top:4px;}
    .footer .list i{display:inline-block;width:24px;height:24px; background-repeat:no-repeat; background-position: center; background-size: contain;}
    .footer .list .ico_home{background-image:url('../../assets/footer_ico1.png');}
    .footer .list .ico_fabu{background-image:url('../../assets/footer_ico2.png'); background-size:44px 44px; background-color:#fff;width:54px; height:54px; padding:5px;border-radius:100%; margin-top:-20px; box-shadow:0 -1px 2px #e6e6e6;}
    .footer .list .ico_fabu~p{margin-top: -10px;}
    .footer .list .ico_post{background-image:url('../../assets/footer_ico3.png');}
    .footer .list.on{color: #fc6621;}
    .footer .list.on .ico_home{background-image:url('../../assets/footer_ico1_pre.png');}
    .footer .list.on .ico_post{background-image:url('../../assets/footer_ico3_pre.png');}
</style>