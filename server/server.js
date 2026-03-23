require("dotenv").config(); // Load biến môi trường từ file .env
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const { initOracle } = require("./src/config/oracle");
const Routes = require("./routes/Routes.js");

// Khởi tạo express app
const app = express();

// Middleware
app.use(cors()); // cho phép front-end truy cập api không bị lỗi cors
app.use(express.json()); // Đọc được data gửi lên dưới dạng JSON

// kết nối database
connectDB();
initOracle()
  .then(() => console.log("Oracle Connected"))
  .catch((err) => {
    console.error(`Oracle connect error: ${err.message}`);
    process.exit(1);
  });

// khởi tạo HTTP server từ Express app bắt buộc khi dùng socket.io
const httpserver = http.createServer(app);

// khởi tạo Socket.IO server
const io = new Server(httpserver, {
  cors: {
    origin: "*", // trong thực tế nên để đúng url của React app http://localhost:3000
    methods: ["GET", "POST"],
  },
});

// lắng nghe sự kiện khi có client kết nối đến socket.io
io.on("connection", (socket) => {
  console.log(`🟢 Một user vừa kết nối: ${socket.id}`);

  // khi user ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`🔴 User ngắt kết nối: ${socket.id}`);
  });
});

//route test cơ bản
app.use("/api/test", Routes);
app.use("/api",Routes);

// khởi động server
const PORT = process.env.PORT || 5000;
httpserver.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
