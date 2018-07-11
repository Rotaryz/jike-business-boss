<template>
  <article class="ai-analyse">
    <scroll ref="scroll"
            v-if="dataArray.length"
            bcColor="#fff"
            :data="dataArray"
            :pullUpLoad="pullUpLoadObj"
            @pullingUp="onPullingUp"
    >
      <div class="user-card-box" v-for="(item,index) in dataArray" :key="index" @click="toCapacityModel(item)">
        <user-card :cardInfo="item" :idx="index" useType="ai"></user-card>
      </div>
    </scroll>
    <section class="exception-box" v-else>
      <exception errType="nodata"></exception>
    </section>
    <router-view @refresh="refresh"></router-view>
  </article>
</template>

<script type="text/ecmascript-6">
  import UserCard from 'components/user-card/user-card'
  import Scroll from 'components/scroll/scroll'
  import {Client} from 'api'
  import Toast from 'components/toast/toast'
  import {ERR_OK} from 'common/js/config'
  import Exception from 'components/exception/exception'

  const LIMIT = 10
  export default {
    name: 'AI',
    data() {
      return {
        dataArray: [],
        page: 1,
        limit: LIMIT,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了'
      }
    },
    created() {
      this.$emit('tabChange', 3)
      this.getCustomerList()
    },
    methods: {
      refresh() {
        setTimeout(() => {
          console.info('rank refresh')
        }, 300)
      },
      toCapacityModel(item) {
        const id = item.id
        const pageUrl = `/ai-analyse/capacity-model`
        console.log(pageUrl)
        this.$router.push({path: pageUrl, query: {id, pageUrl}})
      },
      getCustomerList() {
        const data = {order_by: '', page: 1, limit: LIMIT}
        Client.getCusomerList(data).then(res => {
          if (res.error === ERR_OK) {
            // this.dataArray = [...res.data, ...res.data, ...res.data]
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      onPullingUp() {
        // 更新数据 todo
        console.info('pulling up and load data')
        let page = ++this.page
        let limit = this.limit
        const data = {order_by: '', page, limit}
        Client.getCusomerList(data).then(res => {
          if (res.error === ERR_OK) {
            if (res.data && res.data.length) {
              this.dataArray.concat(res.data)
            } else {
              this.$refs.scroll.forceUpdate()
            }
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    components: {
      UserCard,
      Scroll,
      Toast,
      Exception
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .exception-box
    padding-top: 137px

  .ai-analyse
    position: absolute
    top: 62px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    .user-card-box
      height: 75px
      padding-left: 15px
</style>
