<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease"
           v-show="food.count>0"
           @click.stop="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span></div>
    </transition>
    <div class="cartr-count"
         v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add"
         @click.stop="addCart">
      <span class="icon-add_circle"></span></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      }
      else {
        this.food.count++;
      }
    },
    decreaseCart () {
      this.food.count--;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    .inner
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
      transform all 0.4s linear
      transform rotate(0)
    &.move-enter-active, &.move-leave-active
      transition all 0.4s linear
    &.move-enter, &.move-leave-active
      opacity 0
      transform translate3d(24px, 0, 0)
  .cartr-count
    display inline-block
    line-height 24px
    font-size 12px
    width 12px
    text-align center
    vertical-align top
    padding-top 6px
    color rgb(147, 153, 159)
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
</style>