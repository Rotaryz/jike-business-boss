<template>
  <article class="overview">总览</article>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data() {
      return {}
    },
    created() {
      this.$emit('tabChange', 1)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
</style>
