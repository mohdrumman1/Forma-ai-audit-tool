import { cn } from "@/lib/utils";

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")   // **bold** -> plain
    .replace(/\*(.*?)\*/g, "$1")        // *italic* -> plain
    .replace(/#{1,6}\s+/g, "")          // ## heading -> plain
    .replace(/^[-*]\s+/gm, "• ")        // - bullet -> bullet char
    .replace(/`([^`]+)`/g, "$1")        // `code` -> plain
    .trim();
}

interface ProseTextProps {
  text: string;
  className?: string;
}

export function ProseText({ text, className }: ProseTextProps) {
  const clean = cleanMarkdown(text);
  const paragraphs = clean.split(/\n\n+/).filter(Boolean);

  if (paragraphs.length <= 1) {
    const lines = clean.split("\n").filter(Boolean);
    if (lines.length <= 1) {
      return <span className={className}>{clean}</span>;
    }
    return (
      <p className={className}>
        {lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    );
  }

  return (
    <div className={className}>
      {paragraphs.map((para, i) => {
        const lines = para.split("\n").filter(Boolean);
        return (
          <p key={i} className={cn(i > 0 && "mt-2")}>
            {lines.map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
