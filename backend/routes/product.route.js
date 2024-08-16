import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

//GET ALL PRODUCTS ROUTE
router.get("/",getProducts);

//ADD A PRODUCT ROUTE
router.post("/",createProduct);

//DELETE A PRODUCT ROUTE
router.delete("/:id", deleteProduct);

//UPDATE A PRODUCT ROUTE
//if you want to update some fields- use app.patch, for all the fields - app.put
router.put("/:id",updateProduct);


export default router;