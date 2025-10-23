import React from "react";
import { cn } from "@/lib/utils";

// Icons for the sidebar - using simpler, cleaner icons
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
  </svg>
);

const AchievementIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"></path>
    <circle cx="12" cy="8" r="7"></circle>
  </svg>
);

const SkillIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
  </svg>
);

type ProfileTab = "main" | "projects" | "achievements" | "skills";

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
  className?: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  setActiveTab,
  className,
}) => {
  return (
    <aside
      className={cn(
        "flex flex-col h-full",
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="mb-8 pb-6 border-b border-white/10">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
          Profile
        </h2>
        <p className="text-sm text-foreground/60">
          Manage your information
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <SidebarItem
          icon={<UserIcon />}
          label="Profile"
          active={activeTab === "main"}
          onClick={() => setActiveTab("main")}
        />
        <SidebarItem
          icon={<ProjectIcon />}
          label="Projects"
          active={activeTab === "projects"}
          onClick={() => setActiveTab("projects")}
        />
        <SidebarItem
          icon={<AchievementIcon />}
          label="Achievements"
          active={activeTab === "achievements"}
          onClick={() => setActiveTab("achievements")}
        />
        <SidebarItem
          icon={<SkillIcon />}
          label="Skills"
          active={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
        />
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <p className="text-xs text-foreground/70 leading-relaxed">
            Keep your profile updated to showcase your latest achievements and projects.
          </p>
        </div>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200",
        "text-sm font-medium",
        active 
          ? "bg-primary/20 text-primary shadow-sm" 
          : "text-foreground/70 hover:bg-white/10 hover:text-primary"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
};

export default ProfileSidebar;