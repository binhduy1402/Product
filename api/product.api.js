const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Đảm bảo thư mục uploads tồn tại
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log('Created uploads directory:', uploadPath);
}

// Cấu hình Multer
const FileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
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
