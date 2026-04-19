export interface ToolLink {
  name: string;
  description: string;
  url: string;
  badge?: string;
}

const TOOLS: Record<string, ToolLink[]> = {
  "Sales Automation": [
    { name: "HubSpot CRM", description: "Free CRM with built-in email sequences and deal tracking", url: "https://www.hubspot.com/products/crm", badge: "Free plan" },
    { name: "Pipedrive", description: "Visual sales pipeline with AI-powered activity suggestions", url: "https://www.pipedrive.com" },
    { name: "Close", description: "CRM built for outbound sales teams, with built-in calling", url: "https://www.close.com" },
  ],
  "Lead Generation": [
    { name: "Apollo.io", description: "Sales intelligence + sequencing with 275M+ contact database", url: "https://www.apollo.io", badge: "Free plan" },
    { name: "Instantly", description: "AI-powered cold email at scale with inbox rotation", url: "https://instantly.ai" },
    { name: "Hunter.io", description: "Find and verify professional email addresses in seconds", url: "https://hunter.io", badge: "Free plan" },
  ],
  "Client Onboarding": [
    { name: "Notion", description: "Flexible workspace for client portals and onboarding wikis", url: "https://www.notion.so", badge: "Free plan" },
    { name: "Trainual", description: "SOPs and onboarding flows your clients can follow step-by-step", url: "https://trainual.com" },
    { name: "ClickUp", description: "Project management with onboarding templates and automations", url: "https://clickup.com", badge: "Free plan" },
  ],
  "Admin": [
    { name: "Zapier", description: "Connect 6,000+ apps and automate repetitive tasks, no code needed", url: "https://zapier.com", badge: "Free plan" },
    { name: "Make", description: "Visual automation builder with more power than Zapier at lower cost", url: "https://www.make.com", badge: "Free plan" },
    { name: "n8n", description: "Open-source automation you can self-host for full control", url: "https://n8n.io", badge: "Open source" },
  ],
  "Automation": [
    { name: "Zapier", description: "Connect 6,000+ apps and automate repetitive tasks, no code needed", url: "https://zapier.com", badge: "Free plan" },
    { name: "Make", description: "Visual automation builder with more power than Zapier at lower cost", url: "https://www.make.com", badge: "Free plan" },
    { name: "n8n", description: "Open-source automation you can self-host for full control", url: "https://n8n.io", badge: "Open source" },
  ],
  "Reporting": [
    { name: "Looker Studio", description: "Free Google tool to build live dashboards from any data source", url: "https://lookerstudio.google.com", badge: "Free" },
    { name: "Databox", description: "Pull KPIs from 70+ tools into one automated dashboard", url: "https://databox.com", badge: "Free plan" },
    { name: "Klipfolio", description: "Business intelligence dashboards with real-time metrics", url: "https://www.klipfolio.com" },
  ],
  "Customer Support": [
    { name: "Tidio", description: "AI chatbot + live chat that handles FAQs around the clock", url: "https://www.tidio.com", badge: "Free plan" },
    { name: "Intercom", description: "Customer messaging platform with AI-powered support resolution", url: "https://www.intercom.com" },
    { name: "Freshdesk", description: "Helpdesk software with AI ticket triage and canned responses", url: "https://freshdesk.com", badge: "Free plan" },
  ],
  "Marketing": [
    { name: "ActiveCampaign", description: "Email marketing + CRM automation with powerful segmentation", url: "https://www.activecampaign.com" },
    { name: "ConvertKit", description: "Creator-focused email platform with simple visual automations", url: "https://convertkit.com", badge: "Free plan" },
    { name: "Mailchimp", description: "Email marketing with AI content suggestions and A/B testing", url: "https://mailchimp.com", badge: "Free plan" },
  ],
  "Invoicing": [
    { name: "QuickBooks", description: "Accounting and invoicing with automated payment reminders", url: "https://quickbooks.intuit.com" },
    { name: "Wave", description: "100% free invoicing and accounting for small businesses", url: "https://www.waveapps.com", badge: "Free" },
    { name: "FreshBooks", description: "Time-tracking + invoicing built for service businesses", url: "https://www.freshbooks.com" },
  ],
  "Appointment Booking": [
    { name: "Calendly", description: "Eliminate scheduling back-and-forth with shareable booking links", url: "https://calendly.com", badge: "Free plan" },
    { name: "Acuity Scheduling", description: "Client self-scheduling with intake forms and payments built in", url: "https://acuityscheduling.com" },
    { name: "TidyCal", description: "Lifetime deal alternative to Calendly, simple and affordable", url: "https://tidycal.com" },
  ],
  "Operations": [
    { name: "ClickUp", description: "All-in-one project and operations management with automations", url: "https://clickup.com", badge: "Free plan" },
    { name: "Monday.com", description: "Visual operations platform with no-code workflow automations", url: "https://monday.com" },
    { name: "Asana", description: "Task and project tracking with automation rules and templates", url: "https://asana.com", badge: "Free plan" },
  ],
  "AI": [
    { name: "Claude (Anthropic)", description: "Long-context AI assistant ideal for analysis and drafting", url: "https://claude.ai", badge: "Free plan" },
    { name: "ChatGPT", description: "Versatile AI assistant for writing, research, and idea generation", url: "https://chatgpt.com", badge: "Free plan" },
    { name: "Perplexity", description: "AI-powered search and research with cited sources", url: "https://www.perplexity.ai", badge: "Free plan" },
  ],
};

const FALLBACK: ToolLink[] = [
  { name: "Zapier", description: "Automate workflows between your existing tools, no code needed", url: "https://zapier.com", badge: "Free plan" },
  { name: "Notion AI", description: "AI-powered workspace for docs, wikis, and project management", url: "https://www.notion.so", badge: "Free plan" },
  { name: "Make", description: "Visual automation builder — connect apps and automate processes", url: "https://www.make.com", badge: "Free plan" },
];

export function getToolsForCategory(category: string): ToolLink[] {
  const exact = TOOLS[category];
  if (exact) return exact;
  const lower = category.toLowerCase();
  const key = Object.keys(TOOLS).find((k) => lower.includes(k.toLowerCase()) || k.toLowerCase().includes(lower));
  return key ? TOOLS[key] : FALLBACK;
}
