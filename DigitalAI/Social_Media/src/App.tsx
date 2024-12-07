import React, { useState } from 'react';
import { Send, Search, Mail, LineChart, Users } from 'lucide-react';
import axios from 'axios';

function App() {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (action: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/${action}`, { product });
      setResult(response.data.message);
    } catch (error) {
      setResult('Error occurred while processing your request');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Digital Marketing AI Platform</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Product or Service
          </label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g., Wireless Headphones, Online Course, etc."
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleSubmit('research_audience')}
              disabled={!product || loading}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Search size={20} />
              Research Audience
            </button>
            
            <button
              onClick={() => handleSubmit('create_content')}
              disabled={!product || loading}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              <Send size={20} />
              Generate Content
            </button>
            
            <button
              onClick={() => handleSubmit('analyze_market')}
              disabled={!product || loading}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              <LineChart size={20} />
              Market Analysis
            </button>
            
            <button
              onClick={() => handleSubmit('email_campaign')}
              disabled={!product || loading}
              className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50"
            >
              <Mail size={20} />
              Email Campaign
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="prose max-w-none">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;