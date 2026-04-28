import type { ReactNode } from 'react';

type MarkdownBlock =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'code'; code: string; language: string }
  | { type: 'list'; ordered: boolean; items: string[] };

function isSpecialBlockStart(line: string) {
  return (
    /^```/.test(line) ||
    /^(#{1,3})\s+/.test(line) ||
    /^>\s?/.test(line) ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line)
  );
}

function parseMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === '') {
      index += 1;
      continue;
    }

    const codeFence = line.match(/^```(.*)$/);
    if (codeFence) {
      const language = codeFence[1].trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !/^```/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({ type: 'code', code: codeLines.join('\n'), language });
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2].trim(),
      });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];

      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, '').trim());
        index += 1;
      }

      blocks.push({ type: 'blockquote', text: quoteLines.join(' ') });
      continue;
    }

    const unorderedList = line.match(/^\s*[-*]\s+(.+)$/);
    const orderedList = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unorderedList || orderedList) {
      const ordered = Boolean(orderedList);
      const items: string[] = [];
      const itemPattern = ordered ? /^\s*\d+\.\s+(.+)$/ : /^\s*[-*]\s+(.+)$/;

      while (index < lines.length) {
        const item = lines[index].match(itemPattern);
        if (!item) {
          break;
        }

        items.push(item[1].trim());
        index += 1;
      }

      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length && lines[index].trim() !== '' && !isSpecialBlockStart(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
  }

  return blocks;
}

function isSafeHref(href: string) {
  return /^(https?:\/\/|mailto:|#\/?|\/(?!\/)|\.\/|\.\.\/)/i.test(href);
}

function renderInline(text: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  const pattern = /(`[^`]+`)|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      nodes.push(<code key={`${keyPrefix}-code-${match.index}`}>{match[1].slice(1, -1)}</code>);
    } else {
      const label = match[2];
      const href = match[3];
      const isExternal = /^https?:\/\//i.test(href);

      nodes.push(
        isSafeHref(href) ? (
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
          >
            {label}
          </a>
        ) : (
          `${label} (${href})`
        ),
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="post-content">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          if (block.level === 1) {
            return <h4 key={index}>{renderInline(block.text, `${index}`)}</h4>;
          }

          if (block.level === 2) {
            return <h5 key={index}>{renderInline(block.text, `${index}`)}</h5>;
          }

          return <h6 key={index}>{renderInline(block.text, `${index}`)}</h6>;
        }

        if (block.type === 'blockquote') {
          return <blockquote key={index}>{renderInline(block.text, `${index}`)}</blockquote>;
        }

        if (block.type === 'code') {
          return (
            <pre key={index}>
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';

          return (
            <ListTag key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={`${index}-${itemIndex}`}>{renderInline(item, `${index}-${itemIndex}`)}</li>
              ))}
            </ListTag>
          );
        }

        return <p key={index}>{renderInline(block.text, `${index}`)}</p>;
      })}
    </div>
  );
}
