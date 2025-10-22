import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-background to-background/95">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute left-[10%] top-[20%] w-24 h-24 bg-primary/20 rounded-lg rotate-45 blur-sm" />
        <div className="absolute right-[15%] top-[15%] w-32 h-32 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute left-[20%] bottom-[25%] w-40 h-40 bg-primary/15 rounded-full blur-2xl" />
        <div className="absolute right-[25%] bottom-[20%] w-28 h-28 bg-primary/20 rounded-lg rotate-12 blur-sm" />
        
        {/* Hexagonal patterns */}
        <div className="absolute left-[5%] top-[40%] w-16 h-16 bg-primary/20 rotate-[30deg] clip-path-hexagon blur-sm" />
        <div className="absolute right-[8%] top-[60%] w-20 h-20 bg-primary/15 rotate-[45deg] clip-path-hexagon blur-md" />
        
        {/* Large blurred shapes for depth */}
        <div className="absolute left-1/4 -top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        {/* Dots pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Navbar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <div className="h-10 px-4 rounded-full bg-white/10 backdrop-blur-md border-white/20 shadow-lg shadow-black/5 flex items-center">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            aetrix.ai
          </span>
        </div>

        <div className="relative group">
          <button className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border-white/20 shadow-lg shadow-black/5 flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg
              className="w-5 h-5 text-primary/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>

          <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button 
              onClick={() => navigate('/profile')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 text-primary/80 hover:text-primary flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </button>
            
            <button 
              onClick={() => navigate('/signin')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 text-primary/80 hover:text-primary flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </button>

            <button 
              onClick={() => navigate('/generate')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 text-primary/80 hover:text-primary flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create New
            </button>
          </div>
        </div>

        <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border-white/20 shadow-lg shadow-black/5 flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-primary/60"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section - Full height viewport */}
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            <h1 className="text-8xl md:text-9xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 tracking-tight">
              Welcome to<br />Aetrix.ai
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-12">
              Unleash the power of AI to create stunning portfolios that showcase your journey. 
              We transform your achievements into captivating digital stories, helping students 
              and professionals stand out in today's competitive landscape.
            </p>

            <div className="flex gap-6">
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-lg px-8 py-3 bg-primary hover:bg-primary/90"
              >
                Create My Portfolio
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/profile')}
                className="text-lg px-8 py-3 border-primary/30 hover:bg-primary/10"
              >
                Update My Profile
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}