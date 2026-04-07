// ============================================================
// Forma AI — PDF Report Generator
// Client-side only. Uses jsPDF for generation.
// ============================================================

import type { GeneratedReport } from "@/types/report";

const FORMA_WEBSITE = "https://formaai.info";
const BRAND_COLOR: [number, number, number] = [97, 114, 241]; // brand-600
const ACCENT_COLOR: [number, number, number] = [255, 127, 10]; // accent-500
const DARK_BG: [number, number, number] = [15, 15, 26]; // surface
const CARD_BG: [number, number, number] = [22, 22, 42]; // surface-card
const TEXT_WHITE: [number, number, number] = [241, 245, 249];
const TEXT_MUTED: [number, number, number] = [148, 163, 184];
const SUCCESS_COLOR: [number, number, number] = [52, 211, 153];

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length <= maxChars) {
      current = (current + " " + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generatePDF(
  report: GeneratedReport,
  businessName: string,
  industry: string
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = 0;

  const newPage = () => {
    doc.addPage();
    y = margin;
    // Page footer
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(`Forma AI — AI Opportunity Report — ${FORMA_WEBSITE}`, margin, pageH - 10);
    doc.text(`${businessName}`, pageW - margin, pageH - 10, { align: "right" });
  };

  const checkPageBreak = (needed: number) => {
    if (y + needed > pageH - 20) {
      newPage();
    }
  };

  const addSectionTitle = (title: string) => {
    checkPageBreak(20);
    y += 6;
    doc.setFillColor(...BRAND_COLOR);
    doc.rect(margin, y, 3, 8, "F");
    doc.setFontSize(14);
    doc.setTextColor(...TEXT_WHITE);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 7, y + 6);
    y += 14;
  };

  const addBodyText = (text: string, fontSize = 10, color: [number, number, number] = TEXT_MUTED) => {
    const lines = wrapText(text, Math.floor(contentW / (fontSize * 0.45)));
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    doc.setFont("helvetica", "normal");
    for (const line of lines) {
      checkPageBreak(6);
      doc.text(line, margin, y);
      y += 5;
    }
    y += 2;
  };

  // ============================================================
  // PAGE 1: Cover
  // ============================================================
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, pageW, pageH, "F");

  // Brand stripe
  doc.setFillColor(...BRAND_COLOR);
  doc.rect(0, 0, pageW, 4, "F");

  // Forma AI logo text
  doc.setFontSize(18);
  doc.setTextColor(...BRAND_COLOR);
  doc.setFont("helvetica", "bold");
  doc.text("FORMA AI", margin, 30);

  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.setFont("helvetica", "normal");
  doc.text(FORMA_WEBSITE, margin, 37);

  // Divider
  doc.setDrawColor(...BRAND_COLOR);
  doc.setLineWidth(0.5);
  doc.line(margin, 45, pageW - margin, 45);

  // Report title
  y = 65;
  doc.setFontSize(28);
  doc.setTextColor(...TEXT_WHITE);
  doc.setFont("helvetica", "bold");
  doc.text("AI Opportunity", margin, y);
  y += 12;
  doc.text("Report", margin, y);

  // Business name
  y += 20;
  doc.setFontSize(16);
  doc.setTextColor(...ACCENT_COLOR);
  doc.setFont("helvetica", "bold");
  doc.text(businessName, margin, y);

  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(...TEXT_MUTED);
  doc.setFont("helvetica", "normal");
  doc.text(industry, margin, y);

  y += 5;
  doc.text(new Date().toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }), margin, y + 6);

  // Big savings number
  y = 160;
  doc.setFillColor(...CARD_BG);
  doc.roundedRect(margin, y, contentW, 50, 4, 4, "F");

  doc.setFontSize(10);
  doc.setTextColor(...TEXT_MUTED);
  doc.text("TOTAL ESTIMATED ANNUAL OPPORTUNITY", pageW / 2, y + 14, { align: "center" });

  doc.setFontSize(32);
  doc.setTextColor(...ACCENT_COLOR);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(report.totalEstimatedSavings), pageW / 2, y + 32, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.setFont("helvetica", "normal");
  doc.text("In identifiable savings, automation gains, and recoverable revenue", pageW / 2, y + 44, { align: "center" });

  // Metrics row
  y += 58;
  const metricW = contentW / 4 - 2;
  const metrics = [
    { label: "Monthly Savings", value: formatCurrency(report.estimatedMonthlySavings), color: BRAND_COLOR },
    { label: "Annual Value", value: formatCurrency(report.estimatedAnnualValue), color: BRAND_COLOR },
    { label: "Currently Leaking", value: formatCurrency(report.currentMoneyLeaked), color: [239, 68, 68] as [number, number, number] },
    { label: "Recoverable Upside", value: formatCurrency(report.recoverableUpside), color: ACCENT_COLOR },
  ];

  metrics.forEach((m, i) => {
    const x = margin + i * (metricW + 2);
    doc.setFillColor(...CARD_BG);
    doc.roundedRect(x, y, metricW, 24, 2, 2, "F");
    doc.setFontSize(7);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(m.label.toUpperCase(), x + metricW / 2, y + 7, { align: "center" });
    doc.setFontSize(11);
    doc.setTextColor(...m.color);
    doc.setFont("helvetica", "bold");
    doc.text(m.value, x + metricW / 2, y + 17, { align: "center" });
  });

  // Bottom disclaimer
  y = pageH - 35;
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.setFont("helvetica", "italic");
  const disclaimer = "This report is provided as a no-obligation diagnostic from Forma AI. All figures are directional estimates.";
  doc.text(disclaimer, pageW / 2, y, { align: "center" });

  // Page footer
  doc.setFont("helvetica", "normal");
  doc.text(`Forma AI — ${FORMA_WEBSITE}`, pageW / 2, pageH - 12, { align: "center" });

  // ============================================================
  // PAGE 2: Executive Summary + Cost Leaks
  // ============================================================
  newPage();

  doc.setFontSize(22);
  doc.setTextColor(...TEXT_WHITE);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", margin, y);
  y += 10;

  doc.setFillColor(...CARD_BG);
  doc.roundedRect(margin, y, contentW, 4, 2, 2, "F");
  y += 8;

  addBodyText(report.executiveSummary, 10, TEXT_MUTED);
  y += 2;
  addBodyText(report.businessSnapshot, 9, [100, 116, 139]);

  addSectionTitle("Hidden Cost Leaks");

  for (const leak of report.hiddenCostLeaks) {
    checkPageBreak(30);
    const severityColor: Record<string, [number, number, number]> = {
      critical: [239, 68, 68],
      high: [249, 115, 22],
      medium: [234, 179, 8],
      low: [148, 163, 184],
    };
    const sc = severityColor[leak.severity] ?? severityColor.medium;

    doc.setFillColor(...CARD_BG);
    doc.roundedRect(margin, y, contentW, 5, 1, 1, "F");

    doc.setFontSize(11);
    doc.setTextColor(...TEXT_WHITE);
    doc.setFont("helvetica", "bold");
    const leakTitleLines = wrapText(leak.title, 60);
    doc.text(leakTitleLines[0] ?? leak.title, margin + 2, y + 4);

    doc.setFontSize(7);
    doc.setTextColor(...sc);
    doc.text(leak.severity.toUpperCase(), pageW - margin - 2, y + 4, { align: "right" });
    y += 8;

    addBodyText(leak.explanation, 9);
    addBodyText(`Fix: ${leak.suggestedFix}`, 9, SUCCESS_COLOR);
    y += 2;
  }

  // ============================================================
  // PAGE 3+: Recommendations
  // ============================================================
  addSectionTitle("AI Recommendations");

  for (const rec of report.aiRecommendations) {
    checkPageBreak(40);

    doc.setFillColor(...CARD_BG);
    const recBoxH = 8;
    doc.roundedRect(margin, y, contentW, recBoxH, 2, 2, "F");

    doc.setFontSize(11);
    doc.setTextColor(...TEXT_WHITE);
    doc.setFont("helvetica", "bold");
    const titleLines = wrapText(rec.title, 60);
    doc.text(titleLines[0] ?? rec.title, margin + 4, y + 5.5);

    doc.setFontSize(8);
    doc.setTextColor(...ACCENT_COLOR);
    doc.text(rec.estimatedUpside, pageW - margin - 4, y + 5.5, { align: "right" });
    y += recBoxH + 3;

    addBodyText(`Problem: ${rec.currentProblem}`, 9);
    addBodyText(`AI Solution: ${rec.recommendedUseCase}`, 9, [...BRAND_COLOR] as [number, number, number]);
    addBodyText(`Why It Matters: ${rec.whyItMatters}`, 9);
    y += 3;
  }

  // ============================================================
  // Quick Wins
  // ============================================================
  addSectionTitle("Quick Wins");

  for (const win of report.quickWins) {
    checkPageBreak(20);
    doc.setFillColor(22, 60, 40);
    doc.roundedRect(margin, y, contentW, 5, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...TEXT_WHITE);
    doc.setFont("helvetica", "bold");
    doc.text(win.title, margin + 4, y + 3.5);
    y += 8;
    addBodyText(win.action, 9);
    addBodyText(`Expected: ${win.expectedBenefit}`, 9, SUCCESS_COLOR);
    y += 2;
  }

  // ============================================================
  // Roadmap
  // ============================================================
  addSectionTitle("Implementation Roadmap");

  for (const phase of report.highLevelRoadmap) {
    checkPageBreak(30);
    doc.setFillColor(...CARD_BG);
    doc.roundedRect(margin, y, contentW, 6, 2, 2, "F");

    doc.setFontSize(10);
    doc.setTextColor(...BRAND_COLOR);
    doc.setFont("helvetica", "bold");
    doc.text(`Phase ${phase.phase}: ${phase.title}`, margin + 4, y + 4);

    doc.setFontSize(8);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(phase.timeframe, pageW - margin - 4, y + 4, { align: "right" });
    y += 9;

    addBodyText(phase.description, 9);
    addBodyText(`Value: ${phase.expectedBusinessValue}`, 9, SUCCESS_COLOR);
    y += 2;
  }

  // ============================================================
  // Assumptions + Next Steps
  // ============================================================
  addSectionTitle("Assumptions & Next Steps");

  doc.setFontSize(10);
  doc.setTextColor(...TEXT_WHITE);
  doc.setFont("helvetica", "bold");
  checkPageBreak(8);
  doc.text("Key Assumptions", margin, y);
  y += 6;

  for (const assumption of report.assumptions) {
    checkPageBreak(8);
    addBodyText(`• ${assumption}`, 9);
  }

  y += 4;
  checkPageBreak(8);
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_WHITE);
  doc.setFont("helvetica", "bold");
  doc.text("Next Steps", margin, y);
  y += 6;
  addBodyText(report.nextSteps, 9, TEXT_MUTED);

  // ============================================================
  // Final CTA page
  // ============================================================
  newPage();

  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, pageW, pageH, "F");

  doc.setFillColor(...BRAND_COLOR);
  doc.roundedRect(margin, 60, contentW, 140, 6, 6, "F");

  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to implement?", pageW / 2, 90, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 210, 255);
  doc.text("Book a free strategy call with Forma AI", pageW / 2, 106, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(FORMA_WEBSITE, pageW / 2, 125, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 210, 255);
  const ctaNote = "No obligation. No hard sell. A genuine conversation about your AI opportunity.";
  doc.text(ctaNote, pageW / 2, 140, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(150, 160, 200);
  doc.text("This report is provided as a no-obligation diagnostic from Forma AI.", pageW / 2, 175, { align: "center" });
  doc.text("All estimates are directional and based on information provided.", pageW / 2, 181, { align: "center" });

  // Save
  const fileName = `Forma-AI-Report-${businessName.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`;
  doc.save(fileName);
}
