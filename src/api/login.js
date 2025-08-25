import request from '@/utils/request'

// 获取图形验证码
export const getPicCode = () => { // 命名导出
  return request.get('/captcha/image')
}

// 获取短信验证码
export const getMessageCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录请求
export const loginFn = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
