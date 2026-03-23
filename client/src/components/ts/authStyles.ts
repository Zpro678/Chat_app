// authStyles.ts

export const layoutStyles = {
  // Container chính
  wrapper: "flex h-screen w-full items-center justify-center p-4 md:p-0 bg-slate-50",
  card: "flex w-full max-w-[1200px] h-full md:h-[800px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200",
  
  // Nửa trái
  leftPanel: "w-full md:w-1/2 flex flex-col p-8 md:p-16 overflow-y-auto",
  header: "flex items-center justify-between mb-12",
  logoBox: "size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white",
  logoText: "text-2xl font-bold tracking-tight text-slate-900 leading-none",
  secureBadge: "flex items-center gap-2 text-blue-600 font-medium text-sm px-3 py-1.5 bg-blue-50 rounded-full",
  
  titleMain: "text-3xl font-black mb-2",
  titleSub: "text-slate-500",
  
  // Tabs
  tabContainer: "flex border-b border-slate-200 mb-8",
  tabBase: "px-6 py-3 border-b-2 font-bold text-sm tracking-wide transition-colors",
  tabActive: "border-blue-600 text-blue-600",
  tabInactive: "border-transparent text-slate-400 hover:text-slate-600",
  
  // Social Logins
  socialDividerBox: "relative flex items-center justify-center mb-6 mt-8",
  socialLine: "border-t border-slate-200 w-full",
  socialText: "bg-white px-4 text-xs font-bold text-slate-400 uppercase absolute tracking-widest",
  socialGrid: "grid grid-cols-2 gap-4",
  btnSocial: "flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-sm",
  footerText: "text-xs text-slate-400 font-medium uppercase tracking-tighter mt-auto pt-8 text-center",

  // Nửa phải (Visuals)
  rightPanel: "hidden md:flex w-1/2 relative bg-blue-600 items-center justify-center p-12 overflow-hidden transition-all duration-500",
  bgOverlay: "absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-800 to-slate-900",
  blurTop: "absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl",
  blurBottom: "absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl",
  visualContent: "relative z-10 text-center max-w-sm",
  visualTitle: "text-3xl font-bold text-white mb-4",
  visualDesc: "text-white/70 text-lg",
  
  // Khung Chat giả lập
  chatMockupBase: "bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl transition-transform duration-500",
  chatUserRow: "flex items-center gap-3 mb-6",
  avatarBlue: "size-8 rounded-full bg-blue-400",
  avatarEmerald: "size-8 rounded-full bg-emerald-400",
  chatLines: "flex-1 space-y-2",
  chatLineLong: "h-2 w-24 bg-white/20 rounded",
  chatLineShort: "h-2 w-16 bg-white/10 rounded",
  
  // Bong bóng Chat
  bubbleContainer: "space-y-4",
  bubbleRowRight: "flex justify-end",
  bubbleRowLeft: "flex justify-start",
  bubbleBlue: "bg-blue-600 px-4 py-2 rounded-xl rounded-tr-none text-xs text-white",
  bubbleGlass: "bg-white/20 px-4 py-2 rounded-xl rounded-tl-none text-xs text-white",

  // Text & Thống kê
  statsContainer: "mt-12 flex items-center justify-center gap-6 opacity-60",
  statItem: "flex flex-col items-center gap-1",
  statValue: "text-white font-bold text-2xl",
  statLabel: "text-[10px] text-white font-bold tracking-widest uppercase",
};

export const formStyles = {
  container: "space-y-5",
  group: "relative",
  label: "block text-sm font-semibold text-slate-700 mb-2",
  inputIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400",
  inputField: "w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900",
  inputFieldPass: "w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900",
  btnEye: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors",
  optionsRow: "flex items-center justify-between text-sm py-2",
  checkboxWrap: "flex items-center gap-2 cursor-pointer",
  checkboxInput: "rounded border-slate-300 text-blue-600 focus:ring-blue-600",
  linkText: "text-blue-600 font-semibold hover:underline",
  btnSubmit: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group",
  btnSubmitIcon: "size-5 group-hover:translate-x-1 transition-transform",
  footerWrap: "text-center text-sm text-slate-500 mt-4"
};