import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handle form input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Verify user credentials against stored data
   */
  const verifyUser = (username: string, password: string): boolean => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.username === username && u.password === password);
      
      if (user) {
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          loginTime: new Date().toISOString()
        }));
        console.log('User verified successfully:', user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying user:', error);
      return false;
    }
  };

  /**
   * Handle login submission
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    if (!formData.username || !formData.password) {
      setErrors({ 
        form: 'Please enter both username and password' 
      });
      return;
    }
    
    setIsLoading(true);
    
    // Verify user credentials
    const isValid = verifyUser(formData.username, formData.password);
    
    setTimeout(() => {
      if (isValid) {
        // Show success message
        setErrors({}); // Clear any errors
        setIsLoading(false);
        
        // Redirect to home page after a short delay to show success
        setTimeout(() => {
          window.location.href = '/';
        }, 1500); // Increased delay to show success message
      } else {
        setErrors({ 
          form: 'Invalid username or password' 
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  /**
   * Handle forgot password
   */
  const handleForgotPassword = () => {
    // Find users in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.length > 0) {
      const usernames = users.map((u: any) => u.username).join(', ');
      alert(`For demo purposes: Registered users are: ${usernames}\n\nIn a real application, this would send a password reset link to your email.`);
    } else {
      alert('No users are registered yet. Please create an account first.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome Back
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Sign in to access your internship opportunities
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Form Error Message */}
            {errors.form && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {errors.form}
              </div>
            )}

            {/* Success Message */}
            {!isLoading && !errors.form && formData.username && formData.password && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                Login successful! Redirecting...
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="pl-10 w-full"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center pt-4">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Forgot your password?
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-2 border-t">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a 
                href="/signup" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}