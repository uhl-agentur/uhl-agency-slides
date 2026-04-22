'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { FileText, Copy, Check, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// A4 dimensions - base size at 96 DPI
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_ASPECT_RATIO = A4_HEIGHT_MM / A4_WIDTH_MM; // ~1.414
const BASE_A4_WIDTH = 794; // Full A4 width at 96 DPI
const BASE_A4_HEIGHT = Math.round(BASE_A4_WIDTH * A4_ASPECT_RATIO);
const BASE_PADDING = 60;
const BASE_HEADER_HEIGHT = 80;
const BASE_FOOTER_HEIGHT = 50;

// Convert HTML to Markdown (for pasting from AWORK, Milanote, etc.)
const htmlToMarkdown = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const convertNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();
    const childContent = Array.from(el.childNodes).map(convertNode).join('');

    switch (tagName) {
      case 'h1':
        return `# ${childContent}\n\n`;
      case 'h2':
        return `## ${childContent}\n\n`;
      case 'h3':
        return `### ${childContent}\n\n`;
      case 'h4':
        return `#### ${childContent}\n\n`;
      case 'h5':
        return `##### ${childContent}\n\n`;
      case 'h6':
        return `###### ${childContent}\n\n`;
      case 'p':
        return `${childContent}\n\n`;
      case 'br':
        return '\n';
      case 'strong':
      case 'b':
        return `**${childContent}**`;
      case 'em':
      case 'i':
        return `*${childContent}*`;
      case 'u':
        return `_${childContent}_`;
      case 's':
      case 'strike':
      case 'del':
        return `~~${childContent}~~`;
      case 'code':
        return `\`${childContent}\``;
      case 'pre':
        return `\`\`\`\n${childContent}\n\`\`\`\n\n`;
      case 'blockquote':
        return childContent.split('\n').map(line => `> ${line}`).join('\n') + '\n\n';
      case 'ul':
        return childContent + '\n';
      case 'ol':
        return childContent + '\n';
      case 'li': {
        const parent = el.parentElement;
        if (parent?.tagName.toLowerCase() === 'ol') {
          const index = Array.from(parent.children).indexOf(el) + 1;
          return `${index}. ${childContent}\n`;
        }
        return `- ${childContent}\n`;
      }
      case 'a': {
        const href = el.getAttribute('href');
        return href ? `[${childContent}](${href})` : childContent;
      }
      case 'img': {
        const src = el.getAttribute('src');
        const alt = el.getAttribute('alt') || '';
        return src ? `![${alt}](${src})` : '';
      }
      case 'hr':
        return '\n---\n\n';
      case 'div':
      case 'span':
      case 'section':
      case 'article':
        return childContent;
      default:
        return childContent;
    }
  };

  let result = convertNode(temp);
  result = result.replace(/\n{3,}/g, '\n\n');
  return result.trim();
};

interface MarkdownExporterProps {
  initialMarkdown?: string;
}

