import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const StockNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}&topics=technology,ipo&page=${page}`
        );

        if (response.data.feed.length > 0) {
          setNews((prevNews) => [...prevNews, ...response.data.feed]);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  // Memoized handleScroll function
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const formatPublishedDate = (dateString) => {
    try {
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6) - 1;
      const day = dateString.slice(6, 8);
      const hours = dateString.slice(9, 11);
      const minutes = dateString.slice(11, 13);
      const seconds = dateString.slice(13, 15);

      const formattedDate = new Date(
        Date.UTC(year, month, day, hours, minutes, seconds)
      );
      return formattedDate.toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="bg-blue-50 h-screen w-screen flex flex-col">
      <header className="sticky top-0 bg-blue-900 text-white text-center px-6 py-4 shadow-md z-10 w-full">
        <h1 className="text-2xl font-bold">News</h1>
      </header>
      <main className="flex-grow overflow-y-auto p-4 max-w-4xl mx-auto">
        <ul className="space-y-6">
          {news.map((item, index) => (
            <li key={index} className="bg-white shadow rounded-lg p-4 border border-gray-200">
              <h2 className="text-lg font-bold mb-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.title}
                </a>
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Published: {formatPublishedDate(item.time_published)}
              </p>
              <p className="text-gray-700">{item.summary}</p>
            </li>
          ))}
        </ul>
        {loading && (
          <div className="flex justify-center mt-4">
            <span className="text-gray-600">Loading please wait ...</span>
          </div>
        )}
        {!hasMore && (
          <div className="flex justify-center mt-4">
            <span className="text-gray-600">No more news available.</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default StockNews;
