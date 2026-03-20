import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const skills = [
  "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS",
  "Next.js", "Python", "Docker", "AWS", "GraphQL", "Git", "REST APIs",
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">Sobre mí</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Un poco sobre mí
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
            <p>
              Backend Engineer enfocado en construir sistemas escalables, APIs robustas y lógica de negocio eficiente.

              Experiencia en bases de datos, decisiones técnicas alineadas al negocio y prácticas DevOps (Docker, CI/CD) para garantizar sistemas resilientes y de alto rendimiento.
            </p>
            <p>
              Disfruto trabajar en equipo con tecnologías modernas y siempre estoy dispuesto a aprender nuevas herramientas y frameworks
              que me ayuden a entregar mejores productos.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-4">Stack Tecnológico</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
