/**
 * @fileoverview 基于 wx.request 和 Promise 进行 fetch 工具封装
 * @author houquan | houquan@babytree-inc.com
 * @version 1.0 | 2018-04-11    // 初始版本
*/

const systemInfo = wx.getSystemInfoSync()

const { platform, windowWidth, windowHeight } = systemInfo || {}

const token = wx.getStorageSync('token') || ''

const commonHeader = {
  clientInfo: JSON.stringify({
    clientAppVersion: '1.9.8',    // 客户端版本 （独立版）
    clientYunyuVersion: '',       // 客户端版本 （孕育版）
    clientSystem: platform,       // 客户端系统类型(如IOS、安卓)
    clientVersion: '',            // 客户端系统版本(如9.0、10.0)
    deviceCode: '',               // 客户端标志
    latitude: '',                 // 经度
    longitude: '',                // 维度
    traderName: '',               // 手机型号(如iPhone 6s、iPhone7)
    partner: 'babytree',          // 渠道标志
    nettype: 'unknown',           // 网络类型标志(如WIFI、2G、3G、4G)
    clientip: '',                 // 客户端IP
    screenwidth: windowWidth,     // 设备分辨率宽度
    screenheight: windowHeight    // 设备分辨率高度
  }),
  platform: '1',
  birthday: '',                                   // 宝宝生日
  timestamp: Date.parse(new Date()),              // 时间戳(1970年以来的秒数)
  signature: '350F163035D51E8D400114BE70EDFBFA',  // 签名
  protocol: "https",                              // 本次请求的用户协议类型
  token                                           // 用户token
}

// 兼容老版接口（/mobile/ 开头的接口）
const deprecatedComField = {
  oem: platform,
  osversion: '9.0',
  screenwidth: windowWidth,
  screenheight: windowHeight,
  apptype: 1,
  appversion: '1.9.8',
  nettype: 'https',
  regcode: 250,
  provcode: 264,
  partner: 'babytree',
  token
}

const domainReg = /^(?:https?:)?\/\/.*?(?=\/)/i

/**
 * fetch 方法
 * @param url {String}  请求路径
 * @param data {Object}  请求要携带的数据
 * @param options {Object}  请求额外的配置信息 
 * @return Promise
*/
function fetch(url, data = {}, options = {}) {
  const path = url.replace(domainReg, '')
  const isOld = /^\/mobile\//.test(path)
  const { header, success, fail, complete, ...restOpts } = options

  const params = {
    url,
    data: {
      ...(isOld ? Object.assign({}, deprecatedComField, data) : data)
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      ...commonHeader,
      ...header
    },
    ...restOpts
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (data, status, header) => {
        success && success(data, status, header)
        resolve({ data, status, header })
      },
      fail: (error) => {
        fail && fail(error)
        reject(error)
      },
      complete: () => {
        complete && complete()
      }
    })
  }).catch(error => {
    !fail && wx.showToast({
      title: '网络错误',
      icon: 'warn',
      duration: 2000
    })
  })
}

export default fetch