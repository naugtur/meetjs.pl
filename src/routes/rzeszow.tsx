import { PageMeta } from '@/components/PageMeta';

export default function RzeszowPage() {
  return (
    <>
      <PageMeta
        title="meet.js Rzeszów"
        description="JavaScript meetups in Rzeszów"
        path="/rzeszow"
      />
      <div class="prose dark:prose-invert my-8 max-w-none space-y-8">
        <h1>Rzeszów</h1>
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
