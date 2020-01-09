const state: any = {
    // 测试代码
  tests:'',
  other:'state其他123',
  acts:'',

  baseUrl: process.env.NODE_ENV === 'production' ? '/vue-ts/' : '/',
  pageLoad:'',
  searchKeywords:'',
  userInfo: {
      name: '',
      id: 0,
      avatar: '',
      integral: 0,
      level: 0,
  },
  homeList: [],
  homeBanner: [],
  homeCate: [],
  goodsDetail: {
      id: '',
      img: '',
      banner: [],
      info: {
          price: '',
          title: '',
          detail: '',
          sale: '',
      },
      params: [],
      comments: [],
      imgs: [],
  },
  cart: {
      manageState: !1,
      amount: 0,
      list: [],
  },
  center: {
      order: {
          s0: 0,
          s1: 0,
          s2: 0,
          s3: 0,
      },
  }
}
export default state;
