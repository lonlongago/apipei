<template>
    <div class="Listcomment">
        <ul>
            <li class="list" v-for="item in lists">
                <div class="head" :style="'background-image:url('+ item.face +');'"></div>
                <div class="cont">
                    <h3>{{item.nickname}} <small class="fr">{{item.dateline}}</small></h3>
                    <div class="txt">{{item.content}}
                        <div class="reply_btn" @click="reply(item.comment_id)"></div>
                    </div>
                    <div class="reply" v-if="item.reply_items && item.reply_items.length">
                        <ul>
                            <li v-for="li in item.reply_items"><span class="bt">{{li.nickname}}：</span>{{li.content}}</li>
                        </ul>
                    </div>
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
            reply(e){
                this.$emit("reply",e);
            }
        }
    }
</script>

<style lang="stylus">
.Listcomment
    .list
        background #fff
        position:relative;
        padding:10px;
        .head
            width:22px
            height:22px
            border-radius 100%
            overflow hidden
            float left
            background-size:cover
            background-repeat: no-repeat
            background-position: center
        .cont
            margin-left:32px;
            h3
                font-size: 16px;
                line-height: 22px;
                overflow: hidden;
                margin-bottom: 6px;
                small
                    font-size: 12px;
                    color: #999;   
            .txt
                font-size:15px;
                line-height: 20px;
                position: relative;
                padding-right: 40px;
                color: #666;
                margin-bottom: 8px;
                .reply_btn
                    display inline-block
                    width 25px
                    height 21px
                    background url('../../assets/reply_ico.png') center no-repeat
                    background-size contain
                    position:absolute;
                    right: 0px;
                    bottom: 0px;
            .reply
                background:#f5f5f5;
                padding: 4px;
                border-radius: 2px;
                ul li
                    line-height: 20px;
                    color: #999;
                    font-size: 13px;
                    margin:4px 0;
                    .bt 
                        color:#666;            
    .list:after 
        content:''; 
        left:10px; 
        right: 0px;
        bottom:0; 
        height: 1px; 
        background: #e6e6e6; 
        position:absolute;
    .list:last-child:after 
        display:none;
</style>