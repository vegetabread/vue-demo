<template>
    <div class="menubar">
        <!-- 这是底部导航栏 -->
        <transition name="slide-up">
            <div class="footerwrapper" :class="{noshadow: charactorshow}" v-show="showif">
                <div class="headericon">
                    <span class="icon-menu" @click="showmenu(3)"></span>
                </div>
                <div class="headericon">
                    <span class="icon-flag" @click="showpro(2)"></span>
                </div>
                <div class="headericon" @click="showtheme(1)">
                    <span class="icon-sun"></span>
                </div>
                <div class="headericon" @click="shownow(0)">
                    <span class="icon-a" >A</span>
                </div>
            </div>
        </transition>
        <!-- 这是字体调整栏 -->
        <transition name="slide-up">
         <div class="settingwrapper" v-show="charactorshow">
            <div class="setfontsize" v-if="showtag === 0">
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
            <div class="setting-theme" v-else-if="showtag === 1">
             <div class="setting-part"  v-for="(item,index) in themeslist" :key="index">
                 <div class="top" :class="{'noborder': item.name ==='default'}" :style="{background: item.style.body.background}"  @click="changetheme(index)"></div>
                 <div class="bottom" :class="{showsub: currenttheme === item.name}">{{item.name}}</div>
             </div>
            </div>
            <!-- 下面是滚动条部分 -->
            <div class="setprogress" v-else-if="showtag ===2">
                <div class="progress-wrapper">
                    <!-- 滚动条 -->
                    <input type="range" class="progress" max="100" min="0" step="1"
                     @input="onProgressInput($event.target.value)"
                     @change="onProgressChange($event.target.value)"
                     :value="progress"
                     :disabled="!bookAvailable"
                     ref="progress">
                </div>
                <!-- 提示页面加载中 -->
                <div class="text-wrapper">
                    <span>{{bookAvailable ? progress + '%' :'加载中...'}}</span>
                </div>
            </div>
         </div>
        </transition>
        <!-- 插入的组件 -->
        <set-menu :ifshowcontent="ifshowcontent"
        v-show="ifshowcontent"
        :navigation="navigation"
        :bookAvailable="bookAvailable"
        @jumpto="jumpto"></set-menu>
        <!-- -------------------- -->
        <transition name="fade">
            <div class="contentmask"
            v-show="ifshowcontent"
            @click="hidecontent"></div>
        </transition>
    </div>
</template>
<script>
import SetMenu from './comp/setmenu'
export default {
  props: {
    showif: {
      type: Boolean,
      default: false
    },
    fontSizeList: {
      type: Array
    },
    defaultfontsize: Number,
    defaulttheme: Number,
    themeslist: Array,
    bookAvailable: Boolean,
    navigation: Object
  },
  data () {
    return {
      charactorshow: false,
      showtag: 0,
      currenttheme: '',
      progress: 0,
      ifshowcontent: false
    }
  },
  components: {
    SetMenu
  },
  methods: {
    jumpto (val) {
      this.$emit('jumpto', val)
    },
    hidecontent () {
      this.ifshowcontent = false
    },
    showmenu (val) {
      this.ifshowcontent = true
    },
    onProgressInput (progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    onProgressChange (progress) {
      this.$emit('onProgresschange', progress)
    },
    //   修改主题函数
    changetheme (val) {
      console.log('接下来就是emit测试', val)
      this.$emit('changetheme', val)
    },
    show (val) {
      this.charactorshow = !this.charactorshow
      this.showtag = val
    },
    showpro (val) {
      this.charactorshow = !this.charactorshow
      this.showtag = val
    },
    showtheme (val) {
      this.charactorshow = !this.charactorshow
      this.showtag = val
    },
    shownow (val) {
      this.charactorshow = !this.charactorshow
      console.log('dianjinlaile ')
      if (this.showtag !== val) {
        this.showtag = val
        this.charactorshow = !this.charactorshow
      }
      this.showtag = val
    },
    // 隐藏操作
    hidenow () {
      this.charactorshow = false
    },
    // 改变字体大小操作
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
        .setting-theme{
            display: flex;
            height: 100%;
            .setting-part{
                flex: 1;
                flex-direction: column;
                display: flex;
                padding: px2rem(4);
                .top{
                    flex: 1;
                    &.noborder{
                    border: px2rem(1) solid #ccc;
                    }
                }
                .bottom{
                    flex: 0 0 px2rem(20);
                    font-size: px2rem(14);
                    color: #ccc;
                    @include center
                }
            }
        }
        .setprogress{
            position: relative;
            width: 100%;
            height: 100%;
            .progress-wrapper{
                width: 100%;
                height: 100%;
                padding: 0 px2rem(30);
                box-sizing: border-box;
                @include center;
                .progress{
                    width: 100%;
                    height: px2rem(2);
                    -webkit-appearance: none;
                    background: -webkit-linear-gradient(#999, #999) no-repeat #ddd;
                    background-size: 0 100%;
                    &:focus {
                        outline: none;
                    }
                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: px2rem(20);
                        width: px2rem(20);
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
                        border: px2rem(1) solid #ddd;
                    }
                }
            }
            .text-wrapper{
                position: absolute;
                top: px2rem(40);
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                font-size: px2rem(17);
            }
        }
        .setmenu{
            width: 100%;
            height: 100%;
        }
    }
    .contentmask{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
        display: flex;
        width: 100%;
        height: 100%;
        background: rgba(51, 51, 51, .8);
    }
}
</style>
