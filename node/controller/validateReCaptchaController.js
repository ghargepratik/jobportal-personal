const axios = require('axios')
exports.validateReCaptcha = async (req, res, next) => {
    try {
        console.log(req.body.token)

        if (!req.body.token) {
            return res.status(400).json({ errors: 'token not found' })
        }
        let token = req.body.token
        const secretKey = process.env.RECAPTCHA_SECRETKEY
        var config = {
            method: 'get',
            url: `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
            headers: {},
        }
        console.log(
            '🚀 ~ file: validateReCaptchaController.js:12 ~ exports.validateReCaptcha= ~ config',
            config
        )

        axios(config)
            .then(function (response) {
                const re_res = response.data
                console.log(re_res)
                return res.status(200).json({
                    data: re_res,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    } catch (error) {
        console.log(
            '🚀 ~ file: validateReCaptchaController.js:23 ~ exports.validateReCaptcha= ~ error',
            error
        )
        return res
            .status(500)
            .json({ error: "Server error ,'Something went wrong'" })
    }
}
