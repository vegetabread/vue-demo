<template>
    <transition name="slide">
        <div class="content">
            <div class="content-wrapper" v-if="bookAvailable">
                <div class="content-item" v-for="(item,index) in navigation.toc" :key="index" @click="jumpto(item.href)">
                    <span class="text">{{item.label}}</span>
                </div>
            </div>
            <div class="empty" v-else>加载中...</div>
        </div>
    </transition>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    ifshowcontent: Boolean,
    navigation: Object,
    bookAvailable: Boolean
  },
  mounted () {
    console.log('this is mountedd function ', this.bookAvailable)
  },
  methods: {
    jumpto (target) {
      this.$emit('jumpto', target)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/global';
.content{
    position: absolute;
    top: 0;
    left: 0;
    width: px2rem(240);
    height: 100%;
    z-index: 105;
    background: white;
    .content-wrapper{
        width: px2rem(240);
        height: 100%;
        overflow: hidden;
            .content-item{
                box-sizing: border-box;
                padding: px2rem(1) px2rem(4);
                border-bottom: px2rem(1) solid #ccc;
                .text{
                    font-size: px2rem(18);
                }
            }
    }
    .empty{
        width: 100%;
        height: 100%;
        font-size: px2rem(22);
        @include center
    }
}
</style>
