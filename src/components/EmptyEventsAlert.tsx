import { getTranslate } from '@/tolgee/server';

export const EmptyEventsAlert = async () => {
  const t = await getTranslate();

  return (
    <p className="text-center font-bold">{t('empty_events_alert.message')}</p>
  );
};
