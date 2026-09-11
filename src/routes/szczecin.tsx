import { PageMeta } from '@/components/PageMeta';

export default function SzczecinPage() {
  return (
    <>
      <PageMeta
        title="meet.js Szczecin"
        description="JavaScript meetups in Szczecin"
        path="/szczecin"
      />
      <div class="prose dark:prose-invert my-8 max-w-none space-y-8">
        <h1>Szczecin</h1>
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
