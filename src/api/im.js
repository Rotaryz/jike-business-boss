import request from 'common/js/request'

export default {
  // im获取签名，应用信息
  getImInfo(imAccount, loading = true) {
    const url = `/api/employee/employee-im-signature`
    const data = {
      im_account: imAccount
    }
    return request.post(url, data, loading)
  },

  // 雷达消息（所有人）
  getRadarList(page = 1, limit = 30, loading = true) {
    const url = `/api/employee/action-logs`
    const data = {
      page,
      limit
    }
    return request.post(url, data, loading)
  },

  // 聊天记录
  getMsgList(data, loading = true) {
    const url = `/api/employee/message-logs`
    return request.post(url, data, loading)
  },

  // 最近联系人最后一条聊天记录
  getLastMsgObj(data, loading = true) {
    const url = `/api/employee/customers-newest-message`
    return request.post(url, data, loading)
  }
}
