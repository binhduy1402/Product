const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const multer = require('multer');
const path = require('path');

// Cấu hình Multer
const FileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path.join(__dirname, '../uploads');
        callback(null, uploadPath); // Lưu file vào thư mục uploads
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); // Đặt tên file duy nhất
    }
});

const upload = multer({ storage: FileStorage });

// Routes
router.post('/add', upload.single('file'), controller.addProduct);
router.get('/', controller.getProducts);
router.patch('/edit/:id', upload.single('file'), controller.updateProductsDetails);
router.delete('/remove/:id', controller.removeProduct);
router.get('/filter/:status', controller.FilterByCategory);

module.exports = router;
