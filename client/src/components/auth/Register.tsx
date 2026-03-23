import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layout/authLayout.tsx';
import { formStyles } from '../ts/authStyles.ts'; 

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  //1. State lưu trữ dữ liệu form
  // const [formData,setFormData] = useState({
  //   display_name:'',
  //   login_name:'',
  //   email:'',
  //   password_hash:'',
  // });

  
  
  const handleRegister = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Xử lý đăng ký");
    
  };


  return (
    <AuthLayout mode="register">
      <form className={formStyles.container} onSubmit={handleRegister}>
        {/* Display Name */}         
          <div>
            <label className={formStyles.label}>Display Name</label>
            <div className = {formStyles.group}>
              <span className= {formStyles.inputIcon}>
                <User className = "size-5"/>
              </span>
              <input className={formStyles.inputField}
              placeholder="John Doe"
              type="text"
              required
              />
            </div>
          </div>

        {/* login Name */}
        <div>
          <label className={formStyles.label}>Login Name</label>
          <div className={formStyles.group}>
            <span className={formStyles.inputIcon}>
              <User className="size-5" />
            </span>
            <input
              className={formStyles.inputField}
              placeholder="JohnDoe123"
              type="text"
              required
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className={formStyles.label}>Email Address</label>
          <div className={formStyles.group}>
            <span className={formStyles.inputIcon}>
              <Mail className="size-5" />
            </span>
            <input
              className={formStyles.inputField}
              placeholder="name@company.com"
              type="email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className={formStyles.label}>Password</label>
          <div className={formStyles.group}>
            <span className={formStyles.inputIcon}>
              <Lock className="size-5" />
            </span>
            <input
              className={formStyles.inputFieldPass}
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={formStyles.btnEye}
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

           

        {/* Checkbox Terms  */}
        <div className={`${formStyles.optionsRow} !justify-start`}>
          <label className={formStyles.checkboxWrap}>
            <input className={formStyles.checkboxInput} type="checkbox" required />
            <span className="text-slate-600">
              I agree to the <a href="#" className={formStyles.linkText}>Terms of Service</a> and <a href="#" className={formStyles.linkText}>Privacy Policy</a>
            </span>
          </label>
        </div>

        {/* Nút Submit */}
        <button
          type="submit"
          className={formStyles.btnSubmit}
        >
          Create Account
          <ArrowRight className={formStyles.btnSubmitIcon} />
        </button>

        {/* Link chuyển sang Login */}
        <p className={formStyles.footerWrap}>
          Already have an account?{' '}
          <Link to="/login" className={formStyles.linkText}>
            Login
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}