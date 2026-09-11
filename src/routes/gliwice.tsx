import { PageMeta } from '@/components/PageMeta';

export default function GliwicePage() {
  return (
    <>
      <PageMeta
        title="meet.js Gliwice"
        description="JavaScript meetups in Gliwice"
        path="/gliwice"
      />
      <div class="prose dark:prose-invert my-8 max-w-none space-y-8">
        <h1>Gliwice</h1>
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
