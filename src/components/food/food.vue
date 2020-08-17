<template>
  <transition name="food">
    <div v-show="food.is"
         class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back"
               @click="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail-content">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old"
                  v-show="food.oldPrice">
              ¥{{food.oldPrice}}
            </span>
          </div>
          <div ref="addfood"
               class="cartcontrol-wapper">
            <cartcontrol :food="food" />
          </div>
          <transition name="buy">
            <div class="buy"
                 @click="add"
                 v-show="!food.count||food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
        <split />
        <div class="info"
             v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info" />
        <div class="rating">
          <div class="title">商品评价</div>
          <ratingSelect :ratings="ratings"
                        :onlyContent="onlyContent"
                        :select-type="selectType"
                        :desc="desc" />
          <div class="rating-wrapper">
            <ul v-show="computedRatings && computedRatings.length">
              <li v-for="(rating,index) in computedRatings"
                  class="rating-item border-bottom-1px"
                  :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar"
                       width="12"
                       height="12"
                       :src="rating.avatar">
                </div>
                <div class="time">{{format(rating.rateTime)}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating
                    .rateType===0,'icon-thumb_down':rating
                    .rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating"
                 v-show="!computedRatings || !computedRatings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import split from '@/components/split/split'
import ratingSelect from '@/components/ratingSelect/ratingSelect'
import moment from 'moment'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  data () {
    return {
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      onlyContent: {
        is: false
      },
      selectType: {
        type: ALL
      }
    }
  },
  props: {
    foodShow: {},
    food: {
      type: Object,
      default: null
    },
  },
  mounted () {

  },
  methods: {
    creatScoll () {
      this.$nextTick(() => {
        this.scroll = new BScroll('.food', {
          mouseWheel: true,
          click: true
        });
      });
    },
    back () {
      this.scroll.destroy()
      this.food.is = false;
      this.onlyContent.is = false
      this.selectType.type = ALL
    },
    add () {
      if (this.food.count == null) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    format (time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  },
  computed: {
    ratings () {
      return this.food.ratings
    },
    computedRatings () {
      let obj = this.food.ratings
      if ((this.onlyContent.is == true) && this.food.ratings != null) {
        obj = this.food.ratings.filter((rating) => {
          return rating.text != ""
        }); 
      }
      if (this.selectType.type != ALL) {
          return obj.filter((rating) => {
            return rating.rateType == this.selectType.type
          });
        }
      return obj
    }
  },
  components: {
    cartcontrol,
    split,
    ratingSelect
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/variable'
.food
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 24
  width 100%
  background #fff
  &.food-enter-active, &.food-leave-active
    transition all 0.5s
    transform translate3d(0, 0, 0)
  &.food-enter, &.food-leave-to
    transition all 0.5s
    transform translate3d(100%, 0, 0)
  .food-content
    position absolute
    width 100%
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 12px
          color #fff
    .content
      position relative
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color #000
      .detail-content
        margin-bottom 18px
        line-height 10px
        height 10px
        .sell-count, .rating
          font-size 12px
          color rgba(0, 0, 0, 0.5)
        .sell-count
          margin-right 12px
      .price
        line-height 24px
        font-weight 700
        .now
          margin-right 8px
          font-size 16px
          font-weight 700
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 12px
          color rgba(0, 0, 0, 0.5)
    .cartcontrol-wapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 19px
      z-index 10
      height 24px
      line-height 24px
      padding 0 12px
      border-radius 12px
      font-size 10px
      color #fff
      background rgb(0, 160, 220)
      &.buy-enter-active, &.buy-leave-active
        transition all 0.5s
        opacity 1
        transform translate3d(0, 0, 0)
      &.buy-enter, &.buy-leave-to
        transition all 0.5s
        opacity 0
  .info
    padding 18px
    .title
      line-height 14px
      margin-bottom 6px
      font-size 14px
      color rgb(7, 17, 27)
    .text
      line-height 24px
      padding 0 8px
      font-size 12px
      color rgb(77, 85, 93)
  .rating
    padding-top 18px
    .title
      line-height 14px
      margin-left 18px
      font-size $fontsize-medium
      color $color-dark-grey
    .rating-wrapper
      padding 0 18px
      .rating-item
        position relative
        padding 16px 0
        .user
          position absolute
          right 0
          top 16px
          display flex
          align-items center
          line-height 12px
          .name
            margin-right 6px
            font-size $fontsize-small-s
            color $color-light-grey
          .avatar
            border-radius 50%
        .time
          margin-bottom 6px
          line-height 12px
          font-size $fontsize-small-s
          color $color-light-grey
        .text
          line-height 16px
          font-size $fontsize-small
          color $color-dark-grey
          .icon-thumb_up, .icon-thumb_down
            margin-right 4px
            line-height 16px
            font-size $fontsize-small
          .icon-thumb_up
            color $color-blue
          .icon-thumb_down
            color $color-light-grey
      .no-rating
        padding 16px 0
        font-size $fontsize-small
        color $color-light-grey
</style>
