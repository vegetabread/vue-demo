<template>
    <div>
        <transition name="slide-down">
            <div class="titlewrapper" v-show="showif">
                <div class="left">
                        <span class="icon-forward icon"></span>
                </div>
                <div class="right">
                    <div class="one">
                        <span class="icon-user icon" @click="test"></span>
                    </div>
                    <div class="one">
                        <span class="icon-menu icon"></span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  props: {
    showif: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    test () {
      this.$emit('test')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/global';
    .titlewrapper{
        position: absolute;
        width: 100%;
        height: px2rem(48);
        z-index: 101;
        left: 0;
        display: flex;
        background: #fff;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
        .left{
            flex: 0 0 px2rem(60);
            @include center;
        }
        .right{
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .one{
                flex: 0 0 px2rem(40)
            }
        }
        &.slide-down-enter, &.slide-down-leave-to{
            transform: translate3d(0, -100%, 0)
        }
        &.slide-down-enter-to, &.slide-down-leave{
            transform: translate3d(0, 0, 0);
        }
        &.slide-down-enter-active, &.slide-down-leave-active{
            transition: all .3s linear;
        }
    }
</style>
