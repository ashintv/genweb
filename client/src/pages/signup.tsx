import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Dummy signup function - simulates API call
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage('Account created successfully! Welcome aboard.');
    } catch (error) {
      setErrors({ email: 'Account creation failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-background to-background/95">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large geometric shapes */}
        <div className="absolute left-[5%] top-[10%] w-40 h-40 bg-primary/15 rounded-2xl rotate-[30deg] blur-lg" />
        <div className="absolute right-[8%] top-[20%] w-36 h-36 bg-primary/20 rounded-full blur-xl" />
        <div className="absolute left-[15%] bottom-[15%] w-44 h-44 bg-primary/10 rounded-full blur-2xl" />
        
        {/* Diamond patterns */}
        <div className="absolute right-[20%] bottom-[25%] w-24 h-24 bg-primary/25 rotate-45 blur-sm" />
        <div className="absolute left-[40%] top-[30%] w-16 h-16 bg-primary/20 rotate-[30deg] blur-sm" />
        
        {/* Triangle patterns using clip-path */}
        <div className="absolute right-[35%] top-[45%] w-20 h-20 bg-primary/15" 
             style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
        <div className="absolute left-[25%] top-[60%] w-16 h-16 bg-primary/20" 
             style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }} />
        
        {/* Small accent shapes */}
        <div className="absolute left-[60%] bottom-[40%] w-3 h-12 bg-primary/30 rounded-full rotate-[60deg]" />
        <div className="absolute right-[55%] top-[35%] w-12 h-3 bg-primary/30 rounded-full -rotate-[30deg]" />
        
        {/* Grid pattern */}
        <div className="absolute right-[15%] bottom-[30%] w-40 h-40 border border-primary/20 rounded-xl rotate-12 grid grid-cols-3 gap-1 p-2 blur-sm">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-primary/10 rounded-sm" />
          ))}
        </div>
        
        {/* Dots overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:32px_32px] opacity-30" />
        
        {/* Large gradient blobs for depth */}
        <div className="absolute -left-1/4 top-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[80%] top-[20%] w-10 h-10 bg-primary/10 rounded-lg rotate-45 animate-float" />
        <div className="absolute right-[70%] bottom-[30%] w-8 h-8 bg-primary/15 rounded-full animate-float-slow" />
        <div className="absolute left-[30%] top-[70%] w-12 h-12 bg-primary/10 clip-path-hexagon animate-float-slower" />
      </div>

      <Card className="max-w-md w-full backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center">
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Or{' '}
            <Link
              to="/signin"
              className="font-medium text-primary hover:text-primary/90 underline-offset-4 hover:underline"
            >
              sign in to your existing account
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'border-destructive' : ''}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? 'border-destructive' : ''}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {successMessage && (
            <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary font-medium">{successMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        </CardContent>
      </Card>
    </div>
  );
}