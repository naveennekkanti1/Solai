import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Mail, CheckCircle, AlertCircle, Loader, Eye } from 'lucide-react';

// ✅ FIX 1: Templates defined OUTSIDE component so they never reset
const TEMPLATES = {
  welcome: `<!DOCTYPE html>
<html><head><style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;}
  .container{max-width:600px;margin:0 auto;padding:20px;}
  .header{background:#1a1f2e;color:white;padding:30px;text-align:center;}
  .content{padding:30px;background:#f9f9f9;}
  .footer{background:#1a1f2e;color:white;padding:20px;text-align:center;font-size:12px;}
</style></head>
<body><div class="container">
  <div class="header"><h1>Welcome to SolAI</h1></div>
  <div class="content">
    <h2>Thank you for subscribing!</h2>
    <p>We're excited to have you join our community of AI enthusiasts.</p>
    <ul>
      <li>Latest AI technology trends</li>
      <li>Industry insights and analysis</li>
      <li>Product updates and new features</li>
      <li>Exclusive tips and best practices</li>
    </ul>
  </div>
  <div class="footer"><p>© 2024 SolAI. All rights reserved.</p></div>
</div></body></html>`,

  weekly: `<!DOCTYPE html>
<html><head><style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;}
  .container{max-width:600px;margin:0 auto;padding:20px;}
  .header{background:#1a1f2e;color:white;padding:30px;text-align:center;}
  .content{padding:30px;background:#f9f9f9;}
  .footer{background:#1a1f2e;color:white;padding:20px;text-align:center;font-size:12px;}
  .button{background:#dc2626;color:white;padding:12px 30px;text-decoration:none;border-radius:5px;display:inline-block;margin:20px 0;}
  .article{background:white;padding:20px;margin:20px 0;border-left:4px solid #dc2626;}
</style></head>
<body><div class="container">
  <div class="header"><h1>This Week in AI</h1></div>
  <div class="content">
    <h2>Weekly AI Insights</h2>
    <p>Welcome to this week's edition of SolAI insights!</p>
    <div class="article">
      <h3>Featured Article</h3>
      <p>Discover how AI is transforming business operations across industries.</p>
    </div>
    <div class="article">
      <h3>Latest Updates</h3>
      <ul>
        <li>New AI technologies revolutionizing industries</li>
        <li>Best practices for AI implementation</li>
        <li>Success stories from our clients</li>
      </ul>
    </div>
    <div class="article">
      <h3>Upcoming Events</h3>
      <p>Join us for our upcoming webinar on AI-driven solutions.</p>
      <a href="#" class="button">Register Now</a>
    </div>
    <p>Stay innovative,<br><strong>The SolAI Team</strong></p>
  </div>
  <div class="footer">
    <p>© 2024 SolAI. All rights reserved.</p>
    <p>24th Main Road, HSR Layout, Bengaluru, Karnataka, 560012</p>
  </div>
</div></body></html>`,

  announcement: `<!DOCTYPE html>
<html><head><style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;}
  .container{max-width:600px;margin:0 auto;padding:20px;}
  .ann-box{background:#1a1f2e;border-radius:10px;overflow:hidden;}
  .ann-stripe{height:5px;background:#dc2626;}
  .ann-body{padding:28px 32px 24px;}
  .ann-label{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#dc2626;margin:0 0 6px;}
  .ann-title{font-size:20px;font-weight:700;color:#fff;margin:0 0 8px;}
  .ann-desc{font-size:14px;color:#b0b8cc;margin:0 0 18px;}
  .ann-cta{display:inline-block;background:#dc2626;color:#fff;font-size:13px;font-weight:700;padding:10px 22px;border-radius:6px;text-decoration:none;}
  .footer{background:#1a1f2e;color:white;padding:20px;text-align:center;font-size:12px;margin-top:16px;border-radius:8px;}
</style></head>
<body><div class="container">
  <div class="ann-box">
    <div class="ann-stripe"></div>
    <div class="ann-body">
      <p class="ann-label">Big Announcement</p>
      <h2 class="ann-title">SolAI 2.0 is Here — The Future of AI Just Got Closer</h2>
      <p class="ann-desc">Smarter insights, faster automation, and deeper integrations.</p>
      <a href="#" class="ann-cta">Explore What's New &rarr;</a>
    </div>
  </div>
  <div class="footer"><p>© 2024 SolAI. All rights reserved.</p></div>
</div></body></html>`
};

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('weekly');

  // ✅ FIX 2: content is its OWN state, not nested inside an object
  const [content, setContent] = useState(TEMPLATES.weekly);
  const msgTimer = useRef(null);

  useEffect(() => { fetchSubscribers(); }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://violent-stacey-solai-aba6a507.koyeb.app/newsletter/subscribers');
      const data = await response.json();
      if (data.success) setSubscribers(data.subscribers || []);
    } catch {
      showMessage('Failed to fetch subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // ✅ FIX 3: loadTemplate directly sets content state — no stale closure issues
  const loadTemplate = (key) => {
    setActiveTemplate(key);
    setContent(TEMPLATES[key]);
    showMessage(`${key.charAt(0).toUpperCase() + key.slice(1)} template loaded`, 'success');
  };

  const handleSendNewsletter = async () => {
    if (!content.trim()) {
      showMessage('Please enter newsletter content', 'error');
      return;
    }
    setSending(true);
    try {
      // ✅ FIX 4: sending `content` directly, not newsletter.content
      const response = await fetch('http://localhost:8081/newsletter/send-weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showMessage('Newsletter sent successfully to all subscribers!', 'success');
      } else {
        showMessage(data.message || 'Failed to send newsletter', 'error');
      }
    } catch {
      showMessage('Failed to send newsletter. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Mail className="text-red-600" size={32} />
              Newsletter Admin Panel
            </h1>
            <p className="text-gray-600 mt-2">Manage and send newsletters to your subscribers</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Users className="text-red-600" size={28} />
              {subscribers.length}
            </div>
            <p className="text-sm text-gray-600">Total Subscribers</p>
          </div>
        </div>

        {/* Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Composer */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Compose Newsletter</h2>

            {/* ✅ FIX 5: Active template highlighted with ring */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'welcome', label: 'Welcome Email', cls: 'bg-blue-50 text-blue-700 hover:bg-blue-100', activeCls: 'ring-2 ring-blue-500 bg-blue-100' },
                  { key: 'weekly', label: 'Weekly Update', cls: 'bg-purple-50 text-purple-700 hover:bg-purple-100', activeCls: 'ring-2 ring-purple-500 bg-purple-100' },
                  { key: 'announcement', label: 'Announcement', cls: 'bg-orange-50 text-orange-700 hover:bg-orange-100', activeCls: 'ring-2 ring-orange-500 bg-orange-100' },
                ].map(({ key, label, cls, activeCls }) => (
                  <button
                    key={key}
                    onClick={() => loadTemplate(key)}
                    className={`px-4 py-2 rounded-lg transition text-sm font-medium ${cls} ${activeTemplate === key ? activeCls : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea — key forces remount when template changes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">HTML Content</label>
              <textarea
                key={activeTemplate}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setActiveTemplate('custom');
                }}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter your HTML content here..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                {previewMode ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={handleSendNewsletter}
                disabled={sending || !content.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? <><Loader size={20} className="animate-spin" /> Sending...</> : <><Send size={20} /> Send to All Subscribers</>}
              </button>
            </div>

            {previewMode && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Email Preview</h3>
                <div
                  className="border border-gray-300 rounded-lg p-4 bg-white max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}
          </div>

          {/* Subscribers */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Subscribers</h2>
              <button onClick={fetchSubscribers} disabled={loading} className="p-2 text-gray-600 hover:text-gray-900">
                <Loader size={20} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
            {loading ? (
              <div className="text-center py-8">
                <Loader size={32} className="animate-spin mx-auto text-red-600" />
                <p className="text-gray-600 mt-2">Loading...</p>
              </div>
            ) : subscribers.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-600">No subscribers yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {subscribers.map((subscriber, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {subscriber.email?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{subscriber.email}</p>
                      {subscriber.subscribedAt && (
                        <p className="text-xs text-gray-500">{new Date(subscriber.subscribedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterAdmin;