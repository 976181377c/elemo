<template>
  <div id="app">
    <myheader :seller="seller" />
    <div class="tab">
      <div class="tab-item"
           @click="go_link('goods')"
           :class="{active:isActive=='goods'}">商品</div>
      <div class="tab-item"
           @click="go_link('ratings')"
           :class="{active:isActive=='ratings'}">评论</div>
      <div class="tab-item"
           @click="go_link('seller')"
           :class="{active:isActive=='seller'}">商家</div>
    </div>
    <div class="content">
      <router-view :seller="seller" />
    </div>

  </div>
</template>
<script>
import myheader from '@/components/myheader/myheader'
export default {
  data () {
    return {
      isActive: 'goods',
      seller: {}
    }
  },
  created () {
    this.$axios.get('/seller').then(res => {
      this.seller = res.data;
    })
    this.go_link('goods')
  },
  methods: {
    go_link (link_name) {
      this.isActive = link_name;
      this.$router.push({ name: link_name });
    }
  },
  components: {
    myheader
  }
}
</script>

<style>
.active {
  color: rgba(240, 20, 20, 1);
}
.tab {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tab .tab-item {
  font-size: 14px;
  flex: 1;
  text-align: center;
}
.tab::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  background: #cccccc;
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
router-link {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
