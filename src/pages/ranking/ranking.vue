<template>
  <article class="ranking">
    <!--<router-link to="/ranking/customer-list">客户列表</router-link>-->
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
                v-for="(item,index) in tabCustomer"
                :key="index"
                @click="changeTabTwo(index)"
            >
              <div>{{item}}</div>
              <img v-if="index===1" class="icon-down" src="./icon-down@3x.png" alt="">
            </li>
          </ul>
          <!--互动-->
          <ul class="tab-two" v-if="tabOneIndex===1">
            <li class="tab-two-item"
                v-for="(item,index) in tabActive"
                :key="index"
            >
              <div>{{item}}</div>
            </li>
          </ul>
          <!--成交率-->
          <ul class="tab-two" v-if="tabOneIndex===2">
            <li class="tab-two-item"
                v-for="(item,index) in tabTurnover"
                :key="index"
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
  const tabOne = ['按客户数', '按互动数', '按成交率']
  const tabCustomer = ['客户总数', '昨天新增客户']
  const tabActive = ['跟进客户数', '咨询客户数']
  const tabTurnover = ['0-50%', '51-80%', '81-99%', '100%']
  const tabTwo = [tabCustomer, tabActive, tabTurnover]
  export default {
    name: 'Ranking',
    data() {
      return {
        dataArray: [],
        page: 1,
        limit: LIMIT,
        tabOne,
        tabOneIndex: 0,
        tabCustomer,
        tabActive,
        tabTurnover,
        tabTranslateX: 0,
        tabCustomerIndex: 0,
        tabActiveIndex: 0,
        tabTurnoverIndex: 0
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
      },
      changeTabOne(index) {
        this.tabOneIndex = index
      },
      changeTabTwo(index) {
      }
    },
    computed: {
      tabTwoStyle() {
        return `width:${100 / tabTwo[this.tabOneIndex].length}%;transform:translate3d(${this.tabTranslateX}%, 0, 0)`
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
            .tab-line
              height: 3px
              width: 30px
              background-color: $color-20202E
</style>
