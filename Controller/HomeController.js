const Seller = require('../Models/Seller')


module.exports.home= function(req,res){

return res.render("home")

}

module.exports.signup = function(req,res){
    return res.render("signup")
}

module.exports.signin=function(req,res){
    return res.render("signin")
}


  



  module.exports.allSelllers = async function(req,res){

    try{
        
       
         let allSellers= await Seller.find({});
             return res.render('allSellers', {
                allSellers: allSellers
             });
         }
    
        catch(err){
    console.log('error',err);
        }
    
 
  }
  