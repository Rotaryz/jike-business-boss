export default class Oauth {
  constructor() {
    const uri = 'http://callbacktest.jkweixin.com:8080'
    const redirectUri = encodeURIComponent(uri)
    this.oauthUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww8254a365bf92e5aa&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  }
}
