// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route, Link , Navigate } from 'react-router-dom';
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";

import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
function Home(){
  return (
    <div>
      <h1>Home Page</h1>
      {/* Sử dụng Link để điều hướng mà không tải lại trang*/}
      <Link to="/login">Go to Login</Link>
    </div>
  )
}


function App(){
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/" element={ <Navigate to ="/Login" replace/>}/>
        <Route path="/register" element={< Register/> }/>
        <Route path="/login" element={< Login/> }/>
        <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
      </Routes>
    </div>
  );
}
export default App
