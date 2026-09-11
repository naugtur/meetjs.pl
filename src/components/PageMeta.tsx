import { Link, Meta, Title } from '@solidjs/meta';
import { SITE_URL } from '@/lib/site';

interface PageMetaProps {
  title: string;
  description: string;
  /** Canonical path, e.g. `/about` */
  path: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
}

// Shared page metadata: title, description, canonical, Open Graph + Twitter
// card — the Solid equivalent of the old Next.js `metadata` exports.
export const PageMeta = (props: PageMetaProps) => {
  const url = () => `${SITE_URL}${props.path}`;
  const ogImage = () => {
    const image = props.ogImage ?? '/api/og';
    return image.startsWith('http') ? image : `${SITE_URL}${image}`;
  };
  const ogImageAlt = () => props.ogImageAlt ?? props.title;
  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      {props.keywords && <Meta name="keywords" content={props.keywords} />}
      <Link rel="canonical" href={url()} />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:type" content="website" />
      <Meta property="og:locale" content="en_US" />
      <Meta property="og:url" content={url()} />
      <Meta property="og:site_name" content="meet.js" />
      <Meta property="og:image" content={ogImage()} />
      <Meta property="og:image:width" content="1200" />
      <Meta property="og:image:height" content="630" />
      <Meta property="og:image:alt" content={ogImageAlt()} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content="@meetjs" />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="twitter:image" content={ogImage()} />
      <Meta name="twitter:image:alt" content={ogImageAlt()} />
    </>
  );
};
