const express = require('express');
const router =  express.Router();

const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');


// router.get('/location', authenticate, userController.location);
router.get('/rides', authenticate, userController.rides);
router.get('/profile', authenticate, userController.profile);
router.post('/getAvail', authenticate, userController.getAvail);
router.post('/prebook', authenticate, userController.prebook);
router.get('/', authenticate, userController.index);

// router.post('/deleteAddress', authenticate, userController.deleteAddress);
// router.post('/addAddress', authenticate, userController.addAddress);
// router.post('/addToCart', authenticate, userController.addToCart);
// router.post('/cartQuantity', authenticate, userController.cartQuantity);
// router.post('/checkOut', authenticate, userController.checkOut);
// router.post('/', authenticate, userController.searchProducts);
// router.post('/delete', authenticate, userController.deleteUser);
// router.get('/successTransaction', authenticate, userController.successTransaction);
// router.get('/:id', authenticate, userController.findProductById);

module.exports = router;