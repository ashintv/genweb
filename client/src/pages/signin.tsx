import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
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

    const newErrors: { email?: string; password?: string } = {};

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Dummy signin function - simulates API call
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage('Sign in successful! Welcome back.');
    } catch (error) {
      setErrors({ email: 'Sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-background to-background/95">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute left-[10%] top-[20%] w-24 h-24 bg-primary/20 rounded-lg rotate-45 blur-sm" />
        <div className="absolute right-[15%] top-[15%] w-32 h-32 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute left-[20%] bottom-[25%] w-40 h-40 bg-primary/15 rounded-full blur-2xl" />
        <div className="absolute right-[25%] bottom-[20%] w-28 h-28 bg-primary/20 rounded-lg rotate-12 blur-sm" />
        
        {/* Small decorative elements */}
        <div className="absolute left-[45%] top-[10%] w-4 h-12 bg-primary/30 rounded-full rotate-45" />
        <div className="absolute right-[40%] bottom-[15%] w-12 h-4 bg-primary/30 rounded-full -rotate-12" />
        
        {/* Hexagonal patterns */}
        <div className="absolute left-[5%] top-[40%] w-16 h-16 bg-primary/20 rotate-[30deg] clip-path-hexagon blur-sm" />
        <div className="absolute right-[8%] top-[60%] w-20 h-20 bg-primary/15 rotate-[45deg] clip-path-hexagon blur-md" />
        
        {/* Grid patterns */}
        <div className="absolute left-[30%] top-[70%] w-32 h-32 border border-primary/20 rounded-lg rotate-12 grid grid-cols-2 gap-2 p-2 blur-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-primary/10 rounded-sm" />
          ))}
        </div>
        
        {/* Large blurred shapes for depth */}
        <div className="absolute left-1/4 -top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        {/* Dots pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Add some animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[15%] top-[25%] w-8 h-8 bg-primary/10 rounded-full animate-float-slow" />
        <div className="absolute right-[20%] top-[35%] w-6 h-6 bg-primary/15 rounded-lg rotate-45 animate-float-slower" />
        <div className="absolute left-[75%] bottom-[15%] w-10 h-10 bg-primary/10 clip-path-hexagon animate-float" />
      </div>

      <Card className="max-w-md w-full backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center">
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Or{' '}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/90 underline-offset-4 hover:underline"
            >
              create a new account
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
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'border-destructive' : ''}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">{errors.password}</p>
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
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        </CardContent>
      </Card>
    </div>
  );
}