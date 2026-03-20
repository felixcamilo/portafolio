export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Felix Camilo. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a href="https://github.com/felixcamilo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/felix-alejandro-camilo-javier-728aab229" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
          <a href="https://x.com/alejandr0camilo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
