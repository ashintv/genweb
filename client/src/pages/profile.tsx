import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import MainProfile from "../components/profile/MainProfile";
import ProjectsView from "../components/profile/ProjectsView";
import AchievementsView from "../components/profile/AchievementsView";
import SkillsView from "../components/profile/SkillsView";

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

type ProfileTab = "main" | "projects" | "achievements" | "skills";

// Mock data for demonstration
const mockUserData = {
  name: "John Doe",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  description: "Full-stack developer specializing in React, TypeScript, and Node.js. Passionate about building beautiful, responsive, and user-friendly web applications.",
};

const mockProjects = [
  {
    id: "1",
    title: "Personal Portfolio",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "A personal portfolio website built with React and TypeScript.",
    link: "https://github.com/johndoe/portfolio",
  },
  {
    id: "2",
    title: "E-commerce Dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "An e-commerce dashboard built with React, TypeScript, and Node.js.",
    link: "https://github.com/johndoe/ecommerce-dashboard",
  },
];

const mockAchievements = [
  {
    id: "1",
    title: "React Developer Certification",
    description: "Completed the React Developer Certification program from Meta.",
    date: "2023-05-15",
  },
  {
    id: "2",
    title: "Hackathon Winner",
    description: "Won first place in the annual XYZ Hackathon with a project focused on accessibility.",
    date: "2024-01-20",
  },
];

const mockSkills = [
  { id: "1", name: "React", level: 9 },
  { id: "2", name: "TypeScript", level: 8 },
  { id: "3", name: "Node.js", level: 7 },
  { id: "4", name: "CSS/Tailwind", level: 8 },
  { id: "5", name: "Python", level: 6 },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("main");
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Create animated particles effect (same as landing page)
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
          className="fixed inset-0 z-0"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Background grid pattern */}
        <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Animated gradient overlay */}
        <div className="fixed inset-0 z-0 opacity-30 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 animate-gradient-shift" 
             style={{ animationDuration: '20s' }} />
        
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-40" />
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 to-transparent opacity-30" />
          
          <div className="absolute left-[10%] top-[20%] w-32 h-32 bg-primary/20 rounded-lg rotate-45 blur-sm animate-pulse" 
               style={{ animationDuration: '7s' }} />
          <div className="absolute right-[15%] top-[15%] w-40 h-40 bg-primary/15 rounded-full blur-xl animate-pulse" 
               style={{ animationDuration: '10s' }} />
          <div className="absolute left-[20%] bottom-[25%] w-48 h-48 bg-primary/20 rounded-full blur-2xl animate-pulse" 
               style={{ animationDuration: '8s' }} />
          <div className="absolute right-[25%] bottom-[20%] w-36 h-36 bg-primary/20 rounded-lg rotate-12 blur-sm animate-pulse" 
               style={{ animationDuration: '9s' }} />
          
          <div className="absolute left-[5%] top-[40%] w-24 h-24 bg-primary/20 rotate-[30deg] clip-path-hexagon blur-sm animate-pulse" 
               style={{ animationDuration: '12s' }} />
          <div className="absolute right-[8%] top-[60%] w-28 h-28 bg-primary/20 rotate-[45deg] clip-path-hexagon blur-md animate-pulse" 
               style={{ animationDuration: '11s' }} />
          
          <div className="absolute left-1/4 -top-1/4 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '15s' }} />
          <div className="absolute -right-1/4 bottom-1/4 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '13s' }} />
          
          <div className="absolute left-[40%] top-[30%] w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse" 
               style={{ animationDuration: '9s' }} />
          <div className="absolute right-[30%] top-[40%] w-20 h-20 bg-blue-500/10 rotate-45 rounded-lg blur-md animate-pulse" 
               style={{ animationDuration: '12s' }} />
          <div className="absolute left-[65%] top-[60%] w-16 h-16 bg-violet-500/10 rounded-full blur-lg animate-pulse" 
               style={{ animationDuration: '10s' }} />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:20px_20px] opacity-50" />
        </div>

        {/* Navbar - Same as landing page */}
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
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-primary/15 text-primary/90 hover:text-primary flex items-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Home
              </button>
              
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
        <div className="flex-1 relative z-10 flex pt-20">
          {/* Sidebar - Fixed on left */}
          <aside className="fixed left-0 top-20 bottom-0 w-64 px-6 py-6 overflow-y-auto">
            <ProfileSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </aside>
          
          {/* Main Content Area - Scrollable, with left margin for sidebar */}
          <div className="flex-1 ml-64 px-6 pr-12 py-6">
            <div className="max-w-4xl">
              {activeTab === "main" && (
                <MainProfile initialData={mockUserData} />
              )}
              
              {activeTab === "projects" && (
                <ProjectsView initialProjects={mockProjects} />
              )}
              
              {activeTab === "achievements" && (
                <AchievementsView initialAchievements={mockAchievements} />
              )}
              
              {activeTab === "skills" && (
                <SkillsView initialSkills={mockSkills} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;