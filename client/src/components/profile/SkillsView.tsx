import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Skill {
  id?: string;
  name: string;
  level: number;
}

interface SkillsViewProps {
  initialSkills?: Skill[];
}

const SkillsView: React.FC<SkillsViewProps> = ({ initialSkills = [] }) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Skill>({
    name: "",
    level: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing skill
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === editingId ? { ...formData, id: editingId } : skill
        )
      );
      setEditingId(null);
    } else {
      // Add new skill
      setSkills((prev) => [
        ...prev,
        { ...formData, id: `skill-${Date.now()}` },
      ]);
    }

    setFormData({
      name: "",
      level: 5,
    });
    setIsAddingNew(false);
  };

  const startEditing = (skill: Skill) => {
    setFormData(skill);
    setEditingId(skill.id || null);
    setIsAddingNew(true);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      level: 5,
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  // Sort skills by level, highest first
  const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

  // Categorize skills by level
  const expertSkills = sortedSkills.filter(s => s.level >= 8);
  const intermediateSkills = sortedSkills.filter(s => s.level >= 5 && s.level < 8);
  const beginnerSkills = sortedSkills.filter(s => s.level < 5);

  const getSkillColor = (level: number) => {
    if (level >= 8) return 'from-emerald-500 to-green-600';
    if (level >= 5) return 'from-blue-500 to-cyan-600';
    return 'from-amber-500 to-orange-600';
  };

  const getSkillBgColor = (level: number) => {
    if (level >= 8) return 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20';
    if (level >= 5) return 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20';
    return 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20';
  };

  const getSkillTextColor = (level: number) => {
    if (level >= 8) return 'text-emerald-400';
    if (level >= 5) return 'text-blue-400';
    return 'text-amber-400';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-primary tracking-tight">Skills & Expertise</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full"></div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-foreground/60">{expertSkills.length} Expert</span>
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-foreground/60">{intermediateSkills.length} Intermediate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-foreground/60">{beginnerSkills.length} Learning</span>
              </span>
            </div>
          </div>
        </div>
        {!isAddingNew && (
          <Button 
            onClick={() => setIsAddingNew(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Skill
          </Button>
        )}
      </div>

      {isAddingNew ? (
        <Card className="bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-primary">{editingId ? "Edit Skill" : "Add New Skill"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-primary/90">
                  Skill Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Python, etc."
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="level" className="text-sm font-medium text-primary/90">
                  Proficiency Level (1-10): {formData.level}
                </label>
                <Input
                  id="level"
                  name="level"
                  type="range"
                  min="1"
                  max="10"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                <div className="flex justify-between text-xs text-primary/60">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
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
                {editingId ? "Update Skill" : "Add Skill"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="space-y-8">
          {sortedSkills.length === 0 ? (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]"></div>
              <div className="relative text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                  <svg className="w-10 h-10 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">No skills added yet</h3>
                <p className="text-foreground/60 max-w-md mx-auto">
                  Showcase your expertise by adding your technical and professional skills.
                </p>
                <Button 
                  onClick={() => setIsAddingNew(true)}
                  className="mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Add Your First Skill
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Expert Skills */}
              {expertSkills.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
                      <h3 className="text-lg font-bold text-emerald-400">Expert Level</h3>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
                    <span className="text-xs text-foreground/50 font-medium">{expertSkills.length} skills</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {expertSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
                        <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 backdrop-blur-sm transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-emerald-300">{skill.name}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(Math.floor(skill.level / 2))].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(skill)}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Intermediate Skills */}
              {intermediateSkills.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                      <h3 className="text-lg font-bold text-blue-400">Intermediate Level</h3>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent"></div>
                    <span className="text-xs text-foreground/50 font-medium">{intermediateSkills.length} skills</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {intermediateSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
                        <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 backdrop-blur-sm transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-blue-300">{skill.name}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(Math.floor(skill.level / 2))].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(skill)}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-300 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Beginner Skills */}
              {beginnerSkills.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></div>
                      <h3 className="text-lg font-bold text-amber-400">Learning</h3>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent"></div>
                    <span className="text-xs text-foreground/50 font-medium">{beginnerSkills.length} skills</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {beginnerSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
                        <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 backdrop-blur-sm transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-amber-300">{skill.name}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(Math.floor(skill.level / 2))].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(skill)}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsView;