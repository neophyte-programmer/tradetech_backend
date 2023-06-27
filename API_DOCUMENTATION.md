# TradeTech API Documentation

AUTH:

- POST /api/user/register: Create a new user.
- POST /api/user/login: User login.
- POST /api/user/admin-login: Admin login.
- POST /api/user/forgot-password-token: Generate a forgot password token.
- POST /api/user/cart/create: Create a user cart.
- POST /api/user/cart/apply-coupon: Apply a coupon to the cart.
- POST /api/user/orders/cash/create: Create a new order.

- GET /api/user/all: Get all users.
- GET /api/user/refresh: Handle refresh token.
- GET /api/user/logout: User logout.
- GET /api/user/wishlist: Get user's wishlist.
- GET /api/user/cart: Get user's cart.
- GET /api/user/orders: Get user's orders.
- GET /api/user/orders/all: Get all orders (admin only).
- GET /api/user/orders/:id: Get order by user ID (admin only).
- GET /api/user/:id: Get single user by ID (admin only).

- DELETE /api/user/cart/empty: Empty user's cart.
- DELETE /api/user/:id: Delete user by ID.

- PUT /api/user/password: Update user's password.
- PUT /api/user/save-address: Save user's address.
- PUT /api/user/edit: Update user details.
- PUT /api/user/orders/edit/:id: Update order status (admin only).
- PUT /api/user/block/:id: Block user (admin only).
- PUT /api/user/unblock/:id: Unblock user (admin only).
- PUT /api/user/reset-password/:token: Reset user's password.

BLOG:

- POST /api/blog/new: Create a new blog (admin only).

- GET /api/blog/all: Get all blogs.
- GET /api/blog/:id: Get single blog by ID.

- DELETE /api/blog/drop/:id: Delete blog by ID (admin only).

- PUT /api/blog/upload/:id: Upload images for a blog (admin only).
- PUT /api/blog/edit/:id: Update blog (admin only).
- PUT /api/blog/likes: Like a blog.
- PUT /api/blog/dislikes: Dislike a blog.

BRAND:

- POST /api/brand/new: Create a new brand (admin only).

- GET /api/brand/all: Get all brands.
- GET /api/brand/:id: Get single brand by ID.

- DELETE /api/brand/drop/:id: Delete brand by ID (admin only).

- PUT /api/brand/edit/:id: Update brand (admin only).

COLOUR FOR PRODUCTS:

- POST /api/color/new: Create a new color (admin only).

- GET /api/color/all: Get all colors.
- GET /api/color/:id: Get single color by ID.

- DELETE /api/color/drop/:id: Delete color by ID (admin only).

- PUT /api/color/edit/:id: Update color (admin only).

COUPON:

- POST /api/coupon/new: Create a new coupon (admin only).

- GET /api/coupon/all: Get all coupons.
- GET /api/coupon/:id: Get single coupon by ID.

- DELETE /api/coupon/drop/:id: Delete coupon by ID (admin only).

- PUT /api/coupon/edit/:id: Update coupon (admin only).

ENQUIRIES FOR CONTACT PAGE:

- POST /api/enquiry/new: Create a new enquiry.

- GET /api/enquiry/all: Get all enquiries.
- GET /api/enquiry/:id: Get single enquiry by ID
- - DELETE /api/enquiry/drop/:id: Delete enquiry by ID (admin only).

- PUT /api/enquiry/edit/:id: Update enquiry (admin only).

PRODUCT CATEGORIES:

- POST /api/productCategory/new: Create a new product category (admin only).

- GET /api/productCategory/all: Get all product categories.
- GET /api/productCategory/:id: Get single product category by ID.

- DELETE /api/productCategory/drop/:id: Delete product category by ID (admin only).

- PUT /api/productCategory/edit/:id: Update product category (admin only).

PRODUCTS:

- POST /api/product/new: Create a new product (admin only).

- GET /api/product/:id: Get single product by ID.
- GET /api/product: Get all products.

- DELETE /api/product/drop/:id: Delete product by ID (admin only).
- DELETE /api/product/delete-img/:id: Delete product images (admin only).

- PUT /api/product/upload/:id: Upload images for a product (admin only).
- PUT /api/product/wishlist: Add a product to the user's wishlist.
- PUT /api/product/rating: Give a rating to a product.
- PUT /api/product/edit/:id: Update product (admin only).

Please note that the functionality and access permissions mentioned in the comments (e.g., `authMiddleware`, `isAdmin`) should be implemented accordingly in the code to ensure proper authentication and authorization.