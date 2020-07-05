<template>
    <div class="menubar">
        <!-- 这是底部导航栏 -->
        <transition name="slide-up">
            <div class="footerwrapper" :class="{noshadow: charactorshow}" v-show="showif">
                <div class="headericon">
                    <span class="icon-menu"></span>
                </div>
                <div class="headericon">
                    <span class="icon-flag" ></span>
                </div>
                <div class="headericon">
                    <span class="icon-sun"></span>
                </div>
                <div class="headericon" @click="shownow">
                    <span class="icon-a" >A</span>
                </div>
            </div>
        </transition>
        <!-- 这是字体调整栏 -->
        <transition name="slide-up">
         <div class="settingwrapper" v-show="charactorshow">
            <div class="setfontsize">
                <div class="preview" :style="{fontSize: fontSizeList[0].fontSize+'px'}">A</div>
                <!-- 选择字体大小横线部分 -->
                <div class="selected">
                    <div class="select" v-for="(item,index) in fontSizeList" :key="index">
                    <!-- 左横线 -->
                        <div class="line"></div>
                        <!-- 中间远点 -->
                        <div class="pointwrapper" @click="changesize(item.fontSize)">
                            <div class="point" v-show="defaultfontsize==item.fontSize">
                                <div class="smallpoint"></div>
                            </div>
                        </div>
                        <!-- 右横线 -->
                        <div class="line"></div>
                    </div>
                </div>
                <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
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
    },
    fontSizeList: {
      type: Array
    },
    defaultfontsize: Number
  },
  data () {
    return {
      charactorshow: false
    }
  },
  methods: {
    shownow () {
      this.charactorshow = !this.charactorshow
    },
    hidenow () {
      this.charactorshow = false
    },
    changesize (val) {
      this.$emit('changesize', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/global';
.menubar{
    .footerwrapper{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        z-index: 101;
        height: px2rem(48);
        background: #fff;
        box-shadow: px2rem(8) 0 px2rem(8) rgba(0, 0, 0, .15);
        &.noshadow{
            box-shadow: none;
        }
        .headericon{
            flex: 1;
            @include center();
            font-size: px2rem(22);
        }
        &.slide-up-enter, &.slide-up-leave-to{
            transform: translate3d(0, 100%, 0);
        }
        &.slide-up-enter-to, &.slide-up-leave{
            transform: translate3d(0, 0, 0)
        }
        &.slide-up-enter-active, &.slide-up-leave-active{
            transition: all .3s linear;
        }
    }
    .settingwrapper{
        position: absolute;
        left: 0;
        bottom: px2rem(48);
        width: 100%;
        z-index: 110;
        height: px2rem(60);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        &.slide-up-enter, &.slide-up-leave-to{
            transform: translate3d(0, 100%, 0);
        }
        &.slide-up-enter-to, &.slide-up-leave{
            transform: translate3d(0, 0, 0);
        }
        &.slide-up-enter-active, &.slide-up-leave-active{
            transition: all .3s linear;
        }
        .setfontsize{
            display: flex;
            height: 100%;
            align-items: center;
            .preview{
                flex: 0 0 px2rem(40);
                 @include center;
            }
            .selected{
                display: flex;
                flex: 1;
                .select{
                    flex: 1;
                    display: flex;
                    &:first-child{
                        .line{
                            &:first-child{
                                border-top: none;
                            }
                        }
                    }
                    &:last-child{
                    .line{
                            &:last-child{
                                border-top: none;
                            }
                        }
                    }
                    .line{
                        flex: 1;
                        height: 0;
                        border-top: px2rem(1) solid #ccc;
                    }
                    .pointwrapper{
                        position: relative;
                        flex: 0 0 0;
                        width: 0;
                        height: px2rem(7);
                        border-left: px2rem(1) solid #ccc;
                        .point{
                            position: absolute;
                            top: px2rem(-8);
                            left: px2rem(-10);
                            width: px2rem(20);
                            height: px2rem(20);
                            border-radius: px2rem(20);
                            background: white;
                            border: px2rem(1) solid #ccc;
                            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
                            @include center;
                            .smallpoint{
                                width: px2rem(5);
                                height: px2rem(5);
                                background: black;
                                border-radius: px2rem(5);
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>
