import { createSignal, Show } from 'solid-js';

interface Props {
  textToCopy: string;
}

export const ClickToCopy = (props: Props) => {
  const [copied, setCopied] = createSignal(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const copyText = () => {
    navigator.clipboard.writeText(props.textToCopy);
    setCopied(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => setCopied(false), 2_000);
  };

  return (
    <div
      class="cursor-pointer rounded-md border border-gray-200 bg-white p-3 text-center transition-colors hover:bg-gray-50"
      onClick={copyText}
      title="Click to copy"
    >
      <code class="text-lg font-bold text-blue-600">{props.textToCopy}</code>

      <div class="mt-1 text-xs text-gray-500">
        <Show when={copied()} fallback="Click to copy">
          Copied!
        </Show>
      </div>
    </div>
  );
};
