// pages/index/home.js
import fetch from '../../utils/fetch.js'
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime-module.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'hello world!',
    items: [0, 1, 2, 3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async (options) => {
    console.log('Pandolajs 首页加载完毕~~')
    const result = fetch('')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})