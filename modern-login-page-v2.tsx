import { useState } from 'react';

export default function Login() {
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState('');
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
    if (!inputValue || !otp) {
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
    // 2. Send OTP to the user
    // 3. Verify OTP on next step
    // 4. Return a secure JWT token
    // 5. NEVER expose raw email/phone to client-side after initial input

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
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-12 w-full max-w-md text-center relative z-10 border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">Login Successful!</h2>
          <p className="text-gray-600 text-lg">Redirecting to your dashboard...</p>
          <div className="mt-6 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-pink-300 opacity-20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Login Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md transition-all duration-300 hover:shadow-pink-500/50 hover:scale-[1.02] relative z-10 border border-white/20">
        {/* Decorative gradient border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl opacity-20 blur-lg"></div>
        
        <div className="relative">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-base">Login securely to continue your journey ✨</p>
          </div>

          {/* Login Form */}
          <div className="space-y-5">
            {/* Input Type Toggle */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={toggleInputMode}
                className="group relative px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>Use {inputType === 'email' ? 'Phone' : 'Email'}</span>
                </span>
              </button>
            </div>

            {/* Email/Phone Input */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                <span className="text-lg">{inputType === 'email' ? '📧' : '📱'}</span>
                <span>{inputType === 'email' ? 'Email Address' : 'Phone Number'}</span>
              </label>
              <div className="relative">
                <input
                  type={inputType === 'email' ? 'email' : 'tel'}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={inputType === 'email' ? 'you@example.com' : '+1 (555) 000-0000'}
                  className="w-full px-5 py-3.5 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium group-hover:border-purple-300"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* OTP/Password Input */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                <span className="text-lg">🔐</span>
                <span>Verification Code / Password</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter code or password"
                  className="w-full px-5 py-3.5 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium group-hover:border-pink-300"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-start space-x-3 pt-2 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                🛡️ Your contact info is <span className="font-bold text-green-700">never shared</span>. We use privacy-preserving methods to protect your identity.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-xl py-4 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Magic...
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Continue</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-3">
            <button className="block w-full text-sm font-semibold text-purple-600 hover:text-pink-600 transition-colors duration-200 hover:underline">
              🔑 Forgot password?
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-gray-500 font-medium">or</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              Don't have an account?{' '}
              <button className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                Sign up now! 🚀
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}