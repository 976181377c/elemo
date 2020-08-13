<template>
<transition name="detail">
  <div class="detail">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <div class="name">{{seller.name}}</div>
        <div class="star-wrapper">
          <star :score="seller.score"
                :size=48 />
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul class="supports"
            v-if="seller.supports">
          <li class="supports-item"
              v-for="(item,index) in seller.supports"
              :key="index">
            <supporticon class="icon"
                         :type="item.type"
                         :size=2 />
            <span class="description">{{item.description}}</span>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin">
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <div class="detail-close">
      <div class="icon-close"
           @click="detailShow"></div>
    </div>
  </div>
</transition>
</template>

<script>
import supporticon from '@/components/support-ico/support-ico';
import star from '@/components/star/star'
export default {

  props: {
    seller: {}
  },
  data () {
    return {
      key: "supports"
    }
  },
  methods: {
    detailShow () {
      this.$emit('showDetail')
    }
  },
  components: {
    star,
    supporticon
  }

}
</script>

<style lang="stylus" scoped>
.detail
  position fixed
  top 0
  left 0
  z-index 100
  width 100%
  height 100%
  overflow auto
  background-color rgba(7, 17, 27, 0.8)
  color #fff
  &.detail-enter-active, &.detail-leave-active
    transition all 0.2s
    opacity 1
  &.detail-enter, &.detail-leave-to
    transition all 0.2s
    filter blur(15px)
    opacity 0
  .detail-wrapper
    width 100%
    min-height 100%
    .detail-main
      margin-top 64px
      padding-bottom 64px
      .name
        line-height 16px
        font-size 16px
        font-weight bold
        text-align center
      .star-wrapper
        margin-top 18px
        padding 2px 0
        text-align center
      .title
        display flex
        width 80%
        margin 28px auto 24px auto
        font-weight bold
        .line
          flex 1
          position relative
          top -6px
          border-bottom 1px solid rgba(255, 255, 255, 0.2)
        .text
          margin auto 12px
      .supports
        width 80%
        font-weight normal
        margin auto
        .supports-item
          padding 0 12px
          margin-bottom 12px
        &:last-child
          margin-bottom 0px
        .description
          line-height 16px
          font-size 12px
          margin-left 6px
      .bulletin
        width 80%
        margin auto
        p
        padding 0 12px
        line-height 24px
        font-size 12px
  .clearfix
    display inline-block
    &:after
      content '.'
      height 0
      line-height 0
      clear both
      visibility hidden
  .detail-close
    position relative
    width 32px
    height 32px
    margin -64px auto 0 auto
    clear both
    font-size 32px
</style>