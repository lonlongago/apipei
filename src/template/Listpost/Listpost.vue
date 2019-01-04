<template>
    <div class="Listpost">
        <ul>
            <li class="list" v-for="item in lists" v-if="tab == 0">
                <div class="cont" @click="gotoDetail(item.life_id)">
                    <div class="title">
                        <span class="state fr">{{item.status_lable}}</span>
                        <h3 class="overflow_clear">{{item.title}}</h3>
                    </div>
                    <div class="duty">
                        <span class="top" v-if="item.top_lable != ''">{{item.top_lable}}</span>
                        <span class="top" v-if="item.promot_lable != ''">{{item.promot_lable}}</span>
                        <span v-if="item.cate_lable_detail != ''">{{item.cate_lable_detail}}</span>
                        {{item.contact}}
                    </div>
                    <div class="tag" v-if="item.lable.length">
                        <span v-for="li in item.lable">{{li}}</span>
                    </div>
                    <div class="addr_box">
                        <div class="time fr black9">{{item.dateline}}</div>
                        <div class="addr overflow_clear" v-if="item.addr != ''"><i class="ico"></i>{{item.addr}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <template v-for="li in item.btn_list" v-if="item.btn_list.length">
                        <button class="btn-primary-line" v-if="li.action == 'promot'" @click="gotoTotop(item.life_id)">推广</button>
                        <button class="btn-default-line" v-if="li.action == 'refresh'" @click="refresh(item)">刷新</button>
                        <button class="btn-default-line" v-if="li.action == 'up'" @click="up(item.life_id)">上架</button>
                        <button class="btn-default-line" v-if="li.action == 'drop'" @click="drop(item.life_id)">下架</button>
                        <button class="btn-default-line" v-if="li.action == 'delete'" @click="del(item.life_id)">删除</button>
                        <button class="btn-primary" v-if="li.action == 'pay'" @click="pay(item.order_id)">去支付</button>
                        <button class="btn-primary" v-if="li.action == 'again'" @click="again(item.life_id)">重新发布</button>
                    </template>
                </div>

            </li>
            <li class="list" v-for="item in lists" v-if="tab == 1">
                <div class="cont" @click="gotoDetail(item.life_id)">
                    <div class="fl img"><img :src="item.member_face" /></div>
                    <div class="text">
                        <div class="title">
                            <!-- <span class="state fr">{{item.state}}</span> -->
                            <h3 class="overflow_clear">{{item.title}}</h3>
                        </div>
                        <div class="duty">
                            <span class="top" v-if="item.top_lable != ''">{{item.top_lable}}</span>
                            <span>{{item.cate_lable_detail}}</span>
                            {{item.contact}}
                        </div>
                        <div class="tag" v-if="item.lable != ''">
                            <span v-for="li in item.lable">{{li}}</span>
                        </div>
                        <div class="addr_box">
                            <div class="time fr black9">{{item.dateline_lable}}</div>
                            <div class="addr overflow_clear" v-if="item.addr != ''"><i class="ico"></i>{{item.addr}}</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul> 
    </div>
</template>

<script>
    export default {
        props:['lists','tab'],
        data(){
            return{

            }
        },
        methods:{
            // 跳转置顶推广页
            gotoTotop(life_id){
                var url='/life/totop'
                this.$router.push({path:url,query:{life_id:life_id}});
            },
            //跳转信息详情页
            gotoDetail(life_id){
                var url='/life/infordetail'
                this.$router.push({path:url,query:{life_id:life_id}});
            },
            //上架
            up(e){
                this.$emit('up',e)
            },
            //下架
            drop(e){
                this.$emit('drop',e)
            },
            //删除
            del(e){
                this.$emit('del',e)
            },
            //刷新
            refresh(e){
                this.$emit('refresh',e)
            },
            //支付
            pay(e){
                this.$emit('liftPay',e)
            },
            //重发布
            again(e){
                this.$emit('again',e)
            }
        }
    }
</script>

<style type="text/css">
    .Listpost .list{ background: #fff; margin-bottom: 10px; }
    .Listpost .cont{ padding: 10px; }
    .Listpost .cont .img{ width: 30px; height: 30px; border-radius: 100%; overflow: hidden; }
    .Listpost .cont .img img{ width: 100%; height: 100%; }
    .Listpost .cont .text{ margin-left: 44px; }
    .Listpost .cont .title{ font-size: 16px; line-height: 20px; overflow: hidden; }
    .Listpost .cont .title .state{ color: #f00; }
    .Listpost .cont .title h3{ margin-right: 90px; font-size: 16px; }
    .Listpost .cont .duty{ font-size: 12px; line-height: 18px; margin: 10px 0; }
    .Listpost .cont .duty span{ display: inline-block; padding: 0 4px; background: #f70; color: #fff; margin-right: 4px; }
    .Listpost .cont .duty .top{ background: #f30; }
    .Listpost .cont .tag{ overflow: hidden; }
    .Listpost .cont .tag span{ display: inline-block; padding: 0 4px; margin-right: 8px; font-size: 12px; line-height: 18px; background: #e6e6e6; color: #999; }
    .Listpost .cont .addr_box{ overflow: hidden; margin-top: 10px; font-size: 12px; line-height: 20px; }
    .Listpost .cont .addr_box .addr{ margin-right: 100px; }
    .Listpost .cont .addr_box .addr .ico{ display: inline-block; width: 11px; height: 16px; background: url(../../assets/addr_ico1.png) center no-repeat; background-size: contain; margin-right: 4px; vertical-align: text-bottom; font-size: 0; line-height: 0; }
    .Listpost .bottom{ border-top: 1px solid #e6e6e6; text-align: right; margin-left: 10px; padding: 10px; }
    .Listpost .pay{ border-top: 1px solid #e6e6e6; text-align: right; padding: 10px; }
</style>