const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require("../repositories/userRepoOracle");

//Đăng ký
exports.register = async (req,res) =>
{
    try {
    const { email,login_name,password_hash,display_name,avatar_url,is_active} = req.body;
    // 1. Kiểm tra email đã tồn tại chưa
    const exitstringUserEmail = await userRepo.findByEmail(email);
    const exitstringUserLoginName = await userRepo.findByLoginName(login_name);

    if(exitstringUserEmail){
        return res.status(400).json({message:'Email đã tồn tại'});
    }
    if (exitstringUserLoginName){
        return res.status(400).json({message:'Tên đăng nhập đã tồn tại'});
    }
    //2. Mã hóa mật khẩu
    const bcryptSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password_hash, bcryptSalt);

    // 3 . Tạo user mới
    const newUser = await userRepo.createUser({
      email,
      login_name,
      password_hash: hashedPassword,
      display_name,
      avatar_url,
      is_active,
    });

    res.status(201).json({ message: 'Đăng ký tài khoản thành công!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

