import React, { useState } from 'react';
import Footer from '../Components/Footer';
import '../Components/Chatbot/SimpleChatbot.css';
import SimpleChatbot from '../Components/Chatbot/SimpleChatbot';

const ChatBot = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Dynamically import the chatbot component
  React.useEffect(() => {
    // Set a timeout to simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleChatbotError = (error) => {
    console.error("Error rendering Chatbot:", error);
    setError(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <div className="chatbot-page-container" style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)'
      }}>
        {/* Chatbot container */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
            <p className="mt-4 text-xl text-gray-300">Loading AI Assistant...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center max-w-xl">
            <svg
              className="mx-auto h-16 w-16 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-white">Something went wrong</h3>
            <p className="mt-2 text-gray-300">
              We encountered an issue loading the chatbot assistant. Please try again later or contact our support team if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: '600px',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <SimpleChatbot onError={handleChatbotError} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default ChatBot; 