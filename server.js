const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./connection');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 8071;

// Kết nối Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Cấu hình CORS
const allowedOrigins = [
    "http://localhost:3000",  // Local development URL
    "https://fe-eplh.onrender.com",  // Allow the frontend from Render
    "https://binhduy1402.id.vn"  // Production URL
];

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các phương thức HTTP được phép
    allowedHeaders: ["Content-Type", "Authorization"], // Các tiêu đề được phép
}));

// Định tuyến API sản phẩm
const productAPI = require('./api/product.api');
app.use('/products', productAPI);

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Product Management Service is running on port ${PORT}`);
});
