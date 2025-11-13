import { useState, useEffect } from "react";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface SQLEditorProps {
  code: string;
  onChange: (code: string) => void;
  expanded?: boolean;
}

export function SQLEditor({ code, onChange, expanded }: SQLEditorProps) {
  const [isExpanded, setIsExpanded] = useState(expanded ?? true);

  // Sync internal state with external expanded prop if provided
  useEffect(() => {
    if (expanded !== undefined) {
      setIsExpanded(expanded);
    }
  }, [expanded]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  // 语法高亮处理
  const highlightSQL = (sql: string) => {
    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
      "AS",
      "COUNT",
      "CASE",
      "WHEN",
      "THEN",
      "ELSE",
      "END",
      "NULL",
      "OR",
    ];

    // 分割 SQL 语句，保留空格、括号、等号等
    const lines = sql.split("\n");

    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\s+|[(),=]|>=|<=)/);

      const highlightedParts = parts.map((part, index) => {
        const upperPart = part.toUpperCase();
        if (keywords.includes(upperPart)) {
          return (
            <span key={`${lineIndex}-${index}`} style={{ color: "#1890ff" }}>
              {part}
            </span>
          );
        } else if (/^'[^']*'$/.test(part)) {
          return (
            <span key={`${lineIndex}-${index}`} style={{ color: "#52c41a" }}>
              {part}
            </span>
          );
        } else if (/^\d+$/.test(part)) {
          return (
            <span key={`${lineIndex}-${index}`} style={{ color: "#fa8c16" }}>
              {part}
            </span>
          );
        }
        return <span key={`${lineIndex}-${index}`}>{part}</span>;
      });

      return <div key={lineIndex}>{highlightedParts}</div>;
    });
  };

  return (
    <Card
      className="border-gray-300"
      style={{
        background: "#fafafa",
        borderRadius: 2,
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #d9d9d9",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div
        style={{
          padding: 16,
          fontFamily:
            'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
          fontSize: 13,
          lineHeight: 1.8,
          color: "#262626",
          background: "#fff",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          maxHeight: isExpanded ? "none" : 200,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {highlightSQL(code)}
      </div>
      {code.split("\n").length > 8 && (
        <div
          style={{
            textAlign: "center",
            padding: "8px 0",
            borderTop: "1px solid #f0f0f0",
            cursor: "pointer",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span
            style={{
              color: "#1890ff",
              fontSize: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            展开{" "}
            {isExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </span>
        </div>
      )}
    </Card>
  );
}
