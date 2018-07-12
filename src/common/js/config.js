const env = process.env

const DEV_URL = {
  api: 'http://business-api.jerryf.cn'
}

const TEST_URL = {
  api: 'http://admin-api.jkweixin.net'
}

const PROD_URL = {
  api: 'http://admin-api.jkweixin.com'
}

export const BASE_URL = env.NODE_ENV === 'production' ? PROD_URL : env.NODE_ENV === 'test' ? TEST_URL : DEV_URL

export const ERR_OK = 0
