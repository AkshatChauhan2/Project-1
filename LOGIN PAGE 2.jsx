import { useState } from 'react';

export default function Login() {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('email'); // 'email' or 'phone'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Simple hash function for privacy (In production, use proper crypto and server-side handling)
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'hash_' + Math.abs(hash).toString(16);
  };

  // Detect if input is email or phone number
  const detectInputType = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    
    if (emailRegex.test(value)) {
      return 'email';
    } else if (phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10) {
      return 'phone';
    }
    return 'unknown';
  };

  // Handle input change and auto-detect type
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    const detected = detectInputType(value);
    if (detected !== 'unknown') {
      setInputType(detected);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!inputValue || !password) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    // Validate input
    const detected = detectInputType(inputValue);
    if (detected === 'unknown') {
      alert('Please enter a valid email or phone number');
      setIsSubmitting(false);
      return;
    }

    // TODO: In production, send to backend API for verification
    // Backend should:
    // 1. Verify the email/phone exists
    // 2. Verify password
    // 3. Return a secure JWT token
    // 4. NEVER expose raw email/phone to client-side after initial input

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create privacy-preserving hash (In production, this happens server-side)
    const hashedIdentifier = simpleHash(inputValue);
    
    // Store only the hash in localStorage (In production, use httpOnly cookies with tokens)
    localStorage.setItem('userIdentifier', hashedIdentifier);
    localStorage.setItem('loginType', detected);
    
    // IMPORTANT: We do NOT store the raw email/phone anywhere
    // The backend would handle all identity verification and only return tokens

    setIsSubmitting(false);
    setLoginSuccess(true);

    // Simulate redirect after success
    setTimeout(() => {
      console.log('Login successful! Redirecting to dashboard...');
      // window.location.href = '/dashboard';
    }, 1500);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Toggle between email and phone input mode
  const toggleInputMode = () => {
    setInputType(inputType === 'email' ? 'phone' : 'email');
    setInputValue('');
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-12 w-full max-w-md text-center relative z-10 border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">Login Successful!</h2>
          <p className="text-gray-600 text-lg">Redirecting to your dashboard...</p>
          <div className="mt-6 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-indigo-300 opacity-20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Login Card - Made wider */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-12 w-full max-w-2xl transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-[1.02] relative z-10 border border-white/20">
        {/* Decorative gradient border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 rounded-3xl opacity-20 blur-lg"></div>
        
        <div className="relative">
          {/* Header with icon */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-5 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
              Welcome Back
            </h1>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email/Phone Input */}
            <div className="group">
              <label className="block text-base font-bold text-gray-700 mb-3 flex items-center space-x-2">
                <span className="text-2xl">{inputType === 'email' ? '📧' : '📱'}</span>
                <span>{inputType === 'email' ? 'Email Address' : 'Phone Number'}</span>
              </label>
              <div className="relative">
                <input
                  type={inputType === 'email' ? 'email' : 'tel'}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={inputType === 'email' ? 'you@example.com' : '+1 (555) 000-0000'}
                  className="w-full px-6 py-4 text-lg border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium group-hover:border-blue-300"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-base font-bold text-gray-700 mb-3 flex items-center space-x-2">
                <span className="text-2xl">🔐</span>
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full px-6 py-4 text-lg border-2 border-cyan-200 rounded-xl focus:ring-4 focus:ring-cyan-300 focus:border-cyan-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium group-hover:border-cyan-300"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-xl rounded-xl py-5 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-7 w-7 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Magic...
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Continue</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-10 text-center space-y-4">
            <button className="block w-full text-base font-semibold text-blue-600 hover:text-cyan-600 transition-colors duration-200 hover:underline">
              🔑 Forgot password?
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">or</span>
              </div>
            </div>
            <p className="text-base text-gray-700 font-medium">
              Don't have an account?{' '}
              <button className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
                Register 🚀
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
