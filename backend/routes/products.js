import express from 'express';
import {
  createProductReview,
  deleteProduct,
  deleteReview,
  getProductDetails,
  getProductReview,
  getProducts,
  newProduct,
  updateProduct,
  canUserReview,
  getAdminProducts,
  uploadProductImges,
  deleteProductImage,
} from '../controllers/productControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductDetails);

router
  .route('/admin/products')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router
  .route('/admin/products/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router
  .route('/reviews')
  .get(isAuthenticatedUser, getProductReview)
  .put(isAuthenticatedUser, createProductReview);

router
  .route('/admin/reviews')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview);

router.route('/can_review').get(isAuthenticatedUser, canUserReview);

router
  .route('/admin/products/:id/upload_images')
  .put(isAuthenticatedUser, authorizeRoles('admin'), uploadProductImges);

router
  .route('/admin/products/:id/delete_image')
  .put(isAuthenticatedUser, authorizeRoles('admin'), deleteProductImage);

export default router;
