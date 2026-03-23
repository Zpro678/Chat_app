import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquare } from 'lucide-react';
import { layoutStyles } from '../ts/authStyles.ts'; // <--- Import biến styles

interface AuthLayoutProps {
  children: ReactNode;
  mode: 'login' | 'register';
}

export default function AuthLayout({ children, mode }: AuthLayoutProps) {
  const isLogin = mode === 'login';

  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.card}>
        
        {/* NỬA TRÁI */}
        <div className={layoutStyles.leftPanel}>
          <header className={layoutStyles.header}>
            <div className="flex items-center gap-3">
              <div className={layoutStyles.logoBox}><MessageSquare className="size-6" /></div>
              <h1 className={layoutStyles.logoText}>PolyChat</h1>
            </div>
            <div className={layoutStyles.secureBadge}>
              <ShieldCheck className="size-4" /><span>Secure Access</span>
            </div>
          </header>

          <div className="mb-8">
            <h2 className={layoutStyles.titleMain}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className={layoutStyles.titleSub}>{isLogin ? 'Connect with the world in real-time.' : 'Join our global community today.'}</p>
          </div>

          <div className={layoutStyles.tabContainer}>
            <Link to="/login" className={`${layoutStyles.tabBase} ${isLogin ? layoutStyles.tabActive : layoutStyles.tabInactive}`}>
              Login
            </Link>
            <Link to="/register" className={`${layoutStyles.tabBase} ${!isLogin ? layoutStyles.tabActive : layoutStyles.tabInactive}`}>
              Register
            </Link>
          </div>

          {/* Form Content */}
          {children}

          <div className={layoutStyles.socialDividerBox}>
            <div className={layoutStyles.socialLine}></div>
            <span className={layoutStyles.socialText}>{isLogin ? 'Or continue with' : 'Or sign up with'}</span>
          </div>
          
          <div className={layoutStyles.socialGrid}>
            <button className={layoutStyles.btnSocial}><img src="..." className="size-5" />Google</button>
            <button className={layoutStyles.btnSocial}><img src="..." className="size-5" />GitHub</button>
          </div>

          <p className={layoutStyles.footerText}>Encrypted Connection • Trusted by 2M+ Users</p>
        </div>

        {/* NỬA PHẢI (Visuals) */}
       <div className={layoutStyles.rightPanel}>
          {/* Background Gradients & Blurs */}
          <div className={layoutStyles.bgOverlay}></div>
          <div className={layoutStyles.blurTop}></div>
          <div className={layoutStyles.blurBottom}></div>
          
          <div className={layoutStyles.visualContent}>
            
            {/* Box Chat giả lập (Xoay góc tùy theo mode Login/Register) */}
            <div className={`${layoutStyles.chatMockupBase} ${isLogin ? 'rotate-3' : '-rotate-3'}`}>
              <div className={layoutStyles.chatUserRow}>
                <div className={isLogin ? layoutStyles.avatarBlue : layoutStyles.avatarEmerald}></div>
                <div className={layoutStyles.chatLines}>
                  <div className={layoutStyles.chatLineLong}></div>
                  <div className={layoutStyles.chatLineShort}></div>
                </div>
              </div>

              {/* Nội dung tin nhắn thay đổi theo Mode */}
              <div className={layoutStyles.bubbleContainer}>
                {isLogin ? (
                  <>
                    <div className={layoutStyles.bubbleRowRight}>
                      <div className={layoutStyles.bubbleBlue}>Hey! Did you see the new update?</div>
                    </div>
                    <div className={layoutStyles.bubbleRowLeft}>
                      <div className={layoutStyles.bubbleGlass}>Just now! The speed is incredible. 🚀</div>
                    </div>
                    <div className={layoutStyles.bubbleRowRight}>
                      <div className={layoutStyles.bubbleBlue}>PolyChat is truly real-time.</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={layoutStyles.bubbleRowLeft}>
                      <div className={layoutStyles.bubbleGlass}>Welcome to the future of chat! ✨</div>
                    </div>
                    <div className={layoutStyles.bubbleRowRight}>
                      <div className={layoutStyles.bubbleBlue}>Can't wait to start collaborating.</div>
                    </div>
                    <div className={layoutStyles.bubbleRowLeft}>
                      <div className={layoutStyles.bubbleGlass}>Everything is synced in real-time.</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tiêu đề & Mô tả */}
            <h3 className={layoutStyles.visualTitle}>
              {isLogin ? 'Real-time collaboration for modern teams.' : 'Join the next generation of messaging.'}
            </h3>
            <p className={layoutStyles.visualDesc}>
              {isLogin ? 'Secure, fast, and polyglot communication across the globe.' : 'Experience seamless communication with your team, anywhere in the world.'}
            </p>
            
            {/* Phần thông số Stats ở dưới cùng */}
            <div className={layoutStyles.statsContainer}>
              <div className={layoutStyles.statItem}>
                <ShieldCheck className="size-8 text-white" />
                <span className={layoutStyles.statLabel}>AES-256</span>
              </div>
              <div className={layoutStyles.statItem}>
                <div className={layoutStyles.statValue}>99.9%</div>
                <span className={layoutStyles.statLabel}>Uptime</span>
              </div>
              <div className={layoutStyles.statItem}>
                <div className={layoutStyles.statValue}>Global</div>
                <span className={layoutStyles.statLabel}>CDN</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}