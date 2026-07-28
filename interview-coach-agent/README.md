# AI Interview Coach Agent - AgentVerse Grand Challenge 2026

A mock interview coach platform built using Next.js 16 (App Router), TypeScript, Tailwind CSS, and the Groq Client SDK.

## Reorganized Scalable Architecture

The codebase follows the recommended Next.js 16 and TypeScript modular structure to separate UI, custom hooks, business logic, prompts, and API routes:

```text
interview-agent/
│
├── app/                        # Next.js 16 App Router Routing & Layouts
│   ├── api/
│   │   └── interview/
│   │       └── route.ts        # Chat session API handling Groq LLM logic
│   ├── interview/
│   │   └── page.tsx            # Main interview workspace UI page
│   ├── layout.tsx              # Root HTML wrapper and font configurations
│   ├── page.tsx                # Welcome landing page
│   └── globals.css             # Tailwind base styles and variables
│
├── components/                 # Reusable Presentation/UI Components
│   ├── InterviewForm.tsx       # Parameters configuration form
│   ├── Chat.tsx                # Dynamic messaging workspace & scrolling wrapper
│   ├── FeedbackCard.tsx        # Post-session score & qualitative review report
│   ├── QuestionCard.tsx        # Visual card showing the current prompt question
│   └── Loader.tsx              # Dynamic premium loader animation
│
├── lib/                        # Shared SDK configurations and helpers
│   ├── groq.ts                 # Groq API client initialization
│   ├── interviewPrompt.ts      # LLM prompts & system instruction generator
│   └── utils.ts                # Dynamic class utility merging helper
│
├── types/                      # App-wide shared TypeScript interfaces
│   └── interview.ts            # Type structures for sessions, chats, and configurations
│
├── hooks/                      # Custom state management React Hooks
│   └── useInterview.ts         # state controller for starting, sending answers, and resetting
│
├── public/                     # Static media assets
├── .env.local.example          # Environment variables template
└── README.md                   # Project documentation
```

## Setup and Running

1. **Install Dependencies** (if not already done):
   ```bash
   npm install groq-sdk
   ```
2. **Environment Configuration**:
   - Duplicate `.env.local.example` as `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Open `.env.local` and configure your `GROQ_API_KEY`.
3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) on your browser.
