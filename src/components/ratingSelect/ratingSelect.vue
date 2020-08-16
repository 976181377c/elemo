<template>
  <div class="ratingSelect">
    <div class="ratingType">
      <span @click="select(2)"
            class="block positive"
            :class="{'active':selectType.type===2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click="select(0)"
            class="block positive"
            :class="{'active':selectType.type===0}">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span @click="select(1)"
            class="block negative"
            :class="{'active':selectType.type===1}">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggle" :class="{'on':onlyContent.is}">
      <span class="icon-check_circle"></span>
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

const EVENT_SELECT = 'select'
const EVENT_TOGGLE = 'toggle'

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    selectType: {},
    onlyContent: {},
    desc: {
      type: Object,
      default () {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        }
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType.type === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type) {
      console.log(type);
      this.selectType.type = type
    },
    toggle () {
      console.log("only");
      this.onlyContent.is = !this.onlyContent.is
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/variable'
.ratingSelect
  .ratingType
    padding 18px 0
    margin 0 18px
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      line-height 16px
      border-radius 1px
      font-size $fontsize-small
      color $color-grey
      &.active
        color $color-white
      .count
        margin-left 2px
      &.positive
        background $color-light-blue
        &.active
          background $color-blue
      &.negative
        background $color-light-grey-s
        &.active
          background $color-grey
  .switch
    display flex
    align-items center
    padding 12px 18px
    line-height 24px
    border-bottom 1px solid $color-row-line
    color $color-light-grey
    &.on
      .icon-check_circle
        color $color-green
    .icon-check_circle
      margin-right 4px
      font-size $fontsize-large-xxx
    .text
      font-size $fontsize-small
</style>