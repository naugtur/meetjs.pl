import { createSignal, Show } from 'solid-js';
import { useTranslate } from '@/i18n';

interface LogoProps {
  clickable?: boolean;
}

export const Logo = (props: LogoProps) => {
  const { t } = useTranslate();
  const [showContextMenu, setShowContextMenu] = createSignal(false);
  const [contextMenuPosition, setContextMenuPosition] = createSignal({
    x: 0,
    y: 0,
  });

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleClickOutside = () => {
    setShowContextMenu(false);
  };

  const now = new Date();
  const isChristmasSeason =
    now.getMonth() === 11 || (now.getMonth() === 0 && now.getDate() <= 15);

  const logoImage = (
    <img
      src={isChristmasSeason ? '/christmas_logo.svg' : '/logo.svg'}
      alt="meet.js Logo"
      width={150}
      height={40}
      class="p-4"
      onContextMenu={handleRightClick}
      style={{ 'user-select': 'none' }}
    />
  );

  const clickable = () => props.clickable ?? true;

  return (
    <>
      <Show when={clickable()} fallback={logoImage}>
        <a href="/" class="flex items-center">
          {logoImage}
        </a>
      </Show>

      <Show when={showContextMenu()}>
        <div class="fixed inset-0 z-[60]" onClick={handleClickOutside} />
        <div
          class="fixed z-[70] min-w-[200px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
          style={{
            left: `${contextMenuPosition().x}px`,
            top: `${contextMenuPosition().y}px`,
          }}
        >
          <div class="border-b border-gray-100 px-4 py-2 text-sm text-gray-700">
            <div class="font-medium">
              {t('logo_component.context_menu_title')}
            </div>
            <div class="mt-1 text-xs text-gray-500">
              {t('logo_component.context_menu_subtitle')}
            </div>
          </div>
          <a
            href="/brand"
            onClick={handleClickOutside}
            class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            📦 {t('logo_component.go_to_brand_assets')}
          </a>
        </div>
      </Show>
    </>
  );
};
