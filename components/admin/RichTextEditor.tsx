"use client";

import { useEffect, useRef } from "react";

const ALLOWED_TAGS = new Set(["B", "STRONG", "I", "EM", "U", "BR", "DIV", "P"]);

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sanitizeNode(node: ChildNode): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeHtml(node.textContent ?? "");
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const el = node as HTMLElement;
  const inner = Array.from(el.childNodes).map(sanitizeNode).join("");
  if (el.tagName === "BR") return "<br>";
  if (ALLOWED_TAGS.has(el.tagName)) {
    const tag = el.tagName.toLowerCase();
    return `<${tag}>${inner}</${tag}>`;
  }
  return inner;
}

/** Keeps only bold/italic/underline/line-break markup; strips everything else (scripts, styles, attributes). */
function sanitizeRichText(html: string): string {
  const container = document.createElement("div");
  container.innerHTML = html;
  return Array.from(container.childNodes).map(sanitizeNode).join("");
}

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (ref.current && !initialized.current) {
      ref.current.innerHTML = value;
      initialized.current = true;
    }
  }, [value]);

  function handleInput() {
    if (!ref.current) return;
    onChange(sanitizeRichText(ref.current.innerHTML));
  }

  function exec(command: string) {
    ref.current?.focus();
    document.execCommand(command);
    handleInput();
  }

  return (
    <div>
      <div className="flex gap-1.5 mb-2">
        <button
          type="button"
          onClick={() => exec("bold")}
          className="w-8 h-8 rounded-lg border border-glass-border text-sm font-bold hover:border-lime"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className="w-8 h-8 rounded-lg border border-glass-border text-sm italic hover:border-lime"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          className="w-8 h-8 rounded-lg border border-glass-border text-sm underline hover:border-lime"
        >
          U
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        suppressContentEditableWarning
        className="w-full min-h-[110px] px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_u]:underline"
      />
    </div>
  );
}
