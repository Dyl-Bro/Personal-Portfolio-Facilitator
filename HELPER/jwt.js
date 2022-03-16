const expressJwt = require('express-jwt');
const secret = process.env.SECRET;


function tokenAuthentication(){
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: /\/UPLOAD-FILES(.*)/, methods:['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/projectRoute(.*)/, methods:['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/contactRoute(.*)/, methods:['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/aboutRoute(.*)/, methods:['GET', 'OPTIONS'] },
            '/api/v1/adminRoute/login'
        ]
    })
}


module.exports = tokenAuthentication;