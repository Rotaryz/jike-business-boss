<template>
    <article class="ranking">排行榜</article>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data() {
      return {}
    },
    created() {
      this.$emit('tabChange', 2)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .ranking
    position: absolute
    top: 62px
    bottom: 0
    left: 0
    right: 0
    background-color: greenyellow
</style>
