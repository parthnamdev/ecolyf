const axios = require('axios');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    res.render('adminLogin');
}

const adminlogin = (req, res) => {
    if(req.body.name === 'admin' && req.body.password == process.env.ADMIN_PASS) {
        bcrypt.hash(process.env.ADMIN_PASS, 10, function(err, hash) {
            if(err) {
                res.redirect('/');
            } else {
                res.cookie('user', {name: 'admin', password: hash}, {signed: true});
                res.render('admin', {msg: ''});
            }
        });
    } else {
        res.redirect('/admin/login');
    }
}

const index = (req, res) => {
    res.render('admin', {msg: ''});
}
const stand = (req, res) => {
    res.render('adminStand', {msg: ''});
}
const logout = (req, res) => {
    res.clearCookie('user', {signed: true});
    res.redirect('/');
}

const addCycle = (req, res) => {
    bcrypt.hash(process.env.ADMIN_PASS, 10, function(err, hash) {
        if(err) {
            res.redirect('/admin');
        } else {
            axios.post('http://localhost:5000/home/addCycle',req.body, {headers: {'Authorization': 'Bearer ' + hash}})
            .then( (response) => {
                
                if (response.data.status == true) {
                    res.render('admin', {msg: 'Added successfully'});
                } else {
                    res.render('adminerr', {error: response.data.message + " : " + response.data.errors.join(', ')});
                }
            })
            .catch( (error) => {
                console.log(error);
                res.render('adminerr', {error: 'server error'});
            });
        }
    });
    
    
}

const addStand = (req, res) => {
    bcrypt.hash(process.env.ADMIN_PASS, 10, function(err, hash) {
        if(err) {
            res.redirect('/admin');
        } else {
            axios.post('http://localhost:5000/home/addStand',req.body, {headers: {'Authorization': 'Bearer ' + hash}})
            .then( (response) => {
                
                if (response.data.status == true) {
                    res.render('adminStand', {msg: 'Added successfully'});
                } else {
                    res.render('adminerr', {error: response.data.message + " : " + response.data.errors.join(', ')});
                }
            })
            .catch( (error) => {
                console.log(error);
                res.render('adminerr', {error: 'server error'});
            });
        }
    });
}

module.exports = {
    login, index, stand, logout, adminlogin, addStand, addCycle
}