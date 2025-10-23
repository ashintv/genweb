import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MainProfileProps {
  initialData?: {
    name: string;
    avatar: string;
    description: string;
  };
}

const MainProfile: React.FC<MainProfileProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      avatar: "",
      description: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log("Submitting profile data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Profile</h2>
        {!isEditing && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="bg-white/10 backdrop-blur-lg border-white/30 hover:bg-white/20"
          >
            Edit Profile
          </Button>
        )}
      </div>

      <Card className="w-full overflow-hidden bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        {!isEditing ? (
          <div className="grid md:grid-cols-2 min-h-[400px]">
            {/* Left Container - Name and Description */}
            <div className="p-10 flex flex-col justify-center space-y-8 bg-gradient-to-br from-white/5 to-transparent">
              {/* Name Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold text-primary leading-tight">
                    {formData.name || "Your Name"}
                  </h1>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full"></div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary/60 flex items-center gap-2">
                  <span className="w-8 h-px bg-primary/40"></span>
                  About Me
                </h3>
                <p className="text-lg text-foreground/85 leading-relaxed font-light">
                  {formData.description || "Add a description about yourself to showcase your expertise and personality. This is your space to shine!"}
                </p>
              </div>
            </div>

            {/* Right Container - Profile Image */}
            <div className="relative p-10 flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary/15 blur-3xl"></div>
              </div>

              {/* Profile Image */}
              <div className="relative z-10 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/40 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative w-72 h-72 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/40 shadow-2xl">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt={formData.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
                      <svg className="w-36 h-36 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-primary">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-primary/90">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="avatar" className="text-sm font-medium text-primary/90">
                  Avatar URL
                </label>
                <Input
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-primary/90">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={5}
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="bg-white/10 backdrop-blur-lg border-white/30 hover:bg-white/20"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default MainProfile;