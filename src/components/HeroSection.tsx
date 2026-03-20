import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
        >
          Ingeniero de Software Backend
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
        >
          Creando experiencias
          <br />
          digitales que
          <br />
          <span className="text-muted-foreground">importan.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-lg mx-auto mb-10"
        >
          Planifico, diseño, construyo y despliego sistemas escalables y de alto rendimiento con tecnologías modernas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-4 justify-center"
        >
          <Button asChild size="lg">
            <a href="#projects">Ver Proyectos</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Contáctame</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20"
        >
          <a href="#about" className="inline-block animate-bounce">
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
