import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getProductsByBrand
} from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const Productrouter = express.Router();

Productrouter.post("/create", verifyToken, isAdmin, upload.single("image"), createProduct);
Productrouter.put("/update/:id", verifyToken, isAdmin, upload.single("image"), updateProduct);
Productrouter.get("/all", getAllProducts);

Productrouter.delete("/delete/:id", verifyToken, isAdmin, deleteProduct);

//   search route
Productrouter.get("/search", verifyToken, searchProducts);
Productrouter.get("/:id", verifyToken, getProductById);
Productrouter.get("/category/:category",verifyToken, getProductsByCategory);
Productrouter.get("/brand/:brand", verifyToken, getProductsByBrand);

export default Productrouter;
