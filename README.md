# Aura AI - The Autonomous Academic Research Swarm 🧠

Aura AI is an advanced, fully-autonomous Agentic Research Platform designed exclusively for PhD scholars, researchers, and academic institutions. It automates the entire academic lifecycle—from real-time internet scraping and indexing validation to drafting rigorously formatted manuscripts in IEEE or Springer standards.

## 🚀 Key Features
- **Intelligent Research Swarm**: Orchestrates 5 specialized asynchronous agents (Scraper, Verifier, Summarizer, Architect, and Drafter) to handle complex academic workflows.
- **Deep Crawl Protocol**: Real-time extraction from Google Scholar, Web of Science, and PubMed (targeting top 50 relevant papers).
- **Verified Indexing Shield**: Automates DOI cross-checks against OpenAlex and Scopus APIs to ensure only peer-reviewed, high-impact data is utilized.
- **Vector Database Manager**: Project-isolated, high-dimensional contextual embeddings for high-precision RAG (Retrieval-Augmented Generation).
- **Automated LaTeX Drafter**: Direct formatting into compliant IEEE, Springer, and Nature standard structures.
- **Hover Validation Agent**: Real-time autonomous checks for research integrity, citation accuracy, and passive voice optimization.

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

🛠 Setup & Installation Guide
Follow these steps to configure the Aura AI environment on your local machine.

1. Environment Prerequisites
Aura AI requires a stable Node.js runtime.

Download: Install the LTS version from nodejs.org.

Verify Installation: Ensure your environment is ready by running:

Bash
node -v  # Recommended: v18.0.0 or higher
npm -v   # Recommended: v9.0.0 or higher
2. Clone & Initialize
Bash
# Clone your private repository
git clone <your-repository-url>
cd "Aura AI"

# Install enterprise-grade dependencies
npm install
(Key dependencies: React 19, Framer Motion, Lucide React, and Tailwind CSS v4.)

3. Configure Environment Variables
Since this is a proprietary platform, you must set up your private API keys. Create a .env file in the root directory:

Code snippet
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_FIRECRAWL_API_KEY=your_api_key
4. Launch the Platform
Bash
# Start the local development server
npm run dev
Navigate to http://localhost:5173 in your browser to interact with the Animated Agent Visualizer and the full Research Workspace.

🌑 Intelligent Theming System
Aura AI features a sophisticated, dynamic theming architecture:

Adaptive Modes: Full support for Dark and Light modes using Tailwind CSS semantic variables (--background, --aura-primary).

Persistence: User preferences are automatically saved via localStorage and managed through a dedicated <ThemeProvider>.

Visualizer: The UI theme dynamically adjusts to highlight active agent states during the research crawl.

Built for rigorous academic production.

⚖️ License & Confidentiality
Copyright © 2026 Aura AI. All Rights Reserved.
This software is Proprietary and Confidential. No part of this project may be reproduced or distributed without prior written permission.
