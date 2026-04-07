# Forma AI Opportunity Finder

A production-quality lead magnet web application for [Forma AI](https://formaai.info) that helps business owners discover where AI can transform their operations, uncover hidden cost leaks, and quantify their financial upside.

**Live website:** [formaai.info](https://formaai.info)

---

## What This App Does

1. **Landing Page** — Premium, conversion-focused page explaining the tool's value
2. **Assessment Wizard** — 6-step guided assessment (business context, workflows, pain points, goals)
3. **AI Analysis** — Server-side OpenRouter integration generates a consultant-style opportunity report
4. **Results Dashboard** — Savings figures, cost leaks, recommendations, quick wins, roadmap
5. **PDF Export** — Downloadable branded PDF report
6. **Print Support** — Print-friendly layout
7. **Lead Capture** — Optional post-report name/email collection (non-blocking)
8. **Database Persistence** — All submissions stored in PostgreSQL via Prisma

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Components | Custom Radix UI primitives |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Database | Prisma + PostgreSQL |
| AI | OpenRouter (Gemini 2.5 Flash) |
| PDF | jsPDF (client-side) |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── assess/           # POST: generate report, save to DB
│   │   ├── report/[id]/      # GET: retrieve stored report
│   │   └── lead-capture/     # POST: save optional contact details
│   ├── assessment/           # Assessment wizard page
│   ├── report/[id]/          # Report display page
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # Primitive UI components
│   ├── layout/               # Navbar, Footer
│   ├── landing/              # Landing page sections
│   ├── wizard/               # Assessment wizard + step components
│   └── report/               # Report display components
├── lib/
│   ├── ai/                   # OpenRouter service + prompt system
│   ├── db/                   # Prisma client + DB helpers
│   ├── pdf/                  # PDF generation (client-side)
│   ├── schemas.ts            # Zod schemas (assessment + report)
│   └── utils.ts              # Utilities
├── stores/
│   └── assessmentStore.ts    # Zustand wizard state (persisted)
└── types/
    ├── assessment.ts
    └── report.ts
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (local or Docker)
- OpenRouter API key — get one at [openrouter.ai](https://openrouter.ai)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/forma_ai_db"
OPENROUTER_API_KEY="sk-or-v1-your-key-here"
OPENROUTER_MODEL="google/gemini-2.5-flash"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
FORMA_AI_WEBSITE_URL="https://formaai.info"
NEXT_PUBLIC_FORMA_AI_WEBSITE_URL="https://formaai.info"
```

### 3. Set up the database

```bash
# Quick setup (development)
npm run db:push

# With proper migrations (production)
npm run db:migrate
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## PostgreSQL with Docker (Quick Setup)

```bash
docker run --name forma-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=forma_ai_db \
  -p 5432:5432 \
  -d postgres:16
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import into Vercel
3. Add all environment variables
4. Use Vercel Postgres, Supabase, or Neon for the database
5. Add to `package.json` scripts: `"postinstall": "prisma generate"`
6. Run `prisma migrate deploy` as a post-deploy hook

### Self-hosted

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `OPENROUTER_API_KEY` | ✅ | Your OpenRouter API key |
| `OPENROUTER_MODEL` | ✅ | AI model (e.g. `google/gemini-2.5-flash`) |
| `NEXT_PUBLIC_APP_URL` | ✅ | App URL |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Same as APP_URL |
| `FORMA_AI_WEBSITE_URL` | ✅ | `https://formaai.info` |
| `NEXT_PUBLIC_FORMA_AI_WEBSITE_URL` | ✅ | `https://formaai.info` |

---

## AI Configuration

The model is configurable via `OPENROUTER_MODEL`. Recommended options:

- `google/gemini-2.5-flash` — Default. Fast, cost-effective, strong output.
- `anthropic/claude-3.5-sonnet` — Higher quality, slower.
- `openai/gpt-4o` — Alternative.

The prompt is versioned (`PROMPT_VERSION = "v1"`) in `src/lib/ai/prompts.ts`. Increment the version when you change the prompt.

---

## Database Schema

The `Submission` table stores all assessments and generated reports:

| Field | Type | Description |
|---|---|---|
| `id` | CUID | Unique submission ID |
| `businessName` | String | From assessment |
| `industry` | String | From assessment |
| `assessmentData` | JSON | Full assessment answers |
| `reportData` | JSON? | Generated report |
| `contactName` | String? | Optional lead name |
| `contactEmail` | String? | Optional lead email |
| `promptVersion` | String | Prompt version used |
| `modelUsed` | String | AI model used |
| `reportStatus` | Enum | PENDING / COMPLETE / FAILED |
| `ipAddress` | String? | Submitter IP |
| `analyticsEvents` | JSON | Event tracking array |

---

## TODO: Admin Panel

> **TODO:** Build a lightweight admin view to browse stored submissions.
>
> Planned features:
> - Submission list (date, business name, industry, status)
> - Click to view full report
> - Filter by date / industry / status
> - Export leads to CSV
>
> Suggested: password-protected route at `/admin` using Next.js middleware + env-var token auth.

---

## Future Extensibility

The architecture supports:

- **Multiple industries** — Wizard and prompt are company-agnostic
- **White-labelling** — Brand config-driven
- **CRM integrations** — Extend lead capture API to push to HubSpot/Salesforce
- **Saved reports** — Add auth + "My Reports" dashboard
- **Paid reports** — Add Stripe before report generation
- **Email sequences** — Extend lead capture to trigger email via Resend/SendGrid
- **Analytics** — `analyticsEvents` field ready for event tracking

---

## Security Notes

- `OPENROUTER_API_KEY` is **never** exposed to the client — all AI calls are server-side
- All AI output is validated with Zod before rendering
- No auth required for reports (by design — it's a lead magnet)
- Rate limiting should be added before production traffic (e.g. via Vercel middleware or Upstash)
