import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addMessage } from "@/lib/localData";
import { z } from "zod";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  message: z.string().trim().min(1, "El mensaje es obligatorio").max(2000),
});

export function ContactSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Error de validación", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Save to local backup
      addMessage({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      });

      // Send real email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: parsed.data.name,
          from_email: parsed.data.email,
          message: parsed.data.message,
          to_email: "alejandrocamilojavier5@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({ title: "¡Mensaje enviado!", description: "Gracias por escribirme. Te responderé pronto." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Error", description: "No se pudo enviar el mensaje. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">Contacto</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ponte en contacto
          </h2>
          <p className="text-muted-foreground mb-10">
            ¿Quieres ofrecerme algun empleo, tienes un proyecto en mente o simplemente quieres saludar? Envíame un mensaje.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre"
                required
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
                required
                maxLength={255}
              />
            </div>
            <div>
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Cuéntame sobre tu proyecto..."
                rows={5}
                required
                maxLength={2000}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Enviando..." : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Enviar Mensaje
                </>
              )}
            </Button>
          </form>

          <div className="flex justify-center gap-4 mt-12">
            <Button asChild variant="ghost" size="icon">
              <a href="https://github.com/felixcamilo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href="https://www.linkedin.com/in/felix-alejandro-camilo-javier-728aab229" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href="https://x.com/alejandr0camilo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
