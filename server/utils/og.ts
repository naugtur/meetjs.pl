// Helpers for OG images rendered with @vercel/og (satori), the renderer
// behind next/og.
import type { ImageResponse } from '@vercel/og';

/** What ImageResponse expects (typed as a React element by @vercel/og). */
export type OgElement = ConstructorParameters<typeof ImageResponse>[0];

export interface OgNode {
  type: string;
  props: Record<string, unknown>;
}

type OgChild = OgNode | string | number | false;

/** Builds a satori element like JSX would (`false` children are dropped). */
export const ogNode = (
  type: string,
  props: Record<string, unknown>,
  ...children: OgChild[]
): OgNode => {
  const kept = children.filter((child) => child !== false);
  return {
    type,
    props: {
      ...props,
      ...(kept.length > 0 && { children: kept.length === 1 ? kept[0] : kept }),
    },
  };
};

/**
 * The meet.js logo as a data URI, so OG images render without fetching it
 * (satori fetches <img> sources at render time).
 */
export const getLogoDataUri = async (): Promise<string> => {
  const svg = await useStorage('assets:og').getItemRaw('logo.svg');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};
