//send OTP verification Email Address
const sendVerificationEmail = async (req, res, next) => {
    try {
        const opt = `${Math.floor(1000 + Math.random() * 9000)}`
        console.log(opt)
        let email = req.body.email
    } catch (error) {
        
    }
}

module.exports = {
    sendVerificationEmail
}