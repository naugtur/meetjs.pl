import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import { Dynamic } from '@solidjs/web';

type IconNode = [string, Record<string, string | number>][];

export interface LucideIconProps {
  class?: string;
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
  title?: string;
  'aria-hidden'?: 'true' | 'false';
}

function icon(node: IconNode) {
  return (props: LucideIconProps): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color ?? 'currentColor'}
      stroke-width={props.strokeWidth ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
      role={props.title ? 'img' : undefined}
      aria-hidden={props['aria-hidden'] ?? (props.title ? undefined : 'true')}
    >
      {props.title ? <title>{props.title}</title> : null}
      <For each={node}>
        {([tag, attrs]) => <Dynamic component={tag} {...attrs} />}
      </For>
    </svg>
  );
}

export const ArrowLeft = icon([
  ['path', { d: 'm12 19-7-7 7-7' }],
  ['path', { d: 'M19 12H5' }],
]);
export const ArrowRight = icon([
  ['path', { d: 'M5 12h14' }],
  ['path', { d: 'm12 5 7 7-7 7' }],
]);
export const Award = icon([
  [
    'path',
    {
      d: 'm15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526',
    },
  ],
  ['circle', { cx: '12', cy: '8', r: '6' }],
]);
export const BookOpen = icon([
  ['path', { d: 'M12 5v16' }],
  [
    'path',
    {
      d: 'M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z',
    },
  ],
]);
export const Bot = icon([
  ['path', { d: 'M12 8V4H8' }],
  ['rect', { width: '16', height: '12', x: '4', y: '8', rx: '2' }],
  ['path', { d: 'M2 14h2' }],
  ['path', { d: 'M20 14h2' }],
  ['path', { d: 'M15 13v2' }],
  ['path', { d: 'M9 13v2' }],
]);
export const Calendar = icon([
  ['path', { d: 'M8 2v3' }],
  ['path', { d: 'M16 2v3' }],
  ['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }],
  ['path', { d: 'M3 9h18' }],
]);
export const CalendarDays = icon([
  ['path', { d: 'M8 2v3' }],
  ['path', { d: 'M16 2v3' }],
  ['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }],
  ['path', { d: 'M3 9h18' }],
  ['path', { d: 'M8 13h.01' }],
  ['path', { d: 'M12 13h.01' }],
  ['path', { d: 'M16 13h.01' }],
  ['path', { d: 'M8 17h.01' }],
  ['path', { d: 'M12 17h.01' }],
  ['path', { d: 'M16 17h.01' }],
]);
export const Camera = icon([
  [
    'path',
    {
      d: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z',
    },
  ],
  ['circle', { cx: '12', cy: '13', r: '3' }],
]);
export const Check = icon([['path', { d: 'M20 6 9 17l-5-5' }]]);
export const CheckCircle = icon([
  ['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335' }],
  ['path', { d: 'm9 11 3 3L22 4' }],
]);
export const ChevronDown = icon([['path', { d: 'm6 9 6 6 6-6' }]]);
export const ChevronRight = icon([['path', { d: 'm9 18 6-6-6-6' }]]);
export const Code = icon([
  ['path', { d: 'm16 18 6-6-6-6' }],
  ['path', { d: 'm8 6-6 6 6 6' }],
]);
export const Compass = icon([
  ['circle', { cx: '12', cy: '12', r: '10' }],
  [
    'path',
    {
      d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
    },
  ],
]);
export const Copy = icon([
  ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }],
  ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }],
]);
export const Download = icon([
  ['path', { d: 'M12 15V3' }],
  ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }],
  ['path', { d: 'm7 10 5 5 5-5' }],
]);
export const ExternalLink = icon([
  ['path', { d: 'M15 3h6v6' }],
  ['path', { d: 'M10 14 21 3' }],
  ['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }],
]);
export const FileText = icon([
  [
    'path',
    {
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
  ],
  ['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5' }],
  ['path', { d: 'M10 9H8' }],
  ['path', { d: 'M16 13H8' }],
  ['path', { d: 'M16 17H8' }],
]);
export const Filter = icon([
  [
    'path',
    {
      d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z',
    },
  ],
]);
export const Gift = icon([
  ['path', { d: 'M12 7v14' }],
  ['path', { d: 'M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8' }],
  [
    'path',
    {
      d: 'M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5',
    },
  ],
  ['rect', { x: '3', y: '7', width: '18', height: '4', rx: '1' }],
]);
export const Handshake = icon([
  ['path', { d: 'm11 17 2 2a1 1 0 1 0 3-3' }],
  [
    'path',
    {
      d: 'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
    },
  ],
  ['path', { d: 'm21 3 1 11h-2' }],
  ['path', { d: 'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3' }],
  ['path', { d: 'M3 4h8' }],
]);
export const Heart = icon([
  [
    'path',
    {
      d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
    },
  ],
]);
export const Image = icon([
  ['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2' }],
  ['circle', { cx: '9', cy: '9', r: '2' }],
  ['path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' }],
]);
export const Mail = icon([
  ['path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' }],
  ['rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }],
]);
export const MapPin = icon([
  [
    'path',
    {
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
  ],
  ['circle', { cx: '12', cy: '10', r: '3' }],
]);
export const MessagesSquare = icon([
  [
    'path',
    {
      d: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
    },
  ],
  [
    'path',
    {
      d: 'M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1',
    },
  ],
]);
export const Mic = icon([
  ['path', { d: 'M12 19v3' }],
  ['path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2' }],
  ['rect', { x: '9', y: '2', width: '6', height: '13', rx: '3' }],
]);
export const Monitor = icon([
  ['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2' }],
  ['line', { x1: '8', x2: '16', y1: '21', y2: '21' }],
  ['line', { x1: '12', x2: '12', y1: '17', y2: '21' }],
]);
export const Rocket = icon([
  ['path', { d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' }],
  [
    'path',
    {
      d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09',
    },
  ],
  [
    'path',
    {
      d: 'M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z',
    },
  ],
  ['path', { d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05' }],
]);
export const Shield = icon([
  [
    'path',
    {
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
  ],
]);
export const Sparkles = icon([
  [
    'path',
    {
      d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
    },
  ],
  ['path', { d: 'M20 2v4' }],
  ['path', { d: 'M22 4h-4' }],
  ['circle', { cx: '4', cy: '20', r: '2' }],
]);
export const Star = icon([
  [
    'path',
    {
      d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
    },
  ],
]);
export const Sun = icon([
  ['circle', { cx: '12', cy: '12', r: '4' }],
  ['path', { d: 'M12 2v2' }],
  ['path', { d: 'M12 20v2' }],
  ['path', { d: 'm4.93 4.93 1.41 1.41' }],
  ['path', { d: 'm17.66 17.66 1.41 1.41' }],
  ['path', { d: 'M2 12h2' }],
  ['path', { d: 'M20 12h2' }],
  ['path', { d: 'm6.34 17.66-1.41 1.41' }],
  ['path', { d: 'm19.07 4.93-1.41 1.41' }],
]);
export const TestTube = icon([
  [
    'path',
    { d: 'M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2' },
  ],
  ['path', { d: 'M8.5 2h7' }],
  ['path', { d: 'M14.5 16h-5' }],
]);
export const Ticket = icon([
  [
    'path',
    {
      d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
  ],
  ['path', { d: 'M13 5v2' }],
  ['path', { d: 'M13 17v2' }],
  ['path', { d: 'M13 11v2' }],
]);
export const TrendingUp = icon([
  ['path', { d: 'M16 7h6v6' }],
  ['path', { d: 'm22 7-8.5 8.5-5-5L2 17' }],
]);
export const Trophy = icon([
  ['path', { d: 'M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2' }],
  ['path', { d: 'M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2' }],
  ['path', { d: 'M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3' }],
  ['path', { d: 'M4 22h16' }],
  ['path', { d: 'M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z' }],
  ['path', { d: 'M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3' }],
]);
export const Tv = icon([
  ['path', { d: 'm17 2-5 5-5-5' }],
  ['rect', { width: '20', height: '15', x: '2', y: '7', rx: '2' }],
]);
export const Users = icon([
  ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }],
  ['path', { d: 'M16 3.128a4 4 0 0 1 0 7.744' }],
  ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }],
  ['circle', { cx: '9', cy: '7', r: '4' }],
]);
export const Video = icon([
  [
    'path',
    {
      d: 'm16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5',
    },
  ],
  ['rect', { x: '2', y: '6', width: '14', height: '12', rx: '2' }],
]);
export const X = icon([
  ['path', { d: 'M18 6 6 18' }],
  ['path', { d: 'm6 6 12 12' }],
]);
