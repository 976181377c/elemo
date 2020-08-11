<template>
  <div class="star">
    <div v-for="(item,index) in starClass"
         :key="index+item"
         class="star-item">
      <samp :class="[item,starType]"></samp>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size;
    },
    starClass () {
      var stars = []
      let score = this.score
      for (let i = 0; i < 5; i++, score--) {
        if (score >= 1) {
          stars.push('on')
        } else if (score < 0) {
          stars.push('off')
        } else {
          stars.push('half')
        }
      }
      return stars;
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.star
  .star-item
    display inline-block
    background-repeat no-repeat
    .star-48
      display inline-block
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
    .on
      bg-image('star48_on')
    .half
      bg-image('star48_half')
    .off
      bg-image('star48_off')
    .star-36
      display inline-block
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
    .on
      bg-image('star36_on')
    .half
      bg-image('star36_half')
    .off
      bg-image('star36_off')
    .star-24
      display inline-block
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
    .on
      bg-image('star24_on')
    .half
      bg-image('star24_half')
    .off
      bg-image('star24_off')
</style>