<template>
    <div class="ebook">
      <!-- 头部组件 -->
        <title-bar :showif="showif"></title-bar>
        <div class="ebookwrapper">
          <!-- 电子书显示盒子 -->
            <div id="read"></div>
            <!-- 中部蒙版 -->
            <div class="mask">
                <div class="left" @click="back"></div>
                <div class="center" @click="show" ></div>
                <div class="right" @click="goto"></div>
            </div>
        </div>
        <!-- 底部导航栏组件 -->
        <menu-bar :showif="showif" ref="part" @changesize="changefontsize" :defaultfontsize="defaultfontsize" :fontSizeList="fontSizeList"></menu-bar>
    </div>
</template>
<script>
import Epub from 'epubjs'
import TitleBar from './components/titlebar'
import MenuBar from './components/menubar'
const DownLoad = './story.epub'
// global.ePub = Epub
export default {
  data () {
    return {
      showif: false,
      // 字体大小数据
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultfontsize: 16,
      // 主题数据设置
      themeslist: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000', background: '#fff'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              color: '#fff', background: '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              color: '#000', background: 'rgb(241, 236, 226)'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              color: '#000', background: '#ceeaba'
            }
          }
        }
      ]
    }
  },
  methods: {
    // 注册主题
    registerTheme () {
      this.themeslist.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    // 改变字体大小函数
    changefontsize (val) {
      this.defaultfontsize = val
      if (this.themes) {
        this.themes.fontSize(val + 'px')
      }
    },
    // 调用rendition的api在页面上展示
    showepub () {
      this.book = new Epub(DownLoad)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
      this.themes = this.rendition.themes
      this.changefontsize(this.defaultfontsize)
      this.registerTheme()
      this.themes.select('eye')
    },
    back () {
      this.rendition.prev()
    },
    goto () {
      this.rendition.next()
    },
    show () {
      this.showif = !this.showif
      this.$refs.part.hidenow()
    }
  },
  components: {
    TitleBar,
    MenuBar
  },
  mounted () {
    this.showepub()
  }
}
</script>
<style lang="scss" scoped>
@import './assets/global';
.ebook {
    position: relative;
    // background: red;
    .ebookwrapper{
        .mask{
            position: absolute;
            width: 100%;
            z-index: 100;
            display: flex;
            top: 0;
            left: 0;
            bottom: 0;
            .left{
                flex: 0 0 px2rem(100);
                // background: pink;
            }
            .center{
                flex: 1;
            }
            .right{
                flex: 0 0 px2rem(100);
                z-index: 0;
                // background: lightblue;
            }
        }
    }
}
</style>
