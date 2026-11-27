'use client';

interface CodeToken {
  type: 'comment' | 'string' | 'keyword' | 'literal' | 'number' | 'plain';
  value: string;
}

const TOKEN_REGEX =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|\b(const|let|var|function|async|await|return|new|try|catch|for|if|else|switch|case|default|type|typeof|satisfies|extends|infer|as|readonly|import|export|from)\b|\b(true|false|null|undefined|NaN|Infinity|never|unknown|any|string|number|boolean)\b|\b(\d+(?:\.\d+)?)\b/g;

function tokenize(code: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let lastIndex = 0;

  for (const match of code.matchAll(TOKEN_REGEX)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      tokens.push({ type: 'plain', value: code.slice(lastIndex, index) });
    }

    if (match[1]) {
      tokens.push({ type: 'comment', value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: 'string', value: match[2] });
    } else if (match[3]) {
      tokens.push({ type: 'keyword', value: match[3] });
    } else if (match[4]) {
      tokens.push({ type: 'literal', value: match[4] });
    } else if (match[5]) {
      tokens.push({ type: 'number', value: match[5] });
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIndex) });
  }

  return tokens;
}

const TOKEN_STYLES: Record<CodeToken['type'], string> = {
  comment: 'text-slate-400 italic',
  string: 'text-[#bcd35d]',
  keyword: 'text-[#c084fc] font-medium',
  literal: 'text-[#38bdf8]',
  number: 'text-[#fb923b]',
  plain: 'text-slate-100',
};

export const InlineCodeText = ({ text }: { text: string }) => {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, idx) =>
        part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
          <code
            key={idx}
            className="rounded bg-purple/10 px-1.5 py-0.5 font-mono text-[0.88em] font-semibold text-purple"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={idx}>{part}</span>
        ),
      )}
    </>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = ({ code, language = 'js' }: CodeBlockProps) => {
  const tokens = tokenize(code);

  return (
    <div className="overflow-hidden rounded-xl border border-purple/30 bg-[#1a1021] shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#140b1a] px-4 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-100">
        <code>
          {tokens.map((token, idx) => (
            <span key={idx} className={TOKEN_STYLES[token.type]}>
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};
