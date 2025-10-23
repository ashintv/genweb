import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Achievement {
  id?: string;
  title: string;
  description: string;
  date: string;
}

interface AchievementsViewProps {
  initialAchievements?: Achievement[];
}

const AchievementsView: React.FC<AchievementsViewProps> = ({ initialAchievements = [] }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Achievement>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing achievement
      setAchievements((prev) =>
        prev.map((achievement) =>
          achievement.id === editingId ? { ...formData, id: editingId } : achievement
        )
      );
      setEditingId(null);
    } else {
      // Add new achievement
      setAchievements((prev) => [
        ...prev,
        { ...formData, id: `achievement-${Date.now()}` },
      ]);
    }

    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsAddingNew(false);
  };

  const startEditing = (achievement: Achievement) => {
    setFormData(achievement);
    setEditingId(achievement.id || null);
    setIsAddingNew(true);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    setAchievements((prev) => prev.filter((achievement) => achievement.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  // Sort achievements by date, newest first
  const sortedAchievements = [...achievements].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return { month, year };
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-primary tracking-tight">Achievements & Milestones</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full"></div>
            <p className="text-sm text-foreground/60">{achievements.length} milestone{achievements.length !== 1 ? 's' : ''} reached</p>
          </div>
        </div>
        {!isAddingNew && (
          <Button 
            onClick={() => setIsAddingNew(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"></path>
              <circle cx="12" cy="8" r="7"></circle>
            </svg>
            Add Achievement
          </Button>
        )}
      </div>

      {isAddingNew ? (
        <Card className="bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-primary">{editingId ? "Edit Achievement" : "Add New Achievement"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-primary/90">
                  Achievement Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Award or Recognition"
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-primary/90">
                  Date
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                  required
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
                  placeholder="Describe your achievement"
                  rows={4}
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
                className="bg-white/10 backdrop-blur-lg border-white/30 hover:bg-white/20"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90"
              >
                {editingId ? "Update Achievement" : "Add Achievement"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="relative">
          {sortedAchievements.length === 0 ? (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]"></div>
              <div className="relative text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                  <svg className="w-10 h-10 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"></path>
                    <circle cx="12" cy="8" r="7"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">No achievements yet</h3>
                <p className="text-foreground/60 max-w-md mx-auto">
                  Start documenting your journey by adding your achievements and milestones.
                </p>
                <Button 
                  onClick={() => setIsAddingNew(true)}
                  className="mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Add Your First Achievement
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative pl-8 md:pl-12">
              {/* Vertical Timeline Line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
              
              {/* Achievement Items */}
              <div className="space-y-8">
                {sortedAchievements.map((achievement, index) => {
                  const { month, year } = formatDate(achievement.date);
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={achievement.id}
                      className="group relative"
                    >
                      {/* Timeline Node */}
                      <div className="absolute -left-[26px] md:-left-[34px] top-6 z-10">
                        <div className="relative">
                          {/* Outer glow ring */}
                          <div className="absolute inset-0 rounded-full bg-primary/30 blur-md group-hover:bg-primary/50 transition-all duration-300"></div>
                          {/* Node circle */}
                          <div className="relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-primary to-primary/70 border-4 border-background shadow-lg group-hover:scale-125 transition-transform duration-300">
                            <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping"></div>
                          </div>
                        </div>
                      </div>

                      {/* Achievement Card */}
                      <div className="relative">
                        {/* Connector Line */}
                        <div className="absolute -left-[21px] md:-left-[29px] top-8 w-6 md:w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 group-hover:from-primary group-hover:to-primary/40 transition-all duration-300"></div>
                        
                        <Card className="relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 hover:border-primary/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                          {/* Decorative gradient bar */}
                          <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-1 h-full bg-gradient-to-b from-primary via-primary/70 to-primary/30`}></div>
                          
                          {/* Date Badge */}
                          <div className="absolute top-4 right-4 flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 backdrop-blur-sm">
                            <span className="text-xs font-semibold text-primary/80 uppercase">{month}</span>
                            <span className="text-lg font-bold text-primary leading-none">{year}</span>
                          </div>

                          <CardHeader className="pr-24">
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-inner border border-primary/20">
                                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                              </div>
                              
                              {/* Title */}
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors line-clamp-2">
                                  {achievement.title}
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pt-0">
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {achievement.description}
                            </p>
                          </CardContent>

                          {/* Action Buttons - Hidden by default, shown on hover */}
                          <CardFooter className="pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-2 w-full">
                              <button
                                onClick={() => startEditing(achievement)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-primary/80 hover:text-primary text-sm font-medium transition-all duration-300"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(achievement.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-300"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Delete
                              </button>
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsView;