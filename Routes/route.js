const express = require('express');
const router = express.Router();


const Home = require('../Controller/HomeController');
const Seller = require('../Controller/SellerController')
const Auth= require('../Database/Auth')
const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy;


router.get('/',Home.home);

router.get('/signup',Home.signup);

router.get('/signin',Home.signin);


router.get('/dashboard/seller/:email', Auth.ensureAuthenticated ,Seller.showAllProducts);

router.get('/sellerAllProducts/:id',Seller.allProducts )
  


router.post('/login', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true,
  successFlash: 'Logged in Successfully',
}), (req, res) => {
  req.flash('success', 'Logged in Successfully'); // Add this line
  res.redirect(`/dashboard/seller/${req.user.email}`);
});


 
  router.post('/sellerInfo/:email', Seller.saveSellerInfo);
  router.post('/productInfo/:email', Seller.saveProductInfo);

  router.get('/search/:id', Seller.searchProducts);

  router.get('/allSellers',Home.allSelllers)

router.post('/create',Seller.createSeller)


module.exports = router;
