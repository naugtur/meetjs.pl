import { createSignal } from 'solid-js';

export function useCopyToClipboard() {
  const [copied, setCopied] = createSignal(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return { copied, copyToClipboard };
}
