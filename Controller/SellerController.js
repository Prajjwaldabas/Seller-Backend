const bcrypt = require('bcrypt');
const Seller = require('../Models/Seller');
const { allSelllers } = require('./HomeController');






const createSeller = async (req, res) => {
  try {
    const { email, businessName, password, confirmPassword } = req.body;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/signup');
    }

    // Check if the seller already exists in the database
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      req.flash('error', 'Seller already exists');
      return res.redirect('/signin');
    }

    // Generate a salt for password hashing
    const saltRounds = 10;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new seller instance with the encrypted password
    const seller = new Seller({
      email,
      businessName,
      password: hashedPassword
    });

    // Save the seller to the database
    await seller.save();

    req.flash('success', 'Account Created');
    return res.redirect('/signin');
  } catch (error) {
    console.error('Error creating seller:', error);
    req.flash('error', 'Error creating seller');
    return res.redirect('/signup');
  }
};


const saveSellerInfo = async (req, res) => {
  try {
    const { address, gst, timings } = req.body;
    const email = req.params.email;

    console.log(req.body)
    console.log(address)
    console.log(gst)
    // Find the seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    // Update the store info
    seller.storeInfo.address = address;
    seller.storeInfo.gst = gst;
    seller.storeInfo.storeTimings = timings;

    // Save the updated seller to the database
    await seller.save();

    return  res.redirect(`/dashboard/seller/${email}`)
  } catch (error) {
    console.error('Error saving store information:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const saveProductInfo = async (req, res) => {
  try {
    const { category, subCategory, productName, mrp, sp, quantity, imageURL } = req.body;
    const email = req.params.email;
console.log(imageURL,"image url is here")
    // Find the seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    // Create a new inventory item
    const inventoryItem = {
      category,
      subCategory,
      productName,
      mrp,
      sp,
      quantity,
      images: [imageURL], // Assuming a single image for now
    };

    // Add the inventory item to the seller's inventory
    seller.inventory.push(inventoryItem);

    // Save the updated seller to the database
    await seller.save();

    return res.redirect(`/dashboard/seller/${email}`)
  } catch (error) {
    console.error('Error saving product information:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const showAllProducts= async function(req,res){

  try{

    const email = req.params.email;
   
console.log(email)
const seller = await Seller.findOne({email})

if (!seller) {
  return res.status(404).json({ error: 'Seller not found' });
}



return res.render('dashboard', { seller:seller });
} catch (error) {
  console.error('Error retrieving seller and product data:', error);
  return res.status(500).json({ error: 'Internal server error' });
}


  }


  const allProducts = async function(req,res){
    try{

      const id = req.params.id;
     console.log(id)
  
  const seller = await Seller.findById(id)
  
  if (!seller) {
    return res.status(404).json({ error: 'Seller not found' });
  }
  
  const products = seller.inventory
  
  return res.render('userView', { seller:seller,products:products });
  } catch (error) {
    console.error('Error retrieving seller and product data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  }

  const searchProducts = async function(req, res) {
    try {
      const id = req.params.id;
      const query = req.query.query;
  
      console.log(query, "query");
      console.log(id)
  
      const seller = await Seller.findById(id);
      console.log(seller)
      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }
  
      // Filter the products based on the search query
      const filteredProducts = seller.inventory.filter((product) =>
        product.productName && product.productName.toLowerCase().includes(query.toLowerCase())
      );

      console.log(filteredProducts,"filterd product is here")
  
      return res.render('userView', { seller: seller, products: filteredProducts, query: query });
    } catch (error) {
      console.error('Error searching products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
 
  





module.exports = { createSeller, saveSellerInfo, saveProductInfo ,showAllProducts,allProducts,searchProducts,deleteProduct};
