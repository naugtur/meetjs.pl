import { PageMeta } from '@/components/PageMeta';

export default function KielcePage() {
  return (
    <>
      <PageMeta
        title="meet.js Kielce"
        description="JavaScript meetups in Kielce"
        path="/kielce"
      />
      <div class="prose dark:prose-invert my-8 max-w-none space-y-8">
        <h1>Kielce</h1>
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
