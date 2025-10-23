import React, { useState } from 'react';
import { Mail, Loader, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const UnsubscribeComponent = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [unsubscribed, setUnsubscribed] = useState(false);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({ text: 'Please enter your email address', type: 'error' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8082/newsletter/unsubscribe?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ text: data.message || 'Successfully unsubscribed from newsletter', type: 'success' });
        setUnsubscribed(true);
        setEmail('');
      } else {
        setMessage({ text: data.message || 'Failed to unsubscribe', type: 'error' });
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setMessage({ text: 'Failed to unsubscribe. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUnsubscribed(false);
    setEmail('');
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {!unsubscribed ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-50 p-4 rounded-full">
                <Mail className="text-red-600" size={32} />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Unsubscribe
            </h1>
            <p className="text-center text-gray-600 mb-6">
              We're sorry to see you go. Enter your email to unsubscribe from our newsletter.
            </p>

            {/* Message Alert */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle size={20} className="flex-shrink-0" />
                ) : (
                  <AlertCircle size={20} className="flex-shrink-0" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {/* Form */}
            <div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnsubscribe(e)}
                  placeholder="you@example.com"
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleUnsubscribe}
                disabled={loading || !email.trim()}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Unsubscribing...
                  </>
                ) : (
                  'Unsubscribe'
                )}
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              You will be removed from our mailing list immediately.
            </p>
          </div>
        ) : (
          // Success State
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-green-50 p-4 rounded-full">
                <CheckCircle className="text-green-600" size={40} />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Unsubscribed
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Your email has been successfully removed from our newsletter. You won't receive any more
              emails from us.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> If you change your mind, you can always subscribe again to our
                newsletter.
              </p>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleReset}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Unsubscribe Another Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnsubscribeComponent;