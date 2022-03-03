const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const authenticate = require('../middleware/authenticate');

router.get('/', homeController.index);
router.get('/login', homeController.loginPage);
router.get('/logout', authenticate,homeController.logout);
router.get('/signup', homeController.signupPage);
router.post('/login', homeController.login);
router.post('/signup', homeController.signup);
// router.get('/edit/:id', homeController.edit);
// router.get('/delete/:id', homeController.remove);
// router.get('/view/:id/', homeController.view);
// router.post('/add', homeController.add);
// router.post('/update', homeController.update);


module.exports = router;