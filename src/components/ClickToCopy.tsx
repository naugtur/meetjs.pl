'use client';

import { useState, useEffect } from 'react';

interface Props {
  textToCopy: string;
}

export const ClickToCopy = ({ textToCopy }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2_000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const copyText = () => {
    navigator.clipboard.writeText(textToCopy);

    setCopied(true);
  };

  return (
    <div
      className="cursor-pointer rounded-md border border-gray-200 bg-white p-3 text-center transition-colors hover:bg-gray-50"
      onClick={copyText}
      title="Click to copy"
    >
      <code className="text-lg font-bold text-blue-600">{textToCopy}</code>

      <div className="mt-1 text-xs text-gray-500">
        {copied ? 'Copied!' : 'Click to copy'}
      </div>
    </div>
  );
};
