import React, { useEffect, useState } from 'react';
import logo from './LogoMain.png'; // Replace with the correct path to your logo image
import bitcoinImage from './bitcoin.png'; // Replace with the correct path to your bitcoin image
// import stocksImage from './stocks.png'; // Uncomment and replace with correct path if needed
// import newsImage from './news.png'; // Uncomment and replace with correct path if needed

export default function Home() {
  // State to hold the username
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if username exists in localStorage after authentication
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/loginsignup'; // Redirect to login/signup page
  };

  return (
    <div className="h-screen w-screen font-sans bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-blue-900 shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="App Logo" className="h-10 w-auto" />
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/home" className="text-white text-sm hover:text-blue-300 transition">Home</a></li>
            <li><a href="/discover" className="text-white text-sm hover:text-blue-300 transition">Discover</a></li>
            <li><a href="/news" className="text-white text-sm hover:text-blue-300 transition">Stocks News</a></li>
            <li><a href="/investing" className="text-white text-sm hover:text-blue-300 transition">Personal Investing</a></li>
            <li><a href="https://groww.in/" className="text-white text-sm hover:text-blue-300 transition">Resources</a></li>
            <li>
              <button
                onClick={handleLogout}
                className="h-auto w-auto bg-blue-700 text-white text-sm px-3 py-1 rounded hover:bg-blue-500 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {username ? username : 'Guest'}!
          </h1>
          <p className="text-gray-600 mt-2">Here's all the details about the stock market</p>
        </section>

        {/* Dashboard */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Bitcoin Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img src={bitcoinImage} alt="Bitcoin" className="w-32 h-32 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Bitcoin Overview</h3>
            <p className="text-gray-600">
              Bitcoin (BTC) is the first decentralized digital currency. Currently valued at $42,000, it leads the cryptocurrency market in innovation and adoption.
            </p>
          </div>

          {/* Card 2 - Stock Insights */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            {/* <img src={stocksImage} alt="Stocks" className="w-32 h-32 mb-4 mx-auto" /> */}
            <h3 className="text-xl font-semibold mb-2">Stock Market Insights</h3>
            <p className="text-gray-600">
              Track the latest trends, top-performing stocks, and market movements. Analyze data to make informed investment decisions.
            </p>
          </div>

          {/* Card 3 - Market News */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            {/* <img src={newsImage} alt="Market News" className="w-32 h-32 mb-4 mx-auto" /> */}
            <h3 className="text-xl font-semibold mb-2">Market News</h3>
            <p className="text-gray-600">
              Stay updated with breaking financial news, expert analysis, and economic forecasts influencing global markets.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-blue-900 text-center text-white text-sm mt-auto">
        &copy; 2024 | StockXplore | All rights reserved.
      </footer>
    </div>
  );
}
