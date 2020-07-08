<template>
    <div class="ebook">
      <!-- 顶部title模块，这个模块的z-index是101 -->
        <title-bar :showif="showif" @test="test"></title-bar>
        <!-- 电子书区域，这片区域z-index设置为100 -->
        <div class="ebookwrapper">
            <div id="read"></div>
            <!-- 中部蒙版 -->
            <div class="mask">
                <div class="left" @click="back"></div>
                <div class="center" @click="show" ></div>
                <div class="right" @click="goto"></div>
            </div>
        </div>
        <!-- 底部组件组件的z-index是101 -->
        <!-- 在底部组件中还有一个setmenu组件，这个组件的z-index是105 -->
        <menu-bar :showif="showif" ref="part"
        :bookAvailable='bookAvailable'
        :themeslist="themeslist"
        :defaulttheme="defaulttheme"
        @changetheme="setTheme"
        @changesize="changefontsize"
        @onProgresschange="onProgresschange"
        @jumpto="jumpto"
        :navigation="navigation"
        :defaultfontsize="defaultfontsize"
        :fontSizeList="fontSizeList"></menu-bar>
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
      ],
      // 设置默认主题
      defaulttheme: 0,
      bookAvailable: false,
      navigation: {}
    }
  },
  methods: {
    test () {
      this.themes.select('gold')
    },
    // 目录跳转函数
    jumpto (href) {
      this.rendition.display(href)
      this.hideTitleandMenu()
    },
    // 隐藏页面其他组件
    hideTitleandMenu () {
      this.iftitleandmenushow = false
      this.showif = false
      this.$refs.part.hidecontent()
    },
    // 进度条函数
    onProgresschange (progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
      console.log('结束了吗')
    },
    // 设置主题
    setTheme (index) {
      console.log('接下来是主题测试-------', index)
      this.themes.select(this.themeslist[index].name)
      console.log('主题就是---------', this.themeslist[index].name)
      this.defaulttheme = index
    },
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
      this.sayhi()
      this.setTheme(this.defaulttheme)
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        console.log(this.navigation)
        return this.book.locations.generate()
      }).then(result => {
        // 这部分能够访问到
        this.locations = this.book.locations
        this.bookAvailable = true
      })
    },
    // 点击屏幕左侧，实现左翻页
    back () {
      this.rendition.prev()
    },
    // 点击屏幕右侧，实现右翻页
    goto () {
      this.rendition.next()
    },
    // 显示上下组件
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
