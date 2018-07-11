<template>
  <transition name="slide">
    <article class="customer-list">
      <div class="progress" :style="progressStyle"></div>
      <div class="title">{{title}}</div>
      <div class="info-bar">全部 {{dataArray.length}} 位</div>
      <section class="content">
        <scroll ref="scroll"
                bcColor="#fff"
                :data="dataArray"
                :pullUpLoad="pullUpLoadObj"
                @pullingUp="onPullingUp"
        >
          <div class="user-card-box" v-for="(item,index) in dataArray" :key="index" @click="toCustomerDetail">
            <user-card :cardInfo="item" :idx="index" useType="rank-list"></user-card>
          </div>
        </scroll>
      </section>
      <toast ref="toast"></toast>
      <router-view @refresh="refresh"></router-view>
    </article>
  </transition>
</template>

<script type="text/ecmascript-6">
  import UserCard from 'components/user-card/user-card'
  import Scroll from 'components/scroll/scroll'
  import {Client} from 'api'
  import Toast from 'components/toast/toast'
  import {ERR_OK} from '../../common/js/config'

  const progressColor = ['#57BA15', '#F9B43C', '#F9863C', '#F9543D']
  const LIMIT = 10
  export default {
    name: 'CustomerList',
    data() {
      return {
        progress: 0,
        title: `预计成交率0-50%`,
        dataArray: [],
        page: 1,
        limit: LIMIT,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        pathUrl: '', // 父级路由
        customerId: '' // 员工ID
      }
    },
    created() {
      this.getCustomerList()
      this.customerId = this.$route.query.id
      this.pathUrl = this.$route.query.pathUrl
    },
    methods: {
      toCustomerDetail(item){
        const id = item.id
        const pathUrl = this.pathUrl + ``
        this.$router.push({path: pathUrl, query: {id, pathUrl}})
      },
      refresh() {
        setTimeout(() => {
          console.info('list refresh')
        }, 300)
      },
      getCustomerList() {
        const data = {order_by: '', page: 1, limit: LIMIT}
        Client.getCusomerList(data).then(res => {
          if (res.error === ERR_OK) {
            this.dataArray = [...res.data, ...res.data, ...res.data]
            console.log(res)
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
      progressStyle() {
        let index = 0
        if (this.progress <= 50) {
          index = 0
        } else if (this.progress <= 80) {
          index = 1
        } else if (this.progress <= 99) {
          index = 2
        } else {
          index = 3
        }
        return `background-color:${progressColor[index]}`
      },
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
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .customer-list
    fill-box()
    layout(column, block, nowrap)
    background-color: $color-white-fff
    z-index: 10
    .progress
      height: 5px
    .title
      font-family: $font-family-meddle
      font-size: $font-size-16
      color: $color-20202E
      height: 45px
      line-height: 45px
      text-align: center
    .info-bar
      font-family: $font-family-regular
      font-size: $font-size-12
      color: $color-888888
      height: 24px
      padding-left: 15px
      line-height: 24px
      background-color: $color-F0F2F5
    .content
      flex: 1
      overflow :hidden
      .user-card-box
        height: 75px
        padding-left: 15px
</style>
