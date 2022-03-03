const axios = require('axios');
const index = (req, res) => {
    res.render('userExplore');
}


const rides = (req, res) => {
    axios.get('http://localhost:5000/home/getRides', {headers: {'Authorization': 'Bearer ' + req.user.token}})
      .then( (response) => {
        
        if (response.data.status == true) {
            res.render('userRides', {upcoming: response.data.data.upcoming, current: response.data.data.current, finished: response.data.data.finished});
        } else {
            res.render('err', {error: response.data.message + " : " + response.data.errors.join(', ')});
        }
      })
      .catch( (error) => {
        console.log(error);
        res.render('err', {error: 'server error'});
      });
}

const profile = (req, res) => {
    axios.get('http://localhost:5000/home/getUser', {headers: {'Authorization': 'Bearer ' + req.user.token}})
      .then( (response) => {
        
        if (response.data.status == true) {
            res.render('userProfile', {user: response.data.data.user});
        } else {
            res.render('err', {error: response.data.message + " : " + response.data.errors.join(', ')});
        }
      })
      .catch( (error) => {
        console.log(error);
        res.render('err', {error: 'server error'});
      });
}

const getAvail = (req, res) => {
    const input = req.body.input;
    axios.get('http://localhost:5000/home/getCycleData/' + input.split(', ')[1].trim(), {headers: {'Authorization': 'Bearer ' + req.user.token}})
      .then( (response) => {
        
        if (response.data.status == true) {
          console.log(response.data);
            res.render('userCycleAvail', {available: response.data.data.available, cycles: response.data.data.cycles, stand: response.data.data.stand});
        } else {
            res.render('err', {error: response.data.message + " : " + response.data.errors.join(', ')});
        }
      })
      .catch( (error) => {
        console.log(error);
        res.render('err', {error: 'server error'});
      });
}

const prebook = (req, res) => {
    axios.post('http://localhost:5000/home/prebook', req.body, {headers: {'Authorization': 'Bearer ' + req.user.token}})
      .then( (response) => {
        
        if (response.data.status == true) {
            res.redirect('/user/rides')
        } else {
            res.render('err', {error: response.data.message + " : " + response.data.errors.join(', ')});
        }
      })
      .catch( (error) => {
        console.log(error);
        res.render('err', {error: 'server error'});
      });
}
module.exports = {
    // index, newPatient, edit, remove, add, update, view
    index, rides, profile, getAvail, prebook
}