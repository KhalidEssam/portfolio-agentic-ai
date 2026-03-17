# AI Portfolio SPA

A modern, responsive portfolio website with an embedded AI chatbot powered by Google Gemini API. The chatbot answers questions about the portfolio owner using RAG-style grounding without a vector database.

## Features

- **Modern SPA** built with Next.js 14 + TypeScript + Tailwind CSS
- **AI Chat Widget** — floating chatbot that answers questions about your experience, skills, projects, and more
- **Dark/Light mode** with system preference detection
- **Mobile-first responsive design**
- **Serverless API proxy** — API key never exposed to the client
- **Rate limiting** and abuse protection
- **Sections**: Hero, About, Skills, Projects, Experience timeline, Contact, Footer

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **AI**: Google Gemini API (free tier, `gemini-2.0-flash`)
- **Deployment**: Vercel (recommended) or any Node.js host

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Google Gemini API key](https://aistudio.google.com/apikey) (free tier)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd ai-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Customization

1. **Edit `src/data/profileData.json`** — Replace all placeholder data with your real information (name, skills, experience, projects, etc.)
2. **Add an avatar** — Place your photo at `public/avatar.png` (optional, initials are shown by default)
3. **Update colors** — Modify `tailwind.config.ts` to change the color scheme

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add `GEMINI_API_KEY` in the Environment Variables section
4. Deploy — Vercel auto-detects Next.js

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and import the repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add `GEMINI_API_KEY` in Environment Variables
6. Install the `@netlify/plugin-nextjs` plugin

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    # Gemini API proxy (serverless)
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page
├── components/
│   ├── Navbar.tsx            # Navigation with dark mode toggle
│   ├── Hero.tsx              # Hero section
│   ├── About.tsx             # About section
│   ├── Skills.tsx            # Skills grid
│   ├── Projects.tsx          # Projects showcase
│   ├── Experience.tsx        # Experience timeline + education
│   ├── Contact.tsx           # Contact info
│   ├── Footer.tsx            # Footer
│   └── ChatWidget.tsx        # AI chat widget
├── data/
│   └── profileData.json      # Your profile data (edit this!)
└── lib/
    └── profileLoader.ts      # Profile data loader + system prompt builder
```

## How the AI Works

1. The chat widget sends user messages to `/api/chat` (server-side API route)
2. The API route loads `profileData.json` and constructs a system prompt with all your data
3. The system prompt instructs Gemini to ONLY answer using the provided data
4. Gemini responds in first person as the portfolio owner
5. If asked about something not in the data, it says it doesn't have that information

## License

MIT
