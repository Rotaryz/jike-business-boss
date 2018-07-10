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
        >
          <div class="user-card-box" v-for="(item,index) in dataArray" :key="index">
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
        limit: LIMIT
      }
    },
    created() {
      this.getCustomerList()
    },
    methods: {
      refresh() {
        setTimeout(() => {
          console.info('list refresh')
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
      .user-card-box
        height: 75px
        padding-left: 15px
</style>
