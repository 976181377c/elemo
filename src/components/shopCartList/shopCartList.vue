<template>
  <transition name="fold">
    <div class="shopcart-list">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty"
              @click.stop="clear()">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="food"
              v-for="(food,index) in selectFoods"
              :key="key+index">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>¥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import BScoll from 'better-scroll'

export default {
  data () {
    return {
      key: "shopcart"
    }
  },
  props: {
    selectFoods: {
      type:Array,
      default:null
    },
    isfood: {}
  },
  created () {
    this.storage = localStorage
  },
  methods: {
    clear () {
      for (let index in this.selectFoods) {
        this.selectFoods[index].count = 0
        this.listShow = false
      }
      this.isfood.is = !this.isfood.is
      localStorage.clear();
    },
    scoll () {
      if (this.scollList) {
        this.scollList.destroy()
      }
      this.$nextTick(() => {
        this.scollList = new BScoll('.list-content', {
          mouseWheel: true,
          click: true
        })
      })
    }
  },
  watch:{
    // selectFoods(){
    //   if(this.selectFoods)
    //   this.storage.setItem("selectFoods", JSON.stringify(this.selectFoods))
    //   console.log(JSON.parse(this.storage.selectFoods));
    //   // console.log("cc");
    // }
  },
  computed: {
  },
  components: {
    cartcontrol
  }

}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.shopcart-list
  position absolute
  left 0
  bottom 48px
  z-index -1
  width 100%
  &.fold-enter-active, &.fold-leave-active
    transition all 0.5s
    transform translate3d(0, 0, 0)
  &.fold-enter, &.fold-leave-to
    transition all 0.5s
    transform translate3d(0, 100%, 0)
  .list-header
    height 40px
    line-height 40px
    padding 0 18px
    background #f3f5f7
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .title
      float left
      font-size 14px
      color rgb(7, 17, 27)
    .empty
      float right
      font-size 12px
      color rgb(0, 160, 220)
  .list-content
    padding 0 18px
    max-height 217px
    background #fff
    overflow hidden
    .food
      position relative
      padding 12px 0
      box-sizing border-box
      &:before
        border-1px(rgba(7, 17, 27, 0.5))
      .name
        line-height 24px
        font-size 14px
        color rgb(7, 17, 27)
      .price
        position absolute
        right 90px
        bottom 12px
        line-height 24px
        font-size 14px
        font-weight 700
        color rgb(240, 20, 20)
      .cartcontrol-wrapper
        position absolute
        right 0
        bottom 4px
</style>