const express = require('express');
const router = express.Router();


const Home = require('../Controller/HomeController');
const Seller = require('../Controller/SellerController')
const Auth= require('../Database/Auth')
const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy;


router.get('https://sellerkart.onrender.com/',Home.home);

router.get('https://sellerkart.onrender.com/signup',Home.signup);

router.get('https://sellerkart.onrender.com/signin',Home.signin);


router.get('https://sellerkart.onrender.com/dashboard/seller/:email', Auth.ensureAuthenticated ,Seller.showAllProducts);

router.get('https://sellerkart.onrender.com/sellerAllProducts/:id',Seller.allProducts )
  


router.post('https://sellerkart.onrender.com/login', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true,
  successFlash: 'Logged in Successfully',
}), (req, res) => {
  req.flash('success', 'Logged in Successfully'); // Add this line
  res.redirect(`https://sellerkart.onrender.com/dashboard/seller/${req.user.email}`);
});


 
  router.post('https://sellerkart.onrender.com/sellerInfo/:email', Seller.saveSellerInfo);
  router.post('https://sellerkart.onrender.com/productInfo/:email', Seller.saveProductInfo);

  router.get('https://sellerkart.onrender.com/search/:id', Seller.searchProducts);

  router.get('https://sellerkart.onrender.com/allSellers',Home.allSelllers)

router.post('https://sellerkart.onrender.com/create',Seller.createSeller)


module.exports = router;