// Parse markdown to HTML with section markers for H2
const parseMarkdown = (markdown: string): string => {
  let html = markdown;

  // Headers - wrap H2 in section dividers for page break detection
  html = html.replace(/^######\s+(.*)$/gm, '<h6 class="md-h6">$1</h6>');
  html = html.replace(/^#####\s+(.*)$/gm, '<h5 class="md-h5">$1</h5>');
  html = html.replace(/^####\s+(.*)$/gm, '<h4 class="md-h4">$1</h4>');
  html = html.replace(/^###\s+(.*)$/gm, '<h3 class="md-h3">$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2 class="md-h2 page-break-marker">$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1 class="md-h1">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, _lang, code) => {
    return `<pre class="md-pre"><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="md-code">$1</code>');

  // Blockquotes
  html = html.replace(/^>\s+(.*)$/gm, '<blockquote class="md-blockquote">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="md-hr" />');
  html = html.replace(/^\*\*\*$/gm, '<hr class="md-hr" />');

  // Unordered lists
  html = html.replace(/^[*-]\s+(.*)$/gm, '<li class="md-li">$1</li>');
  html = html.replace(/(<li class="md-li">.*<\/li>\n?)+/g, '<ul class="md-ul">$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.*)$/gm, '<li class="md-li-ol">$1</li>');
  html = html.replace(/(<li class="md-li-ol">.*<\/li>\n?)+/g, '<ol class="md-ol">$&</ol>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="md-link">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-img" />');

  // Paragraphs
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return line;
    return `<p class="md-p">${trimmed}</p>`;
  }).join('\n');

  // Clean up empty paragraphs
  html = html.replace(/<p class="md-p"><\/p>/g, '');

  return html;
};

// Split content into pages based on H2 markers
const splitIntoPages = (html: string, maxHeight: number): string[] => {
  // Create a temporary container to measure content
  const measureContainer = document.createElement('div');
  const measureWidth = BASE_A4_WIDTH - (BASE_PADDING * 2);
  measureContainer.style.cssText = `
    position: absolute;
    visibility: hidden;
    width: ${measureWidth}px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    line-height: 1.6;
  `;
  document.body.appendChild(measureContainer);

  // Parse HTML and split by H2 sections
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const sections: { html: string; isH2Start: boolean }[] = [];
  let currentSection = '';
  let isFirstSection = true;

  Array.from(temp.childNodes).forEach((node) => {
    const el = node as HTMLElement;
    const outerHTML = el.outerHTML || el.textContent || '';

    if (el.classList?.contains('page-break-marker')) {
      // Save current section and start new one
      if (currentSection) {
        sections.push({ html: currentSection, isH2Start: !isFirstSection });
        isFirstSection = false;
      }
      currentSection = outerHTML;
    } else {
      currentSection += outerHTML;
    }
  });

  // Add last section
  if (currentSection) {
    sections.push({ html: currentSection, isH2Start: !isFirstSection });
  }

  // Now distribute sections across pages
  const pages: string[] = [];
  let currentPageContent = '';
  let currentPageHeight = 0;

  sections.forEach((section) => {
    measureContainer.innerHTML = section.html;
    const sectionHeight = measureContainer.offsetHeight;

    if (currentPageHeight + sectionHeight <= maxHeight) {
      // Fits on current page
      currentPageContent += section.html;
      currentPageHeight += sectionHeight;
    } else {
      // Need a new page
      if (currentPageContent) {
        pages.push(currentPageContent);
      }
      currentPageContent = section.html;
      currentPageHeight = sectionHeight;
    }
  });

  // Add last page
  if (currentPageContent) {
    pages.push(currentPageContent);
  }

  document.body.removeChild(measureContainer);

  return pages.length > 0 ? pages : [''];
};

const defaultMarkdown = `# Überschrift

## Unterüberschrift

Dies ist ein **fetter Text** und dies ist *kursiv*.

### Features

- Erster Punkt
- Zweiter Punkt
- Dritter Punkt

> Ein wichtiges Zitat oder Hinweis

\`\`\`javascript
const hello = "Welt";
console.log(hello);
\`\`\`

---

Normaler Absatztext mit einem [Link](https://example.com).

## Zweite Sektion

Hier ist mehr Inhalt für die zweite Sektion. Dieser Text zeigt, wie die Seitenumbrüche bei H2-Überschriften funktionieren.

### Weitere Details

- Punkt A
- Punkt B
- Punkt C

## Dritte Sektion

Noch mehr Inhalt hier, um die Paginierung zu demonstrieren.
`;

export const MarkdownExporter: React.FC<MarkdownExporterProps> = ({
  initialMarkdown = defaultMarkdown
}) => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [headline, setHeadline] = useState('Dokument');
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pages, setPages] = useState<string[]>(['']);
  const [containerWidth, setContainerWidth] = useState(600);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Calculate scale based on container width (with padding)
  const previewPadding = 32; // p-4 = 16px * 2
  const availableWidth = containerWidth - previewPadding;
  const scale = availableWidth / BASE_A4_WIDTH;
  const scaledWidth = BASE_A4_WIDTH * scale;
  const scaledHeight = BASE_A4_HEIGHT * scale;

  const parsedHtml = useMemo(() => parseMarkdown(markdown), [markdown]);

  // Measure container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (previewContainerRef.current) {
        setContainerWidth(previewContainerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate content height for pagination (use base dimensions for consistent pagination)
  const contentHeightForPagination = BASE_A4_HEIGHT - (BASE_PADDING * 2) - BASE_HEADER_HEIGHT - BASE_FOOTER_HEIGHT;

  // Split content into pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newPages = splitIntoPages(parsedHtml, contentHeightForPagination);
      setPages(newPages);
    }
  }, [parsedHtml, contentHeightForPagination]);

  // Handle paste from rich text sources
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = e.clipboardData;
    const htmlData = clipboardData.getData('text/html');

    if (htmlData && htmlData.trim()) {
      e.preventDefault();
      const convertedMarkdown = htmlToMarkdown(htmlData);

      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = markdown.substring(0, start) + convertedMarkdown + markdown.substring(end);
      setMarkdown(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + convertedMarkdown.length;
      }, 0);
    }
  }, [markdown]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(parsedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate full HTML document for PDF with page breaks
  const generateFullHtml = () => {
    const pagesHtml = pages.map((pageContent, index) => `
      <div class="page${index > 0 ? ' page-break' : ''}">
        <div class="header">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23000' width='100' height='100'/%3E%3Ctext fill='%23ADF803' font-family='sans-serif' font-size='40' font-weight='bold' x='50' y='60' text-anchor='middle'%3EUHL%3C/text%3E%3C/svg%3E" alt="UHL" />
          <h1 class="doc-title">${headline}</h1>
        </div>
        <main class="content">
          ${pageContent}
        </main>
        <div class="footer">
          <span>UHL Werbeagentur GmbH | uhl-werbeagentur.de</span>
          <span>Seite ${index + 1} von ${pages.length}</span>
        </div>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page { size: A4; margin: 0; }
    :root { --color-primary: #ADF803; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 210mm; background: white; }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .page-break { page-break-before: always; }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #E5E5E5;
      margin-bottom: 16px;
    }
    .header img { width: 36px; height: 36px; }
    .doc-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 24px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .content {
      flex: 1;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11px;
      line-height: 1.6;
      color: #333;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 2px solid #E5E5E5;
      margin-top: auto;
      color: #999;
      font-size: 9px;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* Typography */
    .md-h1 { font-size: 24px; margin: 20px 0 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; }
    .md-h2 { font-size: 18px; margin: 16px 0 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; }
    .md-h3 { font-size: 14px; margin: 14px 0 8px; font-weight: 700; }
    .md-h4 { font-size: 12px; margin: 12px 0 6px; font-weight: 700; }
    .md-h5 { font-size: 11px; margin: 10px 0 4px; font-weight: 700; }
    .md-h6 { font-size: 10px; margin: 8px 0 4px; font-weight: 700; }
    .md-p { margin: 8px 0; }
    strong { font-weight: 700; }
    em { font-style: italic; }
    del { text-decoration: line-through; }
    .md-link { color: #000; text-decoration: underline; text-decoration-color: var(--color-primary); text-decoration-thickness: 2px; }
    .md-ul, .md-ol { margin: 10px 0; padding-left: 20px; }
    .md-li, .md-li-ol { margin: 3px 0; }
    .md-blockquote { border-left: 3px solid var(--color-primary); padding-left: 12px; margin: 10px 0; font-style: italic; color: #666; }
    .md-pre { background: #F7F7F7; padding: 10px; margin: 10px 0; border-left: 3px solid var(--color-primary); font-size: 9px; overflow-x: auto; }
    .md-code { font-family: monospace; background: #F7F7F7; padding: 1px 4px; font-size: 10px; }
    .md-pre code { padding: 0; background: none; font-family: monospace; }
    .md-hr { margin: 16px 0; border: none; border-top: 2px solid #E5E5E5; }
    .md-img { max-width: 100%; margin: 10px 0; border: 1px solid #E5E5E5; }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;
  };

  const handleExportPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const fullHtml = generateFullHtml();
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: fullHtml,
          filename: headline.toLowerCase().replace(/\s+/g, '-'),
        }),
      });

      if (!response.ok) throw new Error('PDF generation failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${headline.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('PDF-Export fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Preview styles - scaled dynamically
  const previewStyles = `
    .md-h1 { font-size: ${24 * scale}px; margin: ${20 * scale}px 0 ${12 * scale}px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; }
    .md-h2 { font-size: ${18 * scale}px; margin: ${16 * scale}px 0 ${10 * scale}px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; }
    .md-h3 { font-size: ${14 * scale}px; margin: ${14 * scale}px 0 ${8 * scale}px; font-weight: 700; }
    .md-h4 { font-size: ${12 * scale}px; margin: ${12 * scale}px 0 ${6 * scale}px; font-weight: 700; }
    .md-h5 { font-size: ${11 * scale}px; margin: ${10 * scale}px 0 ${4 * scale}px; font-weight: 700; }
    .md-h6 { font-size: ${10 * scale}px; margin: ${8 * scale}px 0 ${4 * scale}px; font-weight: 700; }
    .md-p { margin: ${8 * scale}px 0; font-size: ${11 * scale}px; line-height: 1.6; }
    .md-link { color: #000; text-decoration: underline; text-decoration-color: #ADF803; text-decoration-thickness: ${2 * scale}px; }
    .md-ul, .md-ol { margin: ${10 * scale}px 0; padding-left: ${20 * scale}px; font-size: ${11 * scale}px; }
    .md-li, .md-li-ol { margin: ${3 * scale}px 0; }
    .md-blockquote { border-left: ${3 * scale}px solid #ADF803; padding-left: ${12 * scale}px; margin: ${10 * scale}px 0; font-style: italic; color: #666; font-size: ${11 * scale}px; }
    .md-pre { background: #F7F7F7; padding: ${10 * scale}px; margin: ${10 * scale}px 0; border-left: ${3 * scale}px solid #ADF803; font-size: ${9 * scale}px; overflow-x: auto; }
    .md-code { font-family: monospace; background: #F7F7F7; padding: ${1 * scale}px ${4 * scale}px; font-size: ${10 * scale}px; }
    .md-pre code { padding: 0; background: none; }
    .md-hr { margin: ${16 * scale}px 0; border: none; border-top: ${2 * scale}px solid #E5E5E5; }
    .md-img { max-width: 100%; margin: ${10 * scale}px 0; border: 1px solid #E5E5E5; }
  `;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: previewStyles }} />

      {/* Toolbar */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Zurück zur Übersicht"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-3">
            <img src="/Uhl-Logo.svg" alt="UHL" className="w-10 h-10" />
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Dokument-Titel"
              className="font-humane text-3xl uppercase tracking-wide border-none outline-none bg-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-jakarta">
            {pages.length} {pages.length === 1 ? 'Seite' : 'Seiten'}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 transition-colors font-jakarta font-medium"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Kopiert!' : 'HTML kopieren'}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-jakarta font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPdf ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
            {isGeneratingPdf ? 'Generiere PDF...' : 'PDF Export'}
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 grid grid-cols-2 divide-x divide-gray-200">
        {/* Left: Markdown Input */}
        <div className="flex flex-col">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <span className="font-jakarta font-bold text-sm uppercase text-gray-500">
              Markdown
            </span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onPaste={handlePaste}
            className="flex-1 p-6 font-mono text-sm resize-none outline-none bg-white"
            placeholder="Markdown hier eingeben oder aus AWORK/Milanote einfügen..."
            spellCheck={false}
          />
        </div>

        {/* Right: A4 Preview */}
        <div className="flex flex-col bg-gray-100" ref={previewContainerRef}>
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <span className="font-jakarta font-bold text-sm uppercase text-gray-500">
              A4 Vorschau
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col items-center gap-6" ref={contentRef}>
              {pages.map((pageContent, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg flex flex-col"
                  style={{
                    width: `${scaledWidth}px`,
                    height: `${scaledHeight}px`,
                    padding: `${BASE_PADDING * scale}px`,
                  }}
                >
                  {/* Page Header */}
                  <div
                    className="flex items-center gap-2 pb-2 border-b-2 border-gray-200 mb-3"
                    style={{ height: `${BASE_HEADER_HEIGHT * scale}px` }}
                  >
                    <img
                      src="/Uhl-Logo.svg"
                      alt="UHL"
                      style={{ width: `${36 * scale}px`, height: `${36 * scale}px` }}
                    />
                    <span
                      className="font-humane uppercase tracking-wide"
                      style={{ fontSize: `${24 * scale}px` }}
                    >
                      {headline}
                    </span>
                  </div>

                  {/* Page Content */}
                  <div
                    className="flex-1 overflow-hidden font-jakarta"
                    style={{ fontSize: `${11 * scale}px`, lineHeight: '1.6' }}
                    dangerouslySetInnerHTML={{ __html: pageContent }}
                  />

                  {/* Page Footer */}
                  <div
                    className="flex justify-between items-center pt-2 border-t-2 border-gray-200 mt-auto text-gray-400 font-jakarta"
                    style={{ height: `${BASE_FOOTER_HEIGHT * scale}px`, fontSize: `${9 * scale}px` }}
                  >
                    <span>UHL Werbeagentur GmbH</span>
                    <span>Seite {index + 1} von {pages.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownExporter;
