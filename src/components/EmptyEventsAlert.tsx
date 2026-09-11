import { useTranslate } from '@/i18n';

export const EmptyEventsAlert = () => {
  const { t } = useTranslate();

  return <p class="text-center font-bold">{t('empty_events_alert.message')}</p>;
};
