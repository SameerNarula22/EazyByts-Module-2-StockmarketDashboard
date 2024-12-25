// import './App.css';
// // import LoginSignUp from './Components/Authorization/LoginSignUp';
// import Home from './Components/Home/Home';

// function App() {
//   return (
//     <>
//     {/* <LoginSignUp/> */}
//     <Home/>

//     </>
//   );
// }

// export default App;
// import { useState } from "react";
// import "./App.css";
// import Dashboard from "./Components/Dashboard";
// import StockContext from "./context/StockContext";
// import ThemeContext from "./context/ThemeContext";

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [stockSymbol, setStockSymbol] = useState("MSFT");

//   return (
//     <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
//       <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
//         <Dashboard />
//       </StockContext.Provider>
//     </ThemeContext.Provider>
//   );
// }

// export default App;

// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Dashboard from "./Components/Dashboard";
// import LoginSignup from "./Components/Authorization/LoginSignUp";
// import StockContext from "./context/StockContext";
// import ThemeContext from "./context/ThemeContext";

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [stockSymbol, setStockSymbol] = useState("MSFT");

//   return (
//     <Router>
//       <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
//         <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
//           <Routes>
//             {/* Route for LoginSignup */}
//             <Route path="/" element={<LoginSignup />} />

//             {/* Route for Dashboard */}
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </StockContext.Provider>
//       </ThemeContext.Provider>
//     </Router>
//   );
// }

// export default App;





import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import LoginSignup from "./Components/Authorization/LoginSignUp";
import Home from "./Components/Home/Home";
import StockContext from "./context/StockContext";
import ThemeContext from "./context/ThemeContext";
import StockNews from "./Components/StockNews";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("MSFT");

  return (
    <Router>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
          <Routes>
            {/* Route for LoginSignup */}
            <Route path="/" element={<LoginSignup />} />

            {/* Route for Home and Dashboard */}
            <Route path="/home" element={<Home />} />
            <Route path="/discover" element={<Dashboard />} />
            <Route path="/loginsignup" element={<LoginSignup />} />
            <Route path="/news" element={<StockNews/>} />
          </Routes>
        </StockContext.Provider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
