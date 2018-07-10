export default class utils {
  static formatDate(time) {
    let resTime = new Date(time * 1000)
    let nowDate = resTime.toLocaleDateString()
    let nowTime = this.formatTime(resTime)
    let todayTime = new Date()
    let todayDate = todayTime.toLocaleDateString()
    let yesToday = todayTime.setDate(todayTime.getDate() - 1)
    let yesTodayDateTime = new Date(yesToday)
    let yesTodayDate = yesTodayDateTime.toLocaleDateString()
    nowDate = nowDate.replace(todayDate, '今天')
    nowDate = nowDate.replace(yesTodayDate, '昨天')
    nowTime = nowDate.replace(todayDate, '今天')
    nowTime = nowDate.replace(yesTodayDate, '昨天')
    return {
      date: nowDate,
      time: nowTime
    }
  }
  static formatTime (time) {
    let date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()

    const t1 = [year, month, day].map(this.formatNumber).join('/')
    const t2 = [hour, minute].map(this.formatNumber).join(':')
    return `${t1} ${t2}`
  }
  static formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
  }
}
