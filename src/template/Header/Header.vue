<template>
    <div class="header">
        <i class="back_icon" @click="redirectBack"></i>
        <h1>{{ data }}</h1>
        <i
            v-if="isShare"
            class="share_icon"
        ></i>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
    props: {
        data: {
            type: String,
            default: ''
        },
        isShare: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        redirectBack () {
            window.history.back();
        }
    }
}
</script>

<style scoped lang="stylus">
.header
    display: block
    position: relative
    height: 44px
    padding: 0 15px
    background-color: #fff
    border-bottom: 1px solid #ddd
    h1
        font-size: 18px
        color: #333
        line-height: 44px
        text-align: center
        font-weight: 500
    .back_icon
        display: block
        position: absolute
        width: 8px
        height: 16px
        top: 14px
        left: 15px
        background: url('./back_icon.png') no-repeat 0 0
        background-size: cover
    .share_icon
        display: block
        position: absolute
        width: 18px
        height: 18px
        top: 13px
        right: 15px
        background: url('./share.png') no-repeat 0 0
        background-size: cover
</style>