import request from '../common/js/request'

export default {
  /**
   * 客户兴趣占比图
   * @returns {*}
   */
  getPie(merchant_id = 0, employee_id = 0, customer_id = 0) {
    let url = 'api/merchant/boss-interest-rate-chart'
    let data = {
      customer_id,
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  },
  /**
   * 近7日客户活跃度图
   * @returns {*}
   */
  getActionLine(merchant_id = 0, employee_id = 0, customer_id = 0) {
    let url = 'api/merchant/boss-active-chart'
    let data = {
      customer_id,
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  },
  /**
   *  近7日新增客户数
   * @returns {*}
   */
  getAddLine(merchant_id = 0, employee_id = 0, customer_id = 0) {
    let url = 'api/merchant/boss-new-customer-sum-chart'
    let data = {
      customer_id,
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  },
  /**
   *  成交率漏斗图
   * @returns {*}
   */
  getSuccess(merchant_id = 0, employee_id = 0, is_boss = 0) {
    let url = 'api/merchant/boss-close-deal-rate-chart'
    let data = {
      is_boss,
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  },
  /**
   * 客户与我互动图
   * @returns {*}
   */
  getBar(merchant_id = 0, employee_id = 0, customer_id = 0) {
    let url = 'api/merchant/boss-interactive-chart'
    let data = {
      customer_id,
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  },
  /**
   * 员工能力模型图
   * @returns {*}
   */
  getEmployee(merchant_id = 0, employee_id = 0, customer_id = 0) {
    let url = 'api/merchant/boss-capacity-model-chart'
    let data = {
      customer_id,
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  },
  /**
   * 数据总览
   * @returns {*}
   */
  getAllData(time = 'all', merchant_id = 0, employee_id = 0) {
    let url = 'api/merchant/boss-data-overview'
    let data = {
      time,
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  },
  /**
   * 数据总览
   * @returns {*}
   */
  getEmployeeRank(merchant_id = 0, employee_id = 0) {
    let url = 'api/merchant/boss-all-type-rank'
    let data = {
      merchant_id,
      employee_id
    }
    return request.post(url, data)
  }
}
