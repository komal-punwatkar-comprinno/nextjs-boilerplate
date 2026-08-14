"use client";

import { useState, useCallback } from "react";

interface ComponentPreviewProps {
  /** Title label for the demo block */
  title?: string;
  /** The rendered component preview */
  children: React.ReactNode;
  /** Source code string to display in the "Code" tab */
  code: string;
  /** Language label for the code block (default: "tsx") */
  language?: string;
}

/**
 * Shows a component demo with Preview/Code tabs, syntax highlighting, and copy button.
 */
export function ComponentPreview({
  title,
  children,
  code,
  language = "tsx",
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="group rounded-xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-[#2D3640] dark:bg-[#242B33]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 dark:border-[#2D3640]">
        <div className="flex items-center gap-3">
          {title && (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#4CCBBF] to-[#31b0a5]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {title}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5 dark:bg-[#1A1F26]">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeTab === "preview"
                ? "bg-white text-slate-800 shadow-sm dark:bg-[#2D3640] dark:text-[#E2E8F0]"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeTab === "code"
                ? "bg-white text-slate-800 shadow-sm dark:bg-[#2D3640] dark:text-[#E2E8F0]"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code
          </button>
        </div>
      </div>

      {/* Preview panel — NO overflow-hidden so dropdowns/tooltips render correctly */}
      {activeTab === "preview" && (
        <div className="relative p-6">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            {children}
          </div>
        </div>
      )}

      {/* Code panel */}
      {activeTab === "code" && (
        <div className="relative overflow-hidden rounded-b-xl bg-[#0d1117]">
          {/* Gradient accent bar */}
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#4CCBBF] via-[#3B82F6] to-[#8B5CF6]" />

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-4 z-10 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>

          {/* Language badge */}
          <span className="absolute left-4 top-4 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            {language}
          </span>

          {/* Code content — explicit light text color for visibility */}
          <div className="overflow-x-auto px-4 pb-5 pt-12">
            <pre className="text-[13px] leading-[1.7]">
              <code className="font-mono text-[#e6edf3]">
                <SyntaxHighlight code={code} />
              </code>
            </pre>
          </div>

          {/* Line numbers gutter effect */}
          <div className="absolute bottom-0 left-0 top-12 w-10 border-r border-white/5 bg-white/[0.02]" />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Lightweight TSX/JSX syntax highlighter
 * Token-based approach — splits source into tokens FIRST,
 * then wraps each token. Never applies regex to generated HTML.
 * ───────────────────────────────────────────── */

interface SyntaxHighlightProps {
  code: string;
}

function SyntaxHighlight({ code }: SyntaxHighlightProps) {
  const tokens = tokenize(code);
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={token.type ? `tok-${token.type}` : undefined}>
          {token.text}
        </span>
      ))}
    </>
  );
}

type TokenType = "keyword" | "string" | "comment" | "tag" | "attr" | "number" | "bracket" | null;

interface Token {
  text: string;
  type: TokenType;
}

const KEYWORDS = new Set([
  "import", "export", "from", "const", "let", "var", "function", "return",
  "if", "else", "default", "type", "interface", "extends", "implements",
  "new", "class", "async", "await", "true", "false", "null", "undefined",
  "typeof", "void", "throw", "try", "catch", "finally", "yield",
  "switch", "case", "break", "continue", "for", "while", "do", "in", "of", "as",
]);

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Single-line comments
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const slice = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ text: slice, type: "comment" });
      i += slice.length;
      continue;
    }

    // Multi-line comments
    if (code[i] === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const slice = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      tokens.push({ text: slice, type: "comment" });
      i += slice.length;
      continue;
    }

    // Strings (double quote)
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ text: code.slice(i, j + 1), type: "string" });
      i = j + 1;
      continue;
    }

    // Strings (single quote)
    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ text: code.slice(i, j + 1), type: "string" });
      i = j + 1;
      continue;
    }

    // Template literals
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ text: code.slice(i, j + 1), type: "string" });
      i = j + 1;
      continue;
    }

    // JSX tags: < or </ or /> or >
    if (code[i] === "<" || (code[i] === "/" && code[i + 1] === ">")) {
      if (code[i] === "<") {
        // Collect < or </
        let bracket = "<";
        let j = i + 1;
        if (code[j] === "/") {
          bracket = "</";
          j++;
        }
        tokens.push({ text: bracket, type: "bracket" });
        i = j;
        // Collect tag name
        let tag = "";
        while (j < code.length && /[\w.]/.test(code[j])) {
          tag += code[j];
          j++;
        }
        if (tag) {
          tokens.push({ text: tag, type: "tag" });
          i = j;
        }
        continue;
      }
      // />
      tokens.push({ text: "/>", type: "bracket" });
      i += 2;
      continue;
    }

    if (code[i] === ">") {
      tokens.push({ text: ">", type: "bracket" });
      i++;
      continue;
    }

    // Brackets
    if ("{}()[]".includes(code[i])) {
      tokens.push({ text: code[i], type: "bracket" });
      i++;
      continue;
    }

    // Numbers
    if (/\d/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      tokens.push({ text: code.slice(i, j), type: "number" });
      i = j;
      continue;
    }

    // Words (identifiers, keywords, attributes)
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\w$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      // Check if it's followed by = (JSX attribute)
      if (code[j] === "=" && code[j + 1] !== "=") {
        tokens.push({ text: word, type: "attr" });
      } else if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: "keyword" });
      } else {
        tokens.push({ text: word, type: null });
      }
      i = j;
      continue;
    }

    // Arrow function
    if (code[i] === "=" && code[i + 1] === ">") {
      tokens.push({ text: "=>", type: "keyword" });
      i += 2;
      continue;
    }

    // Everything else (whitespace, operators, punctuation)
    tokens.push({ text: code[i], type: null });
    i++;
  }

  return tokens;
}
