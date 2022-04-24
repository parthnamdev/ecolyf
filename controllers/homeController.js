const axios = require('axios');
// const AES = require("crypto-js/aes");
// const enc = require("crypto-js/enc-utf8");

// const Patient = require('../models/patientModel');

// const encrypt = (data) => {
//     return AES.encrypt(data, process.env.CRYPTO_SECRET).toString();
// }

// const decrypt = (cipher) => {
//     let bytes  = AES.decrypt(cipher, process.env.CRYPTO_SECRET);
//     return bytes.toString(enc);
// }

// const encrypt_object = (patient, time, appno) => {
//     let symptoms = patient.symptoms.split(",");
//     let sym_array = []
//     symptoms.forEach(element => {
//         sym_array.push(encrypt(element));
//     });
//     let updated = {
//         name: encrypt(patient.name),
//         number: encrypt(patient.number),
//         city: encrypt(patient.city),
//         country: encrypt(patient.country),
//         dob: encrypt(patient.dob),
//         symptoms: sym_array,
//         gender: encrypt(patient.gender),
//     }

//     if(time) {
//         current = new Date();
//         updated.time = encrypt(current.toLocaleString());
//     }
//     if(appno) {
//         current = new Date();
//         updated.applicationNumber = encrypt(uuidv4());
//     }

//     return updated
// }

// const decrypt_object = (patient) => {
//     let sym_array = []
//     patient.symptoms.forEach(element => {
//         sym_array.push(decrypt(element));
//     });
//     let decrypted = {
//         _id: patient._id,
//         name: decrypt(patient.name),
//         number: decrypt(patient.number),
//         city: decrypt(patient.city),
//         country: decrypt(patient.country),
//         dob: decrypt(patient.dob),
//         symptoms: sym_array,
//         time: decrypt(patient.time),
//         applicationNumber: decrypt(patient.applicationNumber),
//         gender: decrypt(patient.gender)
//     }

//     return decrypted
// }

const index = (req, res) => {
    res.render('index');
}

const loginPage = (req, res) => {
    res.render('login');
}

const signupPage = (req, res) => {
    res.render('signup');
}

const signup = (req, res) => {
    axios.post('http://localhost:5000/user/register', {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        number: req.body.number
      })
      .then( (response) => {
        
        if (response.data.status == true) {
            res.cookie('user', response.data.data, {signed: true});
            res.redirect('/user');
        } else {
            res.render('err', {error: response.data.message + " : " + response.data.errors.join(', ')});
        }
      })
      .catch( (error) => {
        console.log(error);
        res.render('err', {error: 'server error'});
      });
}

const login = (req, res) => {
    axios.post('http://localhost:5000/user/login', {
        email: req.body.email,
        password: req.body.password,
      })
      .then( (response) => {
        
        if (response.data.status == true) {
            res.cookie('user', response.data.data, {signed: true});
            res.redirect('/user');
        } else {
            res.render('err', {error: response.data.message + " : " + response.data.errors.join(', ')});
        }
      })
      .catch( (error) => {
        console.log(error);
        res.render('err', {error: 'server error'});
      });
}

const logout = (req, res) => {
    axios.post('http://localhost:5000/user/logout', {}, {headers: {'Authorization': 'Bearer ' + req.user.token}})
      .then( (response) => {
        
        if (response.data.status == true) {
            res.clearCookie("user", {signed: true});
            res.redirect('/');
        } else {
            res.render('err', {error: response.data.message + " : " + response.data.errors.join(', ')});
        }
      })
      .catch( (error) => {
        console.log(error);
        res.render('err', {error: 'server error'});
      });
    
}
// const login = (req, res) => {
//     res.render('userExplore');
// }
// const newPatient = (req, res) => {
//     res.render('addPatient');
// }

// const edit = (req, res) => {
//     Patient.findById(req.params.id, (err, found) => {
//         if(!err && found) {
//             res.render('editPatient', {patient: decrypt_object(found)});
//         } else {
//             res.render('err', {error: err});
//         }
//     })
// }

// const remove = (req, res) => {
//     Patient.findByIdAndDelete(req.params.id,(err, docs) => {
//         if(!err) {
//             res.redirect('/');
//         } else {
//             res.render('err', {error: err});
//         }
//     })
// }
// const view = (req, res) => {
    
//     Patient.findById(req.params.id,(err, found) => {
        
//         if(!err && found) {
//             res.render('viewPatient', {patient: decrypt_object(found)});
//         } else {
//             res.render('err', {error: err});
//         }
//     })
// }
// const add = (req, res) => {

//     const newPatient = encrypt_object(req.body, true, true);

//     Patient.create(newPatient, (err, patient) => {
//         if(!err) {
//             res.redirect('/');
//         } else {
//             res.render('err', {error: err});
//         }
//     });
// }
// const update = (req, res) => {

//     const updated = encrypt_object(req.body, false, false)
    
//     Patient.findByIdAndUpdate(req.body.id,updated,(err, docs) => {
//         if(!err) {
//             res.redirect('/');
//         } else {
//             res.render('err', {error: err});
//         }
//     })
// }

module.exports = {
    // index, newPatient, edit, remove, add, update, view
    index, loginPage, signupPage, signup, login, logout
}