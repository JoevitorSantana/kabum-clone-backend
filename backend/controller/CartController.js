const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CartModel = require("../models/CartModel");
const WishList = require("../models/WishList");
const ErrorHandler = require("../utils/ErrorHandler");

exports.addToWishList = catchAsyncErrors(async(req, res, next) => {
    const {
        productName,
        quantity,
        productImage,
        productPrice,
        userId,
        productId,
        Stock
    } = req.body;

    const wishList = await WishList.create({
        productName,
        quantity,
        productImage,
        productPrice,
        userId,
        productId,
        Stock
    });

    res.status(200).json({
        success: true,
        wishList
    })


})

exports.getWishlistData = catchAsyncErrors(async(req, res, next) => {
    const wishListData = await WishList.findById(req.params.id);

    if(!wishListData){
        return next(new ErrorHandler("No wish list found with this id", 404))
    }

    await wishListData.remove();

    res.status(200).json({
        success: true,
        message: "Item removed from wishlist",
    });
});

exports.removeWishlistData = catchAsyncErrors(async(req, res, next) => {
    const wishListData = await WishList.findById(req.params.id);

    if(!wishListData){
        return next(new ErrorHandler("No wishlist found with this id", 404));
    }

    await wishListData.remove();

    res.status(200).json({
        success: true,
        message: "Item removed from wishlist"
    })
})

exports.addToCart = catchAsyncErrors(async(req, res, next) => {
    const {
        productName,
        quantity,
        productImage,
        productPrice,
        userId,
        productId,
        Stock,
        nVlPeso
    } = req.body;

    const cart = await CartModel.create({
        productName,
        quantity,
        productImage,
        productPrice,
        userId,
        productId,
        Stock,
        nVlPeso
    })

    res.status(200).json({
        success: true,
        cart,
    });
});

exports.updateCart = catchAsyncErrors(async(req, res, next) => {
    const {quantity} = req.body;
    const cart = await CartModel.findByIdAndUpdate(req.params.id);

    if(!cart){
        return next(new ErrorHandler("No cart found with this id", 404))
    }

    await cart.update({
        quantity
    });
});

exports.getCartData = catchAsyncErrors(async(req, res, next) => {
    const cartData = await CartModel.find({userId: req.user.id});
    res.status(200).json({
        cartData,
    });
});


exports.removeCartData = catchAsyncErrors(async(req, res, next) => {
    const cartData = await CartModel.findById(req.params.id)

    if(!cartData){
        return next(new ErrorHandler("Items is not found with this id", 404));
    }

    await cartData.remove();

    res.status(200).json({
        success: true,
        message: "Item removed from cart"
    })
})