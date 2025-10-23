import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id?: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

interface ProjectsViewProps {
  initialProjects?: Project[];
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: "",
    image: "",
    description: "",
    link: "",
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
      // Update existing project
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingId ? { ...formData, id: editingId } : project
        )
      );
      setEditingId(null);
    } else {
      // Add new project
      setProjects((prev) => [
        ...prev,
        { ...formData, id: `project-${Date.now()}` },
      ]);
    }

    setFormData({
      title: "",
      image: "",
      description: "",
      link: "",
    });
    setIsAddingNew(false);
  };

  const startEditing = (project: Project) => {
    setFormData(project);
    setEditingId(project.id || null);
    setIsAddingNew(true);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      description: "",
      link: "",
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-primary tracking-tight">Projects</h2>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full"></div>
            <p className="text-sm text-foreground/60">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</p>
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
            New Project
          </Button>
        )}
      </div>

      {isAddingNew ? (
        <Card className="bg-white/15 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-primary">{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-primary/90">
                  Project Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Project"
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium text-primary/90">
                  Project Image URL
                </label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/project-image.jpg"
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
                  placeholder="Describe your project"
                  rows={3}
                  className="bg-white/10 border-white/30 backdrop-blur-lg focus:bg-white/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="link" className="text-sm font-medium text-primary/90">
                  Project Link
                </label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername/project"
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
                {editingId ? "Update Project" : "Add Project"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]"></div>
                <div className="relative text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <svg className="w-10 h-10 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                      <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                      <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary">No projects yet</h3>
                  <p className="text-foreground/60 max-w-md mx-auto">
                    Start showcasing your work by adding your first project. Share what you've built with the world.
                  </p>
                  <Button 
                    onClick={() => setIsAddingNew(true)}
                    className="mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Add Your First Project
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            projects.map((project) => (
              <Card 
                key={project.id}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Section with Overlay */}
                <div className="relative aspect-video w-full bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl"></div>
                        <svg className="relative w-16 h-16 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => startEditing(project)}
                      className="p-2 rounded-lg bg-white/90 hover:bg-white text-primary backdrop-blur-sm shadow-lg transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white backdrop-blur-sm shadow-lg transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <CardHeader className="space-y-3 pb-3">
                  <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors line-clamp-1">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary/70 hover:text-primary transition-colors truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.link.replace(/^https?:\/\//, '')}
                    </a>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </CardContent>

                {/* Footer with Visit Link */}
                <CardFooter className="pt-4 border-t border-white/10">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-primary/80 hover:text-primary text-sm font-medium transition-all duration-300 group/link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Project
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsView;