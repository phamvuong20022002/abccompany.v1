function VerifyKey(req, res, next){
    try {
        let text_connect = req.header('key');
        let text_1 = text_connect.slice(-5)
        let text_2 = text_connect.substring(0, text_connect.length - text_1.length)
        let text_connect_check = req.header('auth-token').substring(text_2.length, text_2.length + 5)
        if(text_1 !== text_connect_check){
            throw res.status(400).send('Can not authenticate');
        }
        else {
            next()
        }
    } catch (error) {
        
    }
    
}

module.exports = {
    VerifyKey
}