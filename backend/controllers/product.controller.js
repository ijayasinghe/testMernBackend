import mongoose from 'mongoose';
import Product from "../models/product.model.js"


export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({}); //find({}) - passing an empty object means find everything
        res.status(200).json({success:true,message:products});
    } catch (error) {
        console.log("error in fetching products: ",error.message);
        res.status(500).json({success:false,message:"Server error"})
    }
};

export const createProduct = async (req,res)=>{
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    //if request body has data
    const newProduct = new Product(product); //create a object of Product model

    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.error("Error in create product:",error.message);
        res.status(500).json({success:false,message:"Server error"})
    }  
};

export const updateProduct = async (req,res)=>{
    const {id} = req.params;

    const product = req.body; // the new data

    // find if the id exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true}); //new:true- returns the new updated product
        res.status(200).json({success:true,message:updatedProduct});
    } catch (error) {
        res.status(500).json({success:false,message:"server error"});
    }

};

export const deleteProduct = async (req,res)=>{
    const { id } = req.params;

    // find if the id exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message: "Product deleted"})
    } catch (error) {
        console.log("error in deleting products: ",error.message);
        res.status(500).json({success:false,message:"server error"})
    }

};
