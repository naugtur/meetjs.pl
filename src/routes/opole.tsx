import { PageMeta } from '@/components/PageMeta';

export default function OpolePage() {
  return (
    <>
      <PageMeta
        title="meet.js Opole"
        description="JavaScript meetups in Opole"
        path="/opole"
      />
      <div class="prose dark:prose-invert my-8 max-w-none space-y-8">
        <h1>Opole</h1>
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
