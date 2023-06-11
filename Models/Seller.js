const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for sellers
const sellerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  storeInfo: {
    address: {
      type: String,
      required: false,
    },
    gst: {
      type: String,
      required: false,
    },
    logo: String,
    storeTimings: String,
  },
  categories: [{
    category: String,
    subCategories: [String],
  }],
  inventory: [{
    category: String,
    subCategory: String,
    productName: String,
    mrp: Number,
    sp: Number,
    quantity: Number,
    images: [String],
  }],
});

// Method to compare and verify the password
sellerSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create and export the Sellers model based on the schema
module.exports = mongoose.model('Seller', sellerSchema);
