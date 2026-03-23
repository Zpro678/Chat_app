import { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layout/authLayout';
import { formStyles } from '../ts/authStyles.ts'; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout mode="login">
      <form className={formStyles.container} onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className={formStyles.label}>Email or Username</label>
          <div className={formStyles.group}>
            <span className={formStyles.inputIcon}>@</span>
            <input className={formStyles.inputField} placeholder="name@company.com" type="text" required />
          </div>
        </div>

        <div>
          <label className={formStyles.label}>Password</label>
          <div className={formStyles.group}>
            <span className={formStyles.inputIcon}><ShieldCheck className="size-5" /></span>
            <input 
              className={formStyles.inputFieldPass} 
              placeholder="••••••••" 
              type={showPassword ? 'text' : 'password'} 
              required 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={formStyles.btnEye}>
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <div className={formStyles.optionsRow}>
          <label className={formStyles.checkboxWrap}>
            <input className={formStyles.checkboxInput} type="checkbox" />
            <span className="text-slate-600">Remember me</span>
          </label>
          <a className={formStyles.linkText} href="#">Forgot password?</a>
        </div>

        <button type="submit" className={formStyles.btnSubmit}>
          Sign In <ArrowRight className={formStyles.btnSubmitIcon} />
        </button>

        <p className={formStyles.footerWrap}>
          Don't have an account? <Link to="/register" className={formStyles.linkText}>Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
}