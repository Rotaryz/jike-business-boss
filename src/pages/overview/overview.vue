<template>
  <article class="overview">
    <scroll>
      <div class="data-top">
        <div class="cliten-box">
          <div class="data-number-box">
            <img class="cliten-con-bg" src="./bg-customer_details@2x.png" alt="">
            <div class="data-tab">
              <div class="tab" v-for="(item, index) in tabList" v-bind:key="index"
                   :class="tabNumber === index ? 'active' : '' " @click="getAllTab(item, index)">{{item.text}}
              </div>
            </div>
            <div class="data-list">
              <div class="list-box">
                <div class="number">{{allDatas.customer_sum}}</div>
                <div class="text">客户总数</div>
              </div>
              <div class="list-box">
                <div class="number">{{allDatas.follow_up_sum}}</div>
                <div class="text">跟进总数</div>
              </div>
              <div class="list-box">
                <div class="number">{{allDatas.card_visits_sum}}</div>
                <div class="text">名片访问数</div>
              </div>
              <div class="list-box">
                <div class="number">{{allDatas.website_visits_sum}}</div>
                <div class="text">官网访问数</div>
              </div>
              <div class="list-box">
                <div class="number">{{allDatas.goods_visits_sum}}</div>
                <div class="text">产品访问数</div>
              </div>
              <div class="list-box">
                <div class="number">{{allDatas.live_logs_sum}}</div>
                <div class="text">动态访问数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ai-box">
        <div class="pie-box ">
          <div id="mySuccess"></div>
          <div class="title-box">
            <div class="title">成交率漏斗</div>
            <div class="sub-title">(每小时更新)</div>
          </div>
          <div class="bottom-des">
            <div class="tab">
              <div class="icon"></div>
              <div class="text">0-50%</div>
            </div>
            <div class="tab">
              <div class="icon two"></div>
              <div class="text">51-80%</div>
            </div>
            <div class="tab">
              <div class="icon thr"></div>
              <div class="text">81-99%</div>
            </div>
            <div class="tab">
              <div class="icon four"></div>
              <div class="text">100%</div>
            </div>
          </div>
        </div>
        <div class="pie-box line-box">
          <div id="myLine"></div>
          <div class="title-box">
            <div class="title">近7日客户活跃度</div>
            <div class="sub-title">(每小时更新)</div>
          </div>
        </div>
        <div class="pie-box">
          <div id="myPie"></div>
          <div class="title-box">
            <div class="title">客户兴趣占比</div>
            <div class="sub-title">(每小时更新)</div>
          </div>
          <div class="pie-list">
            <div class="list">
              <div class="icon one"></div>
              <div class="text">对我感兴趣</div>
            </div>
            <div class="list">
              <div class="icon two"></div>
              <div class="text">对产品感兴趣</div>
            </div>
            <div class="list">
              <div class="icon thr"></div>
              <div class="text">对公司感兴趣</div>
            </div>
          </div>
        </div>
        <div class="pie-box line-box">
          <div id="myAddLine"></div>
          <div class="title-box">
            <div class="title">近7日新增客户数</div>
            <div class="sub-title">(每小时更新)</div>
          </div>
        </div>
        <div class="pie-box bar-box">
          <div id="myBar"></div>
          <div class="title-box">
            <div class="title">客户与我的互动</div>
            <div class="sub-title">(每天0点更新)</div>
          </div>
        </div>
      </div>
    </scroll>
    <toast ref="toast"></toast>
    <router-view></router-view>
  </article>
</template>

