import asyncHandler from 'express-async-handler';
import WishList from '../models/wishlistModel.js';
import Product from '../models/productModel.js'
import User from '../models/userModel.js';

// Create Category
// @desc Create a product
// @route POST /api/products/
// @access PRIVATE/ADMIN
const createWishlist = asyncHandler(async (req, res) => {
    let checker = await WishList.find({user:req.body.userId, status:true,productId: req.body.productId})
    if(checker.length == 0){
        console.log(checker)
        const wishlist = new WishList({
            user: req.body.userId,
            productId: req.body.productId
        });
        const response = await wishlist.save();
        res.status(201).json(response);
    }
});

const getWishlistForUser = async (req,res,next) =>{
    let userId = req.body.userId;
    let response = await WishList.find({user:userId, status:true})
    .populate("productId")
        .then((data) =>{
            return res.status(200).send({
                message: data
            });
        })
        .catch((error)=>{
            return res.status(500).send({
                message:error.message
            })
        })
}

const removeProductForUser = async (req,res,next) =>{
    let wishlistId = req.body.wishlistId;
    let response = await WishList.findByIdAndUpdate(wishlistId, {$set: {status:false}},{
        useFindAndModify:false
    })
        .then((data) =>{
            return res.status(200).send({
                message: data
            });
        })
        .catch((error)=>{
            return res.status(500).send({
                message:error.message
            })
        })
}


//needs editing
const addProductBackForUser = async (req,res,next) =>{
    let wishlistId = req.body.wishlistId;
    let productId = req.body.productId
    let response = await WishList.find()
        .then((data) =>{
            return res.status(200).send({
                message: data
            });
        })
        .catch((error)=>{
            return res.status(500).send({
                message:error.message
            })
        })
}

export {
	createWishlist,
    getWishlistForUser,
    removeProductForUser
};
