<template>
  <header>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar"
             width="64"
             height="64" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}
        </div>
        <div v-if="seller.supports"
             class="support">
          <span class="icon">
            <supporticon :type="seller.supports[0].type"
                         :size="1"></supporticon>
          </span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports"
           class="support-count"
           @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right" />
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar"
           width="100%"
           height="100%">
    </div>
    <detail :seller="seller"
            v-show="isDetail"
            @showDetail="showDetail" />
  </header>
</template>

<script>
import supporticon from '@/components/support-ico/support-ico';
import detail from '@/components/header-detail/header-detail';


export default {
  props: {
    seller: {
      type: Object,
    },
  },
  data () {
    return {
      classMap: {},
      isDetail: false
    };
  },
  methods: {
    showDetail () {
      this.isDetail = !this.isDetail
    }
  },
  components: {
    supporticon,
    detail

  },
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
@import '../../common/stylus/icon'
header
  position relative
  color #ffffff
  overflow hidden
  background-color rgba(7, 17, 27, 0.2)
  .content-wrapper
    position relative
    padding 24px 12px 18px 24px
    font-size 0px
    .avatar
      display inline-block
      font-size 0px
      img
        border-radius 2px
    .content
      vertical-align top
      margin-left 16px
      display inline-block
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          width 30px
          height 18px
          vertical-align top
          bg-image('brand')
          background-repeat no-repeat
          background-size 30px 18px
        .name
          font-size 16px
          margin 6px
          line-height 18px
          font-weight bold
      .description
        margin-bottom 10px
        line-height 12px
        font-size 12px
      .support
        .text
          display inline-block
          line-height 12px
          font-size 10px
          vertical-align top
          margin-left 4px
    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      border-radius 14px
      background rgba(0, 0, 0, 0.2)
      text-align center
      .count
        font-size 10px
        line-height 24px
        vertical-align top
      .icon-keyboard_arrow_right
        line-height 24px
        margin-left 2px
        font-size 10px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background-color rgba(7, 17, 27, 0.2)
    .bulletin-title
      display inline-block
      vertical-align top
      margin-top 7px
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    .bulletin-text
      vertical-align top
      margin 0 4px
      font-size 10px
    .icon-keyboard_arrow_right
      position absolute
      right 12px
      top 7px
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
</style>