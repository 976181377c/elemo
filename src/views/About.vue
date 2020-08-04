<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
    mounted:function(){
    this.getseller()
  },
  methods: {
    getseller () {
      console.log('cc');
      this.$axios.get('/seller').then(res => {
        console.log(res);
      })
    }
  }
}
</script>
