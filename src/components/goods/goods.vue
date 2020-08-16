<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item"
            v-for="(item,index) in goods"
            :key="index"
            :class="{'current':currentIndex===index}"
            @click="scrollGo(index)">
          <span class="text">
            <supporticon class="icon"
                         v-if="item.type>0"
                         :type="item.type"
                         :size="3" />
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item,index) in goods"
            :key="index+key"
            ref="foodListChild">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item"
                v-for="(item,index) in item.foods"
                :key="index"
                @click="clickFood(item)">
              <div class="icon">
                <img :src="item.icon"
                     width="57"
                     height="57">
              </div>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.description}}</p>
                <div class="extra">
                  <span class="count">月售{{item.sellCount}}</span>
                  <samp>好评率{{item.rating}}%</samp>
                </div>
                <div class="price">
                  <span class="now">¥{{item.price}}</span>
                  <span class="old"
                        v-show="item.oldPrice">¥{{item.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="item" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcar :deliveryPrice="seller.deliveryPrice"
             :minPrice="seller.minPrice"
             :selectFoods="selectFoods" />
    <food ref="food"
          :food="selectFood" />
  </div>
</template>

<script>
import supporticon from '@/components/support-ico/support-ico';
import BScoll from 'better-scroll'
import Shopcar from '@/components/shop-cart/shop-cart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import food from '@/components/food/food'

export default {
  props: {
    seller: {
      type: Object
    },
  },
  data () {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0,
      key: 'key',
      selectFood: {}
    }
  },
  created () {

    this.$axios.get('/goods').then(res => {
      this.goods = res.data;
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    })
  },
  methods: {
    _initScroll () {
      this.meunScroll = new BScoll('.menu-wrapper', {
        click: true
      });
      this.foodsScroll = new BScoll('.foods-wrapper', {
        probeType: 3,
        mouseWheel: true,
        click: true
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodListChild;
      let height = 0;
      this.listHeight.push(height)
      for (let item of foodList) {
        height += item.clientHeight;
        this.listHeight.push(height)
      }
    },
    scrollGo (index) {
      this.foodsScroll.scrollToElement(this.$refs.foodListChild[index], 200)
    },
    clickFood (item) {
      this.selectFood = item;
      console.log(this.selectFood);
      this.$set(this.selectFood, "is", true)
      this.$refs.food.creatScoll()
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if ((this.scrollY >= height1 && this.scrollY < height2) || !height2) {
          return i;
        }
      }
      return 0;
    },
    selectFoods () {
      let foods = [];
      // if (this.storage.selectFoods) {
      //   for (let index in this.goods) {
      //     let storagefoods = JSON.parse(this.storage.selectFoods)
      //   }
      // }
      for (let index in this.goods) {
        for (let item of this.goods[index].foods) {
          if (item.count > 0) {
            foods.push(item)
          }
        }
      }
      return foods;
    }
  },
  components: {
    supporticon,
    Shopcar,
    cartcontrol,
    food
  }

}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.goods
  display flex
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      position relative
      display table
      height 54px
      width 58px
      padding 0px 12px
      line-height 14px
      &.current
        position relative
        margin-top 1px
        z-index 10
        background #ffffff
        font-weight 700
        &:before
          content none
      .text
        display table-cell
        width 58px
        vertical-align middle
        // text-align center
        font-size 12px
      &:before
        border-1px(rgba(7, 17, 27, 0.4))
      .icon
        vertical-align top
  .foods-wrapper
    flex 1
    position relative
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dd1d
      font-size 12px
      color rgb(147, 153, 159)
      background-attachment #f3f5f7
    .food-item
      position relative
      display flex
      margin 18px
      padding-bottom 18px
      &:before
        border-1px(rgba(7, 17, 27, 0.4))
      &:last-child
        &:before
          content none
      .icon
        flex 0 0 57px
        font-size 0px
        img
          border-radius 2px
      .content
        position relative
        flex 1
        margin-left 10px
        .name
          margin-top 2px
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .extra, .desc
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-top 10px
          margin-bottom 10px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 0
</style>