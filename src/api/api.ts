const api = {
    Login: '/user/login',
    UserInfo: '/user/userinfo',
    UserName: '/user/name',
    TPPInfo: '/api-customer/api/customerTpp/80801/v1/getCustonerTppInfo',
    FLInfo: '/api-order/api/rebate/66601/v1/findRebateInoutByCondition',
    GetUserInfo: '/api-sign/api/sign/4000/getUserInfo',
    RealName: '/api-sign/api/sign/1002/getUserVerifyPageUrl',
    GetCode: '/api-sign/api/sign/2000/sendCode',
    Signature: '/api-sign/api/sign/2001/doValidSignB2c',
    PersonSeal: '/api-sign/api/sign/5000/savePersonSeal',
    Contract: '/api-sign/api/sign/4001/getContract',
    AuthContract: 'api-sign/api/sign/4000/getUserSignAuthContract',
    getStoreTpp: 'api-sign/api/sign/7005/getStoreTppByPopup',
    storageTppNum: 'api-sign/api/sign/7004/storageTppNum',
    reSign: 'api-sign/api/sign/7006/reSign',
    reSignZ02: 'api-sign/api/sign/7007/reSignZ02',
    getZ01TppNum: 'api-sign/api/sign/7008/getZ01TppNum'
  }
  
  export default api
  