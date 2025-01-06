import Product from "../models/product.model.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Correct path calculation
const uploadDir = path.join(process.cwd(), 'uploads'); // Use process.cwd() for current working directory

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // 'recursive: true' ensures that all directories are created
}

// Configure multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save uploaded files to 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'), false);
  },
}).single('image'); // The field name in the form is 'image'

// Add new product
export const addProduct = async (req, res) => {
  // Handle image upload via multer
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const newProduct = new Product({
        ...req.body,
        image: imageUrl, // Save image URL to the product model
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        message: 'Product added successfully',
        data: savedProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to add product',
        error: error.message,
      });
    }
  });
};

// // Add a new product
// export const addProduct = async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const savedProduct = await newProduct.save();
//     res.status(201).json({
//       message: "Product added successfully",
//       data: savedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to add product",
//       error: error.message,
//     });
//   }
// };

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get a single product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// Update a product by id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await Product.findById(id);
    if (!prod) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    console.log(req.body);
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(updatedProduct, "updatedProduct");
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete a product by id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
