interface AISyncLogoProps {
  className?: string;
}

export function AISyncLogo({ className = '' }: AISyncLogoProps) {
  return (
    <a
      href="https://www.aisyncconf.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 no-underline ${className}`}
    >
      <span
        className="text-xl font-bold tracking-tight"
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          color: '#0E0B1A',
        }}
      >
        AI Sync
        <span style={{ color: '#D930E8' }}>_</span>
      </span>
      <span
        className="inline-block px-2 py-0.5 text-xs font-bold tracking-tight"
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
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
