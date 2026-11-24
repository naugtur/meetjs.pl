import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Handshake,
  Mail,
  Users,
} from 'lucide-react';
import { getTranslate } from '@/tolgee/server';
import { OrganizerLink } from '@/components/OrganizerLink';
import { FAQ } from '@/components/FAQ';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function Page() {
  const t = await getTranslate();
  const primaryButton = cn(
    buttonVariants(),
    'h-auto min-h-11 max-w-full whitespace-normal bg-green px-6 py-3 text-center text-purple hover:bg-green/80',
  );
  const secondaryButton = cn(
    buttonVariants({ variant: 'outline' }),
    'h-auto min-h-11 max-w-full whitespace-normal border-purple/20 bg-white px-5 py-3 text-center text-purple hover:bg-green/20',
  );
  const paths = [
    {
      id: 'one-event',
      icon: Handshake,
      title: t('organizer.recruitment.paths.one_event.title'),
      description: t('organizer.recruitment.paths.one_event.description'),
      intent: t('organizer.recruitment.paths.one_event.intent'),
      cta: t('organizer.recruitment.paths.one_event.cta'),
    },
    {
      id: 'local-team',
      icon: Users,
      title: t('organizer.recruitment.paths.local_team.title'),
      description: t('organizer.recruitment.paths.local_team.description'),
      intent: t('organizer.recruitment.paths.local_team.intent'),
      cta: t('organizer.recruitment.paths.local_team.cta'),
    },
    {
      id: 'new-city',
      icon: Building2,
      title: t('organizer.recruitment.paths.new_city.title'),
      description: t('organizer.recruitment.paths.new_city.description'),
      intent: t('organizer.recruitment.paths.new_city.intent'),
      cta: t('organizer.recruitment.paths.new_city.cta'),
    },
  ] as const;
  const support = [
    {
      id: 'instructions',
      icon: BookOpen,
      title: t('organizer.recruitment.support.instructions.title'),
      description: t('organizer.recruitment.support.instructions.description'),
    },
    {
      id: 'venue',
      icon: Building2,
      title: t('organizer.recruitment.support.venue.title'),
      description: t('organizer.recruitment.support.venue.description'),
    },
    {
      id: 'costs',
      icon: Handshake,
      title: t('organizer.recruitment.support.costs.title'),
      description: t('organizer.recruitment.support.costs.description'),
    },
  ];
  const steps = [
    {
      id: 'write',
      title: t('organizer.recruitment.process.write.title'),
      description: t('organizer.recruitment.process.write.description'),
    },
    {
      id: 'talk',
      title: t('organizer.recruitment.process.talk.title'),
      description: t('organizer.recruitment.process.talk.description'),
    },
    {
      id: 'start',
      title: t('organizer.recruitment.process.start.title'),
      description: t('organizer.recruitment.process.start.description'),
    },
  ];
  const questions = [
    {
      id: 'experience',
      question: t('organizer.recruitment.faq.experience.question'),
      answer: t('organizer.recruitment.faq.experience.answer'),
    },
    {
      id: 'one_event',
      question: t('organizer.recruitment.faq.one_event.question'),
      answer: t('organizer.recruitment.faq.one_event.answer'),
    },
    {
      id: 'budget',
      question: t('organizer.recruitment.faq.budget.question'),
      answer: t('organizer.recruitment.faq.budget.answer'),
    },
    {
      id: 'sponsor',
      question: t('organizer.recruitment.faq.sponsor.question'),
      answer: t('organizer.recruitment.faq.sponsor.answer'),
    },
    {
      id: 'contact',
      question: t('organizer.recruitment.faq.contact.question'),
      answer: t('organizer.recruitment.faq.contact.answer'),
    },
  ];
  const subject = t('organizer.recruitment.email.subject');
  const emailBody = (intent: string) =>
    `${t('organizer.recruitment.email.greeting')}\n\n${intent}\n\n${t('organizer.recruitment.email.fields')}`;
  const generalBody = emailBody(t('organizer.recruitment.email.general'));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple">
            {t('organizer.recruitment.eyebrow')}
          </p>
          <h1 className="text-balance text-3xl font-bold leading-tight text-purple sm:text-4xl lg:text-5xl">
            {t('organizer.recruitment.title')}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-gray-600">
            {t('organizer.recruitment.description')}
          </p>
          {/* Quick Start CTA */}
          <div className="mt-6">
            <OrganizerLink
              kind="contact"
              source="organizer-hero"
              intent="general"
              subject={subject}
              body={generalBody}
              className={primaryButton}
            >
              <Mail aria-hidden="true" className="mr-2 h-5 w-5 shrink-0" />
              {t('organizer.recruitment.contact_cta')}
            </OrganizerLink>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {t('organizer.recruitment.contact_hint')}{' '}
              <a
                className="rounded underline underline-offset-4 hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                href="mailto:contact@meetjs.pl"
              >
                contact@meetjs.pl
              </a>
            </p>
          </div>
        </div>
        {/* Hero Image */}
        <Image
          src="/about/meetjs-organizers.jpg"
          alt={t('organizer.recruitment.image_alt')}
          width={1024}
          height={680}
          className="h-56 w-full rounded-2xl object-cover shadow-sm sm:h-72 lg:h-96"
        />
      </div>

      {/* Introduction */}
      <section className="mt-14" aria-labelledby="organizer-paths">
        <h2
          id="organizer-paths"
          className="scroll-mt-24 text-balance text-2xl font-bold text-purple sm:text-3xl"
        >
          {t('organizer.recruitment.paths_title')}
        </h2>
        <p className="mt-3 max-w-2xl text-gray-600">
          {t('organizer.recruitment.paths_description')}
        </p>
        {/* What is Organizer? */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {paths.map(({ id, icon: Icon, title, description, intent, cta }) => (
            <div
              key={id}
              className="flex min-w-0 flex-col rounded-2xl border border-purple/10 bg-white p-6 shadow-sm"
            >
              <Icon aria-hidden="true" className="mb-4 h-7 w-7 text-purple" />
              <h3 className="text-xl font-semibold text-purple">{title}</h3>
              <p className="mb-6 mt-3 flex-1 leading-relaxed text-gray-600">
                {description}
              </p>
              <OrganizerLink
                kind="contact"
                source="organizer-path"
                intent={id}
                subject={`${subject} — ${title}`}
                body={emailBody(intent)}
                className={secondaryButton}
              >
                {cta}
                <ArrowRight
                  aria-hidden="true"
                  className="ml-2 h-4 w-4 shrink-0"
                />
              </OrganizerLink>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section
        className="mt-14 rounded-2xl bg-purple p-6 text-white sm:p-8"
        aria-labelledby="organizer-support"
      >
        <h2
          id="organizer-support"
          className="scroll-mt-24 text-balance text-2xl font-bold sm:text-3xl"
        >
          {t('organizer.recruitment.support_title')}
        </h2>
        <div className="mt-7 grid gap-8 md:grid-cols-3">
          {support.map(({ id, icon: Icon, title, description }) => (
            <div key={id}>
              <Icon aria-hidden="true" className="mb-4 h-7 w-7 text-green" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-white/85">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section
        className="mt-8 rounded-2xl border border-purple/10 p-6 sm:p-8"
        aria-labelledby="organizer-community"
      >
        <h2
          id="organizer-community"
          className="scroll-mt-24 text-xl font-semibold text-purple"
        >
          {t('organizer.recruitment.community_title')}
        </h2>
        <p className="mt-3 leading-relaxed text-gray-600">
          {t('organizer.recruitment.community_description')}
        </p>
      </section>

      {/* Process */}
      <section className="mt-14" aria-labelledby="organizer-process">
        <h2
          id="organizer-process"
          className="scroll-mt-24 text-2xl font-bold text-purple sm:text-3xl"
        >
          {t('organizer.recruitment.process_title')}
        </h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map(({ id, title, description }, index) => (
            <li key={id} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green font-bold text-purple"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-purple">{title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10">
        <FAQ questions={questions} />
      </div>

      {/* CTA Section */}
      <section
        className="mt-8 rounded-2xl bg-green/20 p-6 text-center sm:p-8"
        aria-labelledby="organizer-contact"
      >
        <h2
          id="organizer-contact"
          className="scroll-mt-24 text-balance text-2xl font-bold text-purple"
        >
          {t('organizer.recruitment.final_title')}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          {t('organizer.recruitment.final_description')}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OrganizerLink
            kind="contact"
            source="organizer-footer"
            intent="general"
            subject={subject}
            body={generalBody}
            className={primaryButton}
          >
            {t('organizer.recruitment.contact_cta')}
          </OrganizerLink>
          <Link href="/organizers" className={secondaryButton}>
            {t('organizer.final_cta.view_resources')}
          </Link>
        </div>
      </section>
    </main>
  );
}
