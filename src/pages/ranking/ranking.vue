<template>
  <article class="ranking">
    <!--<router-link to="/ranking/customer-list">客户列表</router-link>-->
    <router-view @refresh="refresh"></router-view>
  </article>
</template>

<script type="text/ecmascript-6">
  import UserCard from 'components/user-card/user-card'
  import Scroll from 'components/scroll/scroll'
  import {Client} from 'api'
  import Toast from 'components/toast/toast'
  import {ERR_OK} from '../../common/js/config'

  const LIMIT = 10
  export default {
    name: '',
    data() {
      return {
        dataArray: [],
        page: 1,
        limit: LIMIT
      }
    },
    created() {
      this.$emit('tabChange', 2)
    },
    methods: {
      refresh() {
        setTimeout(() => {
          console.info('rank refresh')
        }, 300)
      },
      getCustomerList() {
        const data = {order_by: '', page: 1, limit: LIMIT}
        Client.getCusomerList(data).then(res => {
          if (res.error === ERR_OK) {
            this.dataArray = res.data
            console.log(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      }
    },
    components: {
      UserCard,
      Scroll,
      Toast
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
    background-color: $color-white-fff
</style>
