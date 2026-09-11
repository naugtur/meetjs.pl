import { PageMeta } from '@/components/PageMeta';

export default function ZielonagoraPage() {
  return (
    <>
      <PageMeta
        title="meet.js Zielona Góra"
        description="JavaScript meetups in Zielona Góra"
        path="/zielona-gora"
      />
      <div class="prose dark:prose-invert my-8 max-w-none space-y-8">
        <h1>Zielona Góra</h1>
        <p>
          We're looking for organizers!{' '}
          <a href="mailto:contact@meetjs.pl">
            Let us know if you want to help.
          </a>
        </p>
      </div>
    </>
  );
}
