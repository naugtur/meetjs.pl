interface AISyncLogoProps {
  class?: string;
}

export function AISyncLogo(props: AISyncLogoProps) {
  return (
    <a
      href="https://www.aisyncconf.com"
      target="_blank"
      rel="noopener"
      class={`inline-flex items-center gap-2.5 no-underline ${props.class ?? ''}`}
    >
      <span
        class="text-xl font-bold tracking-tight"
        style={{
          'font-family': "'Space Grotesk', system-ui, sans-serif",
          color: '#0E0B1A',
        }}
      >
        AI Sync
        <span style={{ color: '#D930E8' }}>_</span>
      </span>
      <span
        class="inline-block px-2 py-0.5 text-xs font-bold tracking-tight"
        style={{
          'font-family': "'Space Grotesk', system-ui, sans-serif",
          background: '#2DF4C4',
          color: '#0E0B1A',
        }}
      >
        Warsaw
      </span>
    </a>
  );
}

export default AISyncLogo;
