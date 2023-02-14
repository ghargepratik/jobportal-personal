import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
const ReCaptchaComponent = (props) => {
  let onChange = (value) => {
    console.log('Captcha value:', value)
    props.getOnChangeReCaptchaTokenandVerify(value)
  }
  return (
    <div>
      <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={onChange} />
    </div>
  )
}

export default ReCaptchaComponent
