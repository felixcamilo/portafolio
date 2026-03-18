import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getProjects, type LocalProject } from "@/lib/localData";

type Project = LocalProject;

const categories = ["Todos", "Frontend", "Backend", "Full Stack"];

export function ProjectsSection() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => getProjects(),
  });

  return (
    <section id="projects" className="py-32 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">Trabajo</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Proyectos Seleccionados
          </h2>
        </motion.div>

        <Tabs defaultValue="Todos">
          <TabsList className="mb-8">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              {isLoading ? (
                <p className="text-muted-foreground text-center py-12">Cargando proyectos...</p>
              ) : (
                <ProjectGrid
                  projects={cat === "Todos" ? projects : projects.filter((p) => p.category === cat)}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>

        {!isLoading && projects.length === 0 && (
          <p className="text-muted-foreground text-center py-12">
            Aún no hay proyectos. Agrega algunos desde el panel de administración.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No hay proyectos en esta categoría.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <Card className="overflow-hidden group hover:shadow-md transition-shadow">
            {project.image_url && (
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech_stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                {project.live_url && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> Demo
                    </a>
                  </Button>
                )}
                {project.github_url && (
                  <Button asChild variant="ghost" size="sm">
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5 mr-1" /> Código
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
