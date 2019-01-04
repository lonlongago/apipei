<template>
    <div class="sheetitem">
        <div class="box" :class="{show:sheetShow}">
            <div class="tit">{{title}}</div>
            <ul>
                <li v-for="(child,index) in catesChild" @click="select(child,index)" :class="{on:(child.checked == '1') || (child.obj && child.obj.checked == '1')}">{{child.title}}<input type="radio" name="" @click="select" :id="index"></li>
            </ul>
            <div class="cancel" @click="cancel">取消</div>
        </div>
        <div class="mask_bg" @click="cancel" style="opacity: 0.4;" v-show="sheetShow"></div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['catesChild','title','sheetShow'],
        data () {
            return {
            }
        },
        methods:{
            cancel(){
                this.$emit("cancel");
            },
            select(e,index){
                var catesChild = this.catesChild;
                for(var i=0;i<catesChild.length;i++){
                    catesChild[i].checked = 0;
                };
                catesChild[index].checked = '1'; 
                this.catesChild = catesChild;  
                this.$emit("select",e);
            }
        }
    }
</script>

<style type="text/css">
    .sheetitem .box{display: block;position: fixed;z-index: 999;width: 100%;bottom: 0;left: 0; background: #fff; transition:all 0.2s ease-in-out; transform: translate(0,100%);max-height:55%; overflow:auto;}
    .sheetitem .box.show{transform: translate(0,0);}
    .sheetitem .tit{background: #fff; border-bottom: 1px solid #e6e6e6; font-size: 14px; color: #999; line-height: 50px; height: 50px; text-align: center; position: sticky; width: 100%;top: 0;left: 0; z-index: 1;}
    .sheetitem ul{background: #fff; display: block; width: 100%; height: calc(100% - 100px); position: sticky; left: 0;}
    .sheetitem ul li{background: #fff; display: block; width: 100%; line-height: 44px; text-align: center; font-size: 14px; color: #333;border-bottom: 1px solid #e6e6e6;}
    .sheetitem ul li:last-child{border-bottom: 0;}
    .sheetitem ul li.on{color: #FF8959;}
    .sheetitem .cancel{background: #fff; font-size: 14px; color: #999; line-height: 50px; height: 50px; text-align: center;position: sticky;left: 0;bottom: 0;width: 100%; border-top: 1px solid #e6e6e6;}
</style>