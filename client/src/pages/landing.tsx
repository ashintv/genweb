import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

// CSS styles for animations
const styles = `
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .animate-gradient-shift {
    animation: gradient-shift infinite;
    background-size: 400% 400%;
  }
  
  .clip-path-hexagon {
    clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  }
`;

export default function Landing() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Create animated particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: any[] = [];
    
    // Generate random colors in the primary color palette
    function getRandomColor() {
      const colors = [
        'rgba(96, 165, 250, 0.6)',  // Blue
        'rgba(56, 189, 248, 0.6)',  // Cyan
        'rgba(129, 140, 248, 0.6)', // Indigo
        'rgba(139, 92, 246, 0.6)',  // Violet
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = getRandomColor();
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    function initParticles() {
      particles = [];
      const width = canvas?.width || window.innerWidth;
      const height = canvas?.height || window.innerHeight;
      
      const particleCount = Math.min(
        Math.floor((width * height) / 15000), 
        150
      );
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles with lines if they are close enough
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Connect particles with lines
    function connectParticles() {
      if (!ctx) return;
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 116, 139, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Apply custom animations */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-background to-background/95">
      {/* Animated background canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 animate-gradient-shift" 
           style={{ animationDuration: '20s' }} />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-40" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 to-transparent opacity-30" />
        
        {/* Geometric shapes */}
        <div className="absolute left-[10%] top-[20%] w-32 h-32 bg-primary/20 rounded-lg rotate-45 blur-sm animate-pulse" 
             style={{ animationDuration: '7s' }} />
        <div className="absolute right-[15%] top-[15%] w-40 h-40 bg-primary/15 rounded-full blur-xl animate-pulse" 
             style={{ animationDuration: '10s' }} />
        <div className="absolute left-[20%] bottom-[25%] w-48 h-48 bg-primary/20 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute right-[25%] bottom-[20%] w-36 h-36 bg-primary/20 rounded-lg rotate-12 blur-sm animate-pulse" 
             style={{ animationDuration: '9s' }} />
        
        {/* Hexagonal patterns */}
        <div className="absolute left-[5%] top-[40%] w-24 h-24 bg-primary/20 rotate-[30deg] clip-path-hexagon blur-sm animate-pulse" 
             style={{ animationDuration: '12s' }} />
        <div className="absolute right-[8%] top-[60%] w-28 h-28 bg-primary/20 rotate-[45deg] clip-path-hexagon blur-md animate-pulse" 
             style={{ animationDuration: '11s' }} />
        
        {/* Large blurred shapes for depth */}
        <div className="absolute left-1/4 -top-1/4 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '15s' }} />
        <div className="absolute -right-1/4 bottom-1/4 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '13s' }} />
        
        {/* Additional decorative elements */}
        <div className="absolute left-[40%] top-[30%] w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse" 
             style={{ animationDuration: '9s' }} />
        <div className="absolute right-[30%] top-[40%] w-20 h-20 bg-blue-500/10 rotate-45 rounded-lg blur-md animate-pulse" 
             style={{ animationDuration: '12s' }} />
        <div className="absolute left-[65%] top-[60%] w-16 h-16 bg-violet-500/10 rounded-full blur-lg animate-pulse" 
             style={{ animationDuration: '10s' }} />
        
        {/* Dots pattern with increased density */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:20px_20px] opacity-50" />
      </div>

      {/* Navbar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <div className="h-10 px-4 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            aetrix.ai
          </span>
        </div>

        <div className="relative group">
          <button className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-white/25 transition-colors">
            <svg
              className="w-5 h-5 text-primary/80"
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

          <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button 
              onClick={() => navigate('/profile')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-primary/15 text-primary/90 hover:text-primary flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </button>
            
            <button 
              onClick={() => navigate('/signin')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-primary/15 text-primary/90 hover:text-primary flex items-center gap-3"
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
              className="w-full px-4 py-2 text-left text-sm hover:bg-primary/15 text-primary/90 hover:text-primary flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create New
            </button>
          </div>
        </div>

        <div className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-primary/80"
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
        <section className="min-h-screen flex items-center px-4 md:px-12 lg:px-24">
          <div className="max-w-4xl my-auto">
            <h1 className="text-9xl md:text-[10rem] font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 tracking-tight leading-[0.9]">
              Welcome to<br />Aetrix.ai
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed mb-12 max-w-3xl">
              Unleash the power of AI to create stunning portfolios that showcase your journey. 
              We transform your achievements into captivating digital stories, helping students 
              and professionals stand out in today's competitive landscape.
            </p>

            <div className="flex flex-col gap-4 max-w-[600px]">
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-xl px-8 py-4 border-primary/30 hover:bg-primary/90"
                variant={"outline"}
              >
                Get Started
              </Button>

              <div className="flex gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 flex-1"
                >
                  Create My Portfolio
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/profile')}
                  className="text-lg px-8 py-3 border-primary/30 hover:bg-primary/10 flex-1"
                >
                  Update My Profile
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features Section - Simple and Professional */}
        <section className="py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-8">
                  Key Features
                </h2>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">AI-Powered Portfolio Generation</h3>
                      <p className="text-foreground/70">Advanced algorithms create tailored portfolios based on your skills and experience.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Custom Domain Integration</h3>
                      <p className="text-foreground/70">Use your own domain or our free subdomain for a professional web presence.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Analytics Dashboard</h3>
                      <p className="text-foreground/70">Track visits and engagement with your portfolio to optimize for better results.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="h-24 w-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                        <line x1="12" y1="22" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Ready to showcase your work?</h3>
                    <p className="text-foreground/70 mb-6">Create your professional portfolio in minutes, not days.</p>
                    <Button 
                      onClick={() => navigate('/signup')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Start Building
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="mt-auto py-8 px-4 border-t border-white/10">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 px-4 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center">
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  aetrix.ai
                </span>
              </div>
              <span className="text-sm text-foreground/40">© 2025</span>
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">About</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
    </>
  );
}