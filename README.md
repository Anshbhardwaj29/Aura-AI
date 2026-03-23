# Aura AI - The Autonomous Academic Research Swarm 🧠

Aura AI is an advanced, fully-autonomous Agentic platform designed exclusively for PhD researchers and students. It fully automates the academic lifecycle—from live internet scraping (Deep Crawl) to indexing validation (Scopus/Web of Science), vector database generation, and ultimately drafting rigorously formatted IEEE or Springer methodologies using autonomous agents.

## 🚀 Key Features
- **Intelligent Research Swarm**: 5 Specialized asynchronous agents working in tandem.
- **Deep Crawl Protocol**: Live-scrapes targets across Google Scholar and related hubs.
- **Indexing Verifier**: Cross-checks DOIs against rigorous OpenAlex and Scopus APIs.
- **Vector Database Manager**: Isolated, high-dimensional contextual embeddings per project.
- **Automated LaTeX Drafter**: Formats directly into compliant IEEE standard structures.
- **Hover Validation**: Autonomous checks for passive voice and citation integrity.

## 🏗 Project Architecture (Feature-Sliced Design)
This project is built on modern **React 19** + **Vite**, scaled utilizing an Enterprise-grade Feature-Sliced Design (FSD) directory structure combined with the revolutionary **Tailwind CSS v4** and **Framer Motion**.

```text
src/
├── app/               # Application-level settings (Providers, Routers, main.jsx)
├── components/        # Shared components (Navbar, Footer, generic theme wrappers)
│   └── ui/            # UI Primitives (Buttons, Cards, Badges)
├── features/          # Feature-sliced modules (Isolated domains)
│   └── home/
│       └── components/# HeroAgentVisualizer, InteractivePrompt, Workflow timelines
├── layouts/           # High-level responsive route wrappers (MainLayout.jsx)
├── lib/               # Utility functions and helper classes
├── pages/             # Route endpoints (Home.jsx)
└── index.css          # Semantic Global Aura-Themed CSS mappings
```

## 🛠 Setup & Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd "Aura AI"
```

### 2. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then execute:
```bash
npm install
```
*(Core dependencies include: `react-router-dom`, `framer-motion`, `lucide-react`, `tailwindcss`)*

### 3. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser to interact with the full Animated Agent Visualizer and the entire Aura AI platform!

## 🌑 Theming System
Aura AI automatically supports strict dynamic **Dark** and **Light** modes utilizing embedded Tailwind CSS semantic variables (`--background`, `--aura-primary`) and `localStorage` persistence. The entire UI shifts dynamically through the dedicated `<ThemeProvider>` architecture.

---
*Built for rigorous academic production.*
