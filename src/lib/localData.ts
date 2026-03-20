export type LocalProject = {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    image_url: string | null;
    live_url: string | null;
    github_url: string | null;
    category: string;
    display_order: number;
    created_at: string;
    updated_at: string;
};

export type LocalContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
};

export type LocalProjectInput = {
    title: string;
    description: string;
    tech_stack: string[];
    image_url: string | null;
    live_url: string | null;
    github_url: string | null;
    category: string;
    display_order: number;
};

const PROJECTS_KEY = "portfolio_projects";
const MESSAGES_KEY = "portfolio_contact_messages";

const fallbackProjects: LocalProject[] = [
    {
        id: "project-1",
        title: "Sistema de Seguimiento de Suscripciones",
        description:
            "API de gestión de suscripciones que ayuda a usuarios a evitar cobros sorpresa y tomar mejores decisiones financieras, centralizando sus pagos recurrentes, mostrando renovaciones próximas y enviando recordatorios automáticos antes de cada cargo.",
        tech_stack: [
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
            "JWT",
            "Arcjet",
            "Upstash",
            "Resend",
            "Swagger",
        ],
        image_url: "/subscription-tracker-api.png",
        live_url: "https://subscription-tracker-api-jpnp.onrender.com/api-docs",
        github_url: "https://github.com/felixcamilo/Subscription-Tracker-API",
        category: "Backend",
        display_order: 1,
        created_at: "2026-01-01T10:00:00.000Z",
        updated_at: "2026-01-01T10:00:00.000Z",
    },

    {
        id: "project-2",
        title: "Plataforma de Videoconferencias",
        description:
            "Plataforma web de videollamadas estilo Google Meet/Zoom, creada con Next.js y React, que facilita reuniones remotas estables, interacción en tiempo real y colaboración distribuida, maximizando la eficiencia de equipos que trabajan a distancia.",
        tech_stack: [
            "Next.js",
            "React",
            "TypeScript",
            "PostgreSQL",
        ],
        image_url: "/yoom-app.png",
        live_url: "https://zoom-clone-peach-sigma.vercel.app/",
        github_url: "https://github.com/felixcamilo/Video-Conferencing-App",
        category: "FullStack",
        display_order: 2,
        created_at: "2026-01-01T10:00:00.000Z",
        updated_at: "2026-01-01T10:00:00.000Z",
    },
];

function getId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function readFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) {
        window.localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
    }

    try {
        return JSON.parse(raw) as T;
    } catch {
        window.localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
    }
}

function writeToStorage<T>(key: string, value: T) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProjects(): LocalProject[] {
    return readFromStorage(PROJECTS_KEY, fallbackProjects)
        .slice()
        .sort((a, b) => a.display_order - b.display_order);
}

export function upsertProject(project: LocalProjectInput, existingId?: string): LocalProject {
    const projects = readFromStorage<LocalProject[]>(PROJECTS_KEY, fallbackProjects);
    const now = new Date().toISOString();

    if (existingId) {
        const idx = projects.findIndex((item) => item.id === existingId);
        if (idx === -1) {
            throw new Error("Project not found");
        }

        const updated: LocalProject = {
            ...projects[idx],
            ...project,
            updated_at: now,
        };
        projects[idx] = updated;
        writeToStorage(PROJECTS_KEY, projects);
        return updated;
    }

    const created: LocalProject = {
        id: getId(),
        ...project,
        created_at: now,
        updated_at: now,
    };

    projects.push(created);
    writeToStorage(PROJECTS_KEY, projects);
    return created;
}

export function deleteProject(id: string) {
    const projects = readFromStorage<LocalProject[]>(PROJECTS_KEY, fallbackProjects);
    const next = projects.filter((item) => item.id !== id);
    writeToStorage(PROJECTS_KEY, next);
}

export function getMessages(): LocalContactMessage[] {
    return readFromStorage<LocalContactMessage[]>(MESSAGES_KEY, [])
        .slice()
        .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
}

export function addMessage(payload: Omit<LocalContactMessage, "id" | "is_read" | "created_at">) {
    const messages = readFromStorage<LocalContactMessage[]>(MESSAGES_KEY, []);
    const created: LocalContactMessage = {
        id: getId(),
        name: payload.name,
        email: payload.email,
        message: payload.message,
        is_read: false,
        created_at: new Date().toISOString(),
    };
    messages.push(created);
    writeToStorage(MESSAGES_KEY, messages);
    return created;
}

export function setMessageRead(id: string, is_read: boolean) {
    const messages = readFromStorage<LocalContactMessage[]>(MESSAGES_KEY, []);
    const idx = messages.findIndex((item) => item.id === id);
    if (idx === -1) return;

    messages[idx] = {
        ...messages[idx],
        is_read,
    };

    writeToStorage(MESSAGES_KEY, messages);
}

export function deleteMessage(id: string) {
    const messages = readFromStorage<LocalContactMessage[]>(MESSAGES_KEY, []);
    const next = messages.filter((item) => item.id !== id);
    writeToStorage(MESSAGES_KEY, next);
}
