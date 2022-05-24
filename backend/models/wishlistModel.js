import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema(
	{
		// add a reference to the corresponding user
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Product',
		},
        status: {
            type: Boolean,
            default: true,
            required: true
        }
	}
);

const WishList = mongoose.model('Wishlist', wishlistSchema);

export default WishList;
