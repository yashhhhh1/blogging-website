const {ValidateToken} =  require('../services/authentication')
function checkForAuthenticationCookie(cookieName){
    return (req,res,next) =>{
        const tokenCookiesValue = req.cookies[cookieName]
        if(!tokenCookiesValue)
        {
           return next();
        }
        try {
            const userPayload = ValidateToken(tokenCookiesValue);
            req.user =userPayload;
            
        } catch (error) {}
        next();
    }
}

module.exports={
    checkForAuthenticationCookie,
}