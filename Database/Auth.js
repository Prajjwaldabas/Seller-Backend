module.exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("req is authenticated")
      return next();
   
    }

    res.redirect('https://sellerkart.onrender.com/login');
  }

  