<script type="text/ecmascript-6">
  import {Echart} from 'api'
  import {ERR_OK} from '../../common/js/config'
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import storage from 'storage-controller'

  export default {
    name: 'my-data',
    data() {
      return {
        pieData: [
          {value: 1, name: '对我感兴趣'},
          {value: 1, name: '对产品感兴趣'},
          {value: 1, name: '对公司感兴趣'}
        ],
        ationLine: {
          x: [],
          y: []
        },
        addationLine: {
          x: [],
          y: []
        },
        barData: {
          x: [],
          y: []
        },
        successData: [
          {value: 80, name: ' 3 ', text: '3'},
          {value: 60, name: '  2  ', text: '2'},
          {value: 40, name: '   2   ', text: '2'},
          {value: 20, name: '    0    ', text: '0'}
        ],
        allDatas: {},
        tabList: [
          {
            text: '全部',
            value: 'all'
          },
          {
            text: '昨天',
            value: 'yesterday'
          },
          {
            text: '7天',
            value: 'week'
          },
          {
            text: '30天',
            value: 'month'
          }
        ],
        tabNumber: 0
      }
    },
    created() {
      this.getActionLineData()
      this.getPieData()
      this.getBarData()
      this.getAddActionLineData()
      this.getSuccessData()
      this.getAllDataObj('all')
    },
    methods: {
      drawPie() {
        let myChart = this.$echarts.init(document.getElementById('myPie'))
        // 绘制图表
        myChart.setOption({
          // title: {
          //   text: '客户兴趣占比',
          //   subtext: '(每小时更新)',
          //   x: 'center'
          // },
          tooltip: {
            trigger: 'item',
            formatter: '{d}%'
          },
          color: ['#F9543C', '#23799D', '#8E3C68'],
          series: [
            {
              name: '访问222来源',
              type: 'pie',
              radius: '40%',
              center: ['50%', '55%'],
              data: this.pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myLine'))
        // 绘制图表
        myChart.setOption({
          // title: {
          //   text: '近30日客户活跃度',
          //   subtext: '(每小时更新)',
          //   x: 'center'
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.ationLine.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '活跃度：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          yAxis: {
            minInterval: 1,
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          series: [{
            data: this.ationLine.y,
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#F9543C',
                borderWidth: 2,
                lineStyle: {
                  color: '#F9543C',
                  width: 3
                }
              }
            }
          }]
        })
      },
      drawAddLine() {
        let myChart = this.$echarts.init(document.getElementById('myAddLine'))
        // 绘制图表
        myChart.setOption({
          // title: {
          //   text: '近30日客户活跃度',
          //   subtext: '(每小时更新)',
          //   x: 'center'
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.addationLine.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '新用户数：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          yAxis: {
            minInterval: 1,
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          series: [{
            data: this.addationLine.y,
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#F9543C',
                borderWidth: 2,
                lineStyle: {
                  color: '#F9543C',
                  width: 3
                }
              }
            }
          }]
        })
      },
      drawBar() {
        let myChart = this.$echarts.init(document.getElementById('myBar'))
        // 绘制图表
        myChart.setOption({
          // title: {
          //   text: '客户与我的互动',
          //   subtext: '(每小时更新)',
          //   x: 'center'
          // },
          tooltip: {
            trigger: 'axis',
            formatter: '{b}数：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            minInterval: 1,
            type: 'value',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: '#20202E',
              fontSize: 14,
              formatter: function (value) {
                return value
              },
              align: 'right'
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.barData.y,
            axisLabel: {
              interval: 0,
              color: '#20202E',
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#888'
              }
            }
          },
          series: [{
            data: this.barData.x,
            type: 'bar',
            showSymbol: false,
            barWidth: 15,
            itemStyle: {
              normal: {
                color: '#F9543C',
                borderWidth: 2,
                lineStyle: {
                  color: '#F9543C',
                  width: 3
                }
              }
            }
          }]
        })
      },
      drawSuccess() {
        let myChart = this.$echarts.init(document.getElementById('mySuccess'))
        // 绘制图表
        myChart.setOption({
          // title: {
          //   text: '成交漏斗图',
          //   subtext: '(每小时更新)',
          //   x: 'center'
          // },
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          series: [{
            name: '漏斗图',
            type: 'funnel',
            left: '15%',
            top: 45,
            bottom: 40,
            width: '70%',
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            color: ['#F9B43C', '#F9543C', '#8E3C68', '#23799D'],
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: this.successData
          }]
        })
        // myChart.on('click', this.eConsole)
      },
      getPieData() {
        Echart.getPie(this.userInfo.merchant_id).then(res => {
          if (res.error === ERR_OK) {
            this.pieData = res.data
            this.drawPie()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getActionLineData() {
        Echart.getActionLine(this.userInfo.merchant_id).then(res => {
          if (res.error === ERR_OK) {
            this.ationLine = res.data
            this.drawLine()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getAddActionLineData() {
        Echart.getAddLine(this.userInfo.merchant_id).then(res => {
          if (res.error === ERR_OK) {
            this.addationLine = res.data
            this.drawAddLine()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getBarData() {
        Echart.getBar(this.userInfo.merchant_id).then(res => {
          if (res.error === ERR_OK) {
            this.barData = res.data
            this.drawBar()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getSuccessData() {
        Echart.getSuccess(this.userInfo.merchant_id).then(res => {
          if (res.error === ERR_OK) {
            this.successData = res.data
            this.drawSuccess()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      eConsole(param) {
        console.log(param.data.text)
        if (param.data.text > 0) {
          const progress = param.value // id为80则分组0-50,60则分组51-80,40则分组81-99,20则分组100
          const useType = 'overview'
          const pageUrl = `/overview/customer-list`
          this.$router.push({path: pageUrl, query: {pageUrl, useType, progress}})
        }
      },
      getAllDataObj(time) {
        Echart.getAllData(time, this.userInfo.merchant_id).then(res => {
          if (res.error === ERR_OK) {
            this.allDatas = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getAllTab(item, index) {
        this.getAllDataObj(item.value)
        this.tabNumber = index
      }
    },
    components: {
      Toast,
      Scroll
    },
    computed: {
      userInfo() {
        return storage.get('info')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .overview
    position: absolute
    top: 62px
    bottom: 0
    left: 0
    right: 0
    background-color: greenyellow

  .data-all
    fill-box()
    z-index: 11

  .data-top
    position: relative
    .cliten-bg
      position: absolute
      z-index: 1
      height: 73px
      background: #20202E
      width: 100%
      top: 0
      left: 0
    .cliten-box
      position: relative
      padding: 20px 15px 0
      width: 100%
      z-index: 2
      .cliten-con-bg
        position: absolute
        display: block
        width: 100%
        height: 100%
        left: 0px
        top: 0px
        z-index: 0

      .data-number-box
        padding-top: 20px
        position: relative
        background: #fff
        z-index: 11
        .data-tab
          position: relative
          z-index: 11
          layout(row)
          margin: 0 auto
          width: 240px
          border: 0.5px solid rgba(32, 32, 46, 0.1)
          .tab
            border-right: 0.5px solid rgba(32, 32, 46, 0.1)
            height: 30px
            font-size: $font-size-14
            color: #20202E
            font-family: $font-family-meddle
            line-height: 30px
            width: 25%
            text-align: center
          .tab:last-child
            border-right: 0
          .active
            background: #20202e
            color: #fff
        .data-list
          position: relative
          z-index: 11
          layout(row)
          padding: 0 0 24px
          .list-box
            width: 33.33%
            text-align: center
            padding: 18px 0 0
            .number
              font-size: 32px
              color: #20202e
              font-family: 'DINCondensed-Bold'
            .text
              font-size: $font-size-12
              color: #20202e
              font-family: $font-family-meddle
              margin-top: 5px

  .ai-box
    padding: 15px
    .pie-box
      position: relative
      background: linear-gradient(rgba(255, 255, 255, .1) 0%, #fff 100%)
      height: 305px
      margin-bottom: 10px
      #myPie
        width: 100%
        height: 305px
        margin: 20px auto
        padding: 20px
      #myLine
        width: 100%
        height: 300px
        margin: 20px auto
        padding: 35px 0px 0
      #myAddLine
        width: 100%
        height: 300px
        margin: 20px auto
        padding: 35px 0px 0
      #myBar
        width: 100%
        height: 300px
        margin: 20px auto
        padding: 35px 20px 0
      #mySuccess
        width: 100%
        height: 300px
        margin: 20px auto
        padding: 35px 20px 0
      .title-box
        position: absolute
        width: 100%
        text-align: center
        top: 30px
        left: 0
        .title
          font-size: $font-size-medium-x
          color: #202020
          font-family: $font-family-meddle
        .sub-title
          margin-top: 5px
          font-size: $font-size-small
          color: $color-text-88
          font-family: $font-family-meddle
      .bottom-des
        position: absolute
        bottom: 10px
        layout(row)
        width: 100%
        .tab
          layout(row)
          justify-content: center
          align-items: center
          width: 25%
          .icon
            background: #F9B43C
            width: 6px
            height: 6px
            border-radius: 50%
            margin-right: 3px
          .two
            background: #F9543C
          .thr
            background: #8E3C68
          .four
            background: #23799D
          .text
            font-size: $font-size-12
            font-family: $font-family-regular
            color: $color-text
      .pie-list
        layout(row)
        position: absolute
        width: 100%
        bottom: 25px
        left: 0
        .list
          flex: 1
          layout(row)
          align-items: center
          justify-content: center
          .icon
            background: #F9543C
            width: 7px
            height: 7px
            margin-right: 4px
            border-radius: 50%
          .two
            background: #23799D
          .thr
            background: #8E3C68
          .text
            line-height: 1
            font-size: $font-size-small
            color: #202020
            font-family: $font-family-regular

    .line-box
      height: 270px
      #myLine
        height: 270px

  .z
    width: 1px
</style>
