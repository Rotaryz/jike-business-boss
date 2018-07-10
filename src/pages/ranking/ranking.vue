<template>
  <article class="ranking">
    <router-link to="/ranking/customer-list">客户列表</router-link>
    <section class="tool-bar-box">
      <ul class="tab-one">
        <li :class="['tab-one-item',tabOneIndex===index?'active':'']"
            v-for="(item,index) in tabOne"
            @click="changeTabOne(index)"
            :key="index"
        >
          {{item}}
        </li>
      </ul>
      <div class="tab-two-container">
        <div class="tab-two-box">
          <!--客户-->
          <ul class="tab-two" v-if="tabOneIndex===0">
            <li class="tab-two-item"
                v-for="(item,index) in tabCustomer.data"
                :key="index"
                @click="changeTabTwo(index)"
            >
              <div v-if="index===1">{{tabTwoLastLabel}}{{item}}</div>
              <div v-else>{{item}}</div>
              <img v-if="index===1" class="icon-down" src="./icon-down@3x.png" alt="">
            </li>
          </ul>
          <!--互动-->
          <ul class="tab-two" v-if="tabOneIndex===1">
            <li class="tab-two-item"
                v-for="(item,index) in tabActive.data"
                :key="index"
                @click="changeTabTwo(index)"
            >
              <div>{{item}}</div>
            </li>
          </ul>
          <!--成交率-->
          <ul class="tab-two" v-if="tabOneIndex===2">
            <li class="tab-two-item"
                v-for="(item,index) in tabTurnover.data"
                :key="index"
                @click="changeTabTwo(index)"
            >
              <div>{{item}}</div>
            </li>
          </ul>
          <dl class="tab-line-wrap" :style="tabTwoStyle">
            <dt class="tab-line"></dt>
          </dl>
        </div>
      </div>
    </section>
    <section class="content">
      <scroll ref="scroll"
              bcColor="#fff"
              :data="dataArray"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
      >
        <div class="user-card-box"
             v-if="dataArray.length" v-for="(item,index) in dataArray"
             :key="index"
             @click="toCustomerList(item)"
        >
          <user-card :cardInfo="item" :idx="index" useType="ranking"></user-card>
        </div>
      </scroll>
    </section>
    <action-sheet ref="sheet" :dataArray="groupList" @changeGroup="changeGroup"></action-sheet>
    <toast ref="toast"></toast>
    <router-view @refresh="refresh"></router-view>
  </article>
</template>

<script type="text/ecmascript-6">
  import UserCard from 'components/user-card/user-card'
  import Scroll from 'components/scroll/scroll'
  import {Client} from 'api'
  import Toast from 'components/toast/toast'
  import {ERR_OK} from '../../common/js/config'
  import ActionSheet from 'components/action-sheet/action-sheet'

  const LIMIT = 10
  const tabOne = ['按客户数', '按互动数', '按成交率']
  const tabCustomer = {data: ['客户总数', '新增客户'], idx: 0}
  const tabActive = {data: ['跟进客户数', '咨询客户数'], idx: 0}
  const tabTurnover = {data: ['0-50%', '51-80%', '81-99%', '100%'], idx: 0}
  const tabTwo = [tabCustomer, tabActive, tabTurnover]
  const groupList = {data: ['昨天', '近7天', '近30天'], idx: 0}
  export default {
    name: 'Ranking',
    data() {
      return {
        groupList,
        dataArray: [],
        page: 1,
        limit: LIMIT,
        tabOne,
        tabOneIndex: 0,
        tabCustomer,
        tabActive,
        tabTurnover,
        transitionTime: 0,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了'
      }
    },
    created() {
      this.$emit('tabChange', 2)
      this.getCustomerList()
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
            this.dataArray = [...res.data, ...res.data, ...res.data]
            console.log(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      changeTabOne(index) {
        this.transitionTime = 0
        this.tabOneIndex = index
        this.resetReqParams()
      },
      changeTabTwo(index) {
        this.transitionTime = 0.3
        if (this.tabOneIndex === 0 && index === 1 && tabTwo[this.tabOneIndex].idx === index) {
          this.$refs.sheet.show()
        }
        tabTwo[this.tabOneIndex].idx = index
        this.resetReqParams()
      },
      toCustomerList(item) {
        console.log(item)
      },
      resetReqParams() {
        this.page = 1
        this.limit = LIMIT
      },
      changeGroup() {
        console.log(1)
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
      tabTwoStyle() {
        return `
        width:${100 / tabTwo[this.tabOneIndex].data.length}%;
        transform:translate3d(${tabTwo[this.tabOneIndex].idx * 100}%, 0, 0);
        transition: all ${this.transitionTime}s
        `
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      tabTwoLastLabel() {
        let arr = this.groupList.data
        let idx = this.groupList.idx
        return arr[idx]
      }
    },
    components: {
      UserCard,
      Scroll,
      Toast,
      ActionSheet
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .ranking
    position: fixed
    top: 62px
    bottom: 0
    left: 0
    right: 0
    layout(column, block, nowrap)
    background-color: $color-white-fff
    z-index: 2
    .tool-bar-box
      .tab-one
        width: 270px
        height: 30px
        margin: 25px auto 28px
        layout(row)
        justify-content: center
        align-items: center
        .tab-one-item
          flex: 1
          height: 100%
          font-family: $font-family-meddle
          font-size: $font-size-14
          color: $color-20202E
          letter-spacing: 0.3px
          layout()
          justify-content: center
          align-items: center
          border: 0.5px solid rgba(32, 32, 46, 0.10)
          border-radius: 1px
          transition: all .6s
          background-color: $color-white-fff
          &.active
            color: $color-white-fff
            background-color: $color-20202E
      .tab-two-container
        border-bottom: 0.5px solid $color-col-line
        .tab-two-box
          position: relative
          margin: 0 15px
          .tab-two
            position: relative
            height: 30px
            layout(row, block, nowrap)
            .tab-two-item
              flex: 1
              layout(row)
              justify-content: center
              align-items: flex-start
              font-family: $font-family-regular
              font-size: $font-size-14
              color: $color-20202E
              .icon-down
                margin: 3px 0 0 3px
                width: 10px
                height: 5px
          .tab-line-wrap
            position: absolute
            bottom: 0
            left: 0
            width: 50%
            layout()
            align-items: center
            transition: all .3s
            transform: translate3d(0, 0, 0)
            .tab-line
              height: 3px
              width: 30px
              background-color: $color-20202E
    .content
      flex: 1
      overflow: hidden
      .user-card-box
        height: 75px
        padding-left: 15px
</style>
