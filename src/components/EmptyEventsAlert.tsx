import { getTranslate } from '@/tolgee/server';
import { OrganizerLink } from '@/components/OrganizerLink';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const EmptyEventsAlert = async () => {
  const t = await getTranslate();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="font-bold">{t('empty_events_alert.message')}</p>
      <OrganizerLink
        source="empty-events"
        className={cn(
          buttonVariants(),
          'h-auto min-h-11 max-w-full whitespace-normal bg-green px-5 py-3 text-purple hover:bg-green/80',
        )}
      >
        {t('empty_events_alert.organize_cta')}
      </OrganizerLink>
    </div>
  );
};
