const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes.js');
// Route test cơ bản để xem server chạy chưa
router.get('/',(req,res)=>{
    res.send('Chat App Server is running');
});

router.use('/auth', authRoutes);

module.exports = router;