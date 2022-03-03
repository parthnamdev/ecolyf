
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/isAdmin');

router.get('/login', adminController.login);
router.post('/login', adminController.adminlogin);
router.get('/stand', authenticate, adminController.stand);
router.get('/logout', authenticate, adminController.logout);
router.post('/addstand', authenticate, adminController.addStand);
router.post('/addcycle', authenticate, adminController.addCycle);
router.get('/', authenticate, adminController.index);
// router.get('/edit/:id', homeController.edit);
// router.get('/delete/:id', homeController.remove);
// router.get('/view/:id/', homeController.view);
// router.post('/add', homeController.add);
// router.post('/update', homeController.update);


module.exports = router;