# Aura AI - The Autonomous Academic Research Swarm 🧠

## 📖 About the Project
**Aura AI** is a state-of-the-art, fully **autonomous Agentic Research Platform** engineered specifically for PhD scholars, research scientists, and academic institutions. The traditional academic research lifecycle is often plagued by hundreds of hours spent on manual literature scraping, cross-referencing source validity, managing citations, and formatting complex manuscripts. Aura AI eliminates these critical bottlenecks by introducing an intelligent "research swarm" that handles the heavy lifting, allowing researchers to focus entirely on innovation, hypothesis generation, and critical analysis.

At the core of Aura AI is a multi-agent orchestration architecture. It relies on 5 specialized asynchronous AI agents—**the** **Scraper**, **Verifier**, **Summarizer**, **Architect**, and **Drafter**—that work in tandem to execute deep, fully automated research crawls. When a user defines a research topic or query, the swarm autonomously scans top-tier academic directories like Google Scholar, PubMed, and Web of Science. It goes far beyond simple keyword matching by employing isolated, high-dimensional vector embeddings and a powerful Retrieval-Augmented Generation (RAG) system to extract highly relevant, contextual data with pinpoint precision.

Furthermore, Aura AI is built to enforce the utmost standard of academic integrity through its **Verified** **Indexing** **Shield**. Every extracted source is validated in real-time via rigorous cross-checks against OpenAlex and Scopus APIs, guaranteeing that only high-impact, peer-reviewed literature is utilized.

Finally, once the data is analyzed and summarized, Aura AI takes the ultimate leap by autonomously drafting the findings into meticulously formatted LaTeX manuscripts. Compliant with strict publisher guidelines (such as IEEE, Springer, and Nature standards), this platform is not just a standard AI tool—it is an untiring, highly intelligent research assistant built for rigorous, end-to-end academic production.

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
Aura-AI/
├── public/                 # Static assets that don't need processing
├── src/                    # Source code for the application
│   ├── app/                # Main application setup files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── assets/             # Images, icons, and other static assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/         # Reusable or shared global components
│   │   ├── ui/             # Generic UI components (e.g., buttons, cards)
│   │   │   ├── InteractiveChatbox.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   └── card.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── theme-provider.jsx
│   │   └── theme-toggle.jsx
│   ├── features/           # Feature-based grouped components
│   │   ├── auth/
│   │   │   └── components/
│   │   │       └── AuthModal.jsx
│   │   └── home/
│   │       └── components/
│   │           ├── CTASection.jsx
│   │           ├── ComparisonSection.jsx
│   │           ├── HeroAgentVisualizer.jsx
│   │           ├── HeroSection.jsx
│   │           └── WorkflowSection.jsx
│   ├── layouts/            # Page layouts
│   │   └── MainLayout.jsx
│   ├── lib/                # Utility and helper functions
│   │   └── utils.js
│   ├── pages/              # Main view components/pages
│   │   └── Home.jsx
│   └── index.css           # Global CSS styles
├── .gitignore              # Files and folders ignored by git
├── eslint.config.js        # ESLint configuration and rules
├── index.html              # Main HTML entry point
├── jsconfig.json           # JS configuration (e.g., path aliases)
├── package-lock.json       # Exact dependency versions
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
└── vite.config.js          # Vite bundler configuration
```

## 🛠 Setup & Installation Guide
Follow these steps to configure the Aura AI environment on your local machine.

### 1. Environment Prerequisites
Aura AI requires a stable Node.js runtime.

**Download**: Install the LTS version from [nodejs.org](https://nodejs.org/).

**Verify Installation**: Ensure your environment is ready by running:
```bash
node -v  # Recommended: v18.0.0 or higher
npm -v   # Recommended: v9.0.0 or higher
```

### 2. Clone & Initialize
```bash
# Clone your private repository
git clone <your-repository-url>
cd "Aura AI"

# Install enterprise-grade dependencies
npm install
```
*(Key dependencies: React 19, Framer Motion, Lucide React, and Tailwind CSS v4.)*

### 3. Configure Environment Variables
Since this is a proprietary platform, you must set up your private API keys. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_FIRECRAWL_API_KEY=your_api_key
```

### 4. Launch the Platform
```bash
# Start the local development server
npm run dev
```
Navigate to `http://localhost:5173` in your browser to interact with the Animated Agent Visualizer and the full Research Workspace.

## 🌑 Intelligent Theming System
Aura AI features a sophisticated, dynamic theming architecture:

- **Adaptive Modes**: Full support for Dark and Light modes using Tailwind CSS semantic variables (`--background`, `--aura-primary`).
- **Persistence**: User preferences are automatically saved via `localStorage` and managed through a dedicated `<ThemeProvider>`.
- **Visualizer**: The UI theme dynamically adjusts to highlight active agent states during the research crawl.

*Built for rigorous academic production.*

## ⚖️ License & Confidentiality
**Copyright © 2026 Aura AI. All Rights Reserved.**

This software is Proprietary and Confidential. No part of this project may be reproduced or distributed without prior written permission.
