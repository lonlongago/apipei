<template>
    <div class="sheetitem2">
        <div class="box" :class="{show:sheetShow}">
            <div class="tit">{{title}}(可多选)
                <span class="confirm" @click="confirm">完成</span>
            </div>
            <div class="list_box">
                <ul>
                    <li v-for="(child,index) in catesChild" :class="{on:child.checked}">{{child.title}}
                        <input type="checkbox" name="" @click="select" :id="index">
                    </li>
                </ul>
            </div>
        </div>
        <div class="mask_bg" @click="cancel" style="opacity: 0.4;" v-show="sheetShow"></div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['catesChild','title','sheetShow'],
        data () {
            return {
                txt:'',
                idx:''
            }
        },
        mounted(){
        },
        methods:{
            cancel(){
                this.$emit("cancel");
            },
            select(e){
               var catesChild = this.catesChild;
               var idx = e.target.id;
               if(e.target.checked){
                    catesChild[idx].checked = true;
               }else{
                    catesChild[idx].checked = false;
               };
               this.catesChild = catesChild;
            },
            confirm(){
                this.$emit("select",this.catesChild);
            }
        }
    }
</script>

<style type="text/css">
    .sheetitem2 .box{display: block;position: fixed;z-index: 999;width: 100%;bottom: 0;left: 0; background: #fff; transition:all 0.2s ease-in-out; transform: translate(0,100%);max-height:55%; overflow: hidden;}
    .sheetitem2 .box.show{transform: translate(0,0);}
    .sheetitem2 .tit{background: #fff; border-bottom: 1px solid #e6e6e6; font-size: 14px; color: #999; line-height: 50px; height: 50px; text-align: center; overflow: hidden; padding: 0 12px;}
    .sheetitem2 .confirm{float: right; color: #333;}
    .sheetitem2 .list_box{background: #fff; display: block; width: 100%; max-height: calc(100% - 100px); overflow: auto;}
    .sheetitem2 ul{overflow: hidden; padding: 10px;}
    .sheetitem2 ul li{line-height: 32px; text-align: center; font-size: 14px; color: #333;border: 1px solid #e6e6e6; float: left; padding: 0 12px;border-radius: 5px; position: relative; margin: 5px 10px; width: calc(33.33% - 20px); box-sizing: border-box; height: 34px;}
    .sheetitem2 ul li.on{color: #FF8C5D; border-color: #FF8C5D;}
    .sheetitem2 ul li input{position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0;}
</style>