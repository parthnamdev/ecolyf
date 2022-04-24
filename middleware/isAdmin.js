require('dotenv').config();
const bcrypt = require('bcryptjs');

const authenticate = (req, res, next) => {
    try {
       
        if(req.signedCookies.user != undefined) {
            if(req.signedCookies.user.name == process.env.ADMIN) {
                bcrypt.compare(process.env.ADMIN_PASS,req.signedCookies.user.password, function(err, result) {
                    if(result == true) {
                        next()
                    } else {
                        res.redirect('../');
                    }
                });
            } else {
                res.redirect('../');
            }
            
        } else {
            res.redirect('../');
        }

    } catch(err) {
        res.render('err', {error: "error authenticating user"});
        console.log(err);
    }
}

module.exports = authenticate;