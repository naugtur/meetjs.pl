import { For } from 'solid-js';
import { FaBrandsGithub, FaSolidDownload } from 'solid-icons/fa';
import { useTranslate } from '@/i18n';

type AssetItem = {
  name: string;
  path: string;
  description?: string;
  dimensions?: string;
  fileSize?: string;
};

type ColorItem = {
  name: string;
  hex: string;
  rgb: string;
  description?: string;
};

const BrandPage = () => {
  const { t } = useTranslate();
  const officialLogos: AssetItem[] = [
    // Light/Official Variants (Primary)
    {
      name: 'meet.js Official Logo (Color SVG)',
      path: '/assets/brand/logo/light-default/meetjs_logo_color_light.svg',
      description: 'Official meet.js logo - primary version for digital use',
      fileSize: '2.4 KB',
    },
    {
      name: 'meet.js Official Logo (White SVG)',
      path: '/assets/brand/logo/light-default/meetjs_logo_white_light.svg',
      description: 'Official logo with white text for dark backgrounds',
      fileSize: '2.4 KB',
    },
    {
      name: 'meet.js Official Logo (White Alt SVG)',
      path: '/assets/brand/logo/light-default/meetjs_logo_white2_light.svg',
      description: 'Alternative official logo with white text',
      fileSize: '2.3 KB',
    },
    {
      name: 'meet.js Official Logo (Color PNG)',
      path: '/assets/brand/logo/light-default/logo_meetjs_color_light.png',
      description: 'Official logo with color in PNG format',
      fileSize: '24 KB',
    },
    {
      name: 'meet.js Official Logo (White PNG)',
      path: '/assets/brand/logo/light-default/logo_meetjs_white_light.png',
      description: 'Official logo with white text in PNG format',
      fileSize: '23 KB',
    },
    {
      name: 'meet.js Official Logo (White Alt PNG)',
      path: '/assets/brand/logo/light-default/logo_meetjs_white2_light.png',
      description: 'Alternative official logo with white text in PNG format',
      fileSize: '22 KB',
    },
    // Square Light Variants
    {
      name: 'meet.js Square Logo (Light Variant 1)',
      path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_Light_XS-01.svg',
      description: 'Square light variant for small spaces and icons',
      fileSize: '1.4 KB',
    },
    {
      name: 'meet.js Square Logo (Light Variant 2)',
      path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_Light_XS-02.svg',
      description: 'Alternative square light variant',
      fileSize: '1.5 KB',
    },
  ];

  const boldLogos: AssetItem[] = [
    // Bold Variants (For Print & Special Cases)
    {
      name: 'meet.js Bold Logo (Color SVG)',
      path: '/assets/brand/logo/bold/meetjs_logo_color_bold.svg',
      description:
        'Bold variant for prints and places where the official light logo would not be visible enough',
      fileSize: '2.5 KB',
    },
    {
      name: 'meet.js Bold Logo (White SVG)',
      path: '/assets/brand/logo/bold/meetjs_logo_white_bold.svg',
      description:
        'Bold variant with white text for dark backgrounds in print materials',
      fileSize: '2.5 KB',
    },
    {
      name: 'meet.js Bold Logo (White Alt SVG)',
      path: '/assets/brand/logo/bold/meetjs_logo_white2_bold.svg',
      description:
        'Alternative bold variant with white text for print materials',
      fileSize: '2.4 KB',
    },
    {
      name: 'meet.js Bold Logo (Color PNG)',
      path: '/assets/brand/logo/bold/logo_meetjs_color_bold.png',
      description: 'Bold variant with color in PNG format for print materials',
      fileSize: '24 KB',
    },
    {
      name: 'meet.js Bold Logo (White PNG)',
      path: '/assets/brand/logo/bold/logo_meetjs_white_bold.png',
      description:
        'Bold variant with white text in PNG format for print materials',
      fileSize: '24 KB',
    },
    {
      name: 'meet.js Bold Logo (White Alt PNG)',
      path: '/assets/brand/logo/bold/logo_meetjs_white2_bold.png',
      description:
        'Alternative bold variant with white text in PNG format for print materials',
      fileSize: '23 KB',
    },
    // Square Bold Variants
    {
      name: 'meet.js Square Logo (Bold Variant 1)',
      path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_bold_XS-01.svg',
      description: 'Square bold variant for small spaces and icons',
      fileSize: '1.6 KB',
    },
    {
      name: 'meet.js Square Logo (Bold Variant 2)',
      path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_bold_XS-02.svg',
      description: 'Alternative square bold variant',
      fileSize: '1.7 KB',
    },
  ];

  const legacyLogos: AssetItem[] = [
    // Pre-2023 Variants
    {
      name: 'meet.js Legacy Logo (Purple SVG)',
      path: '/assets/brand/pre-2023/logo/meetjs-logo-purple.svg',
      description: 'Original pre-2023 logo with purple background',
      fileSize: '3 KB',
    },
    {
      name: 'meet.js Legacy Logo (White SVG)',
      path: '/assets/brand/pre-2023/logo/meetjs-logo-white.svg',
      description: 'Original pre-2023 logo with white background',
      fileSize: '3 KB',
    },
    {
      name: 'meet.js Legacy Logo (Purple PNG)',
      path: '/assets/brand/pre-2023/logo/meetjs-logo-purple.png',
      description:
        'Original pre-2023 logo with purple background in PNG format',
      fileSize: '27 KB',
    },
    {
      name: 'meet.js Legacy Logo (White PNG)',
      path: '/assets/brand/pre-2023/logo/meetjs-logo-white.png',
      description: 'Original pre-2023 logo with white background in PNG format',
      fileSize: '25 KB',
    },
  ];

  const wallpapers: AssetItem[] = [
    {
      name: 'meet.js Desktop Wallpaper',
      path: '/brand/wallpapers/meetjs-wallpaper-1920x1080.png',
      description: 'Desktop wallpaper with meet.js branding',
      dimensions: '1920 × 1080',
      fileSize: '42 KB',
    },
    {
      name: 'meet.js Cover Image',
      path: '/brand/wallpapers/meetjs_cover.jpeg',
      description: 'Cover image for social media and presentations',
      dimensions: 'Widescreen',
      fileSize: '268 KB',
    },
  ];

  const currentColors: ColorItem[] = [
    {
      name: 'Purple',
      hex: '#2B1932',
      rgb: 'rgb(43, 25, 50)',
      description: 'Primary background color',
    },
    {
      name: 'Green',
      hex: '#BCD35D',
      rgb: 'rgb(188, 211, 93)',
      description: 'Accent color for highlights and CTAs',
    },
    {
      name: 'Blue',
      hex: '#219EAB',
      rgb: 'rgb(33, 158, 171)',
      description: 'Secondary accent color',
    },
  ];

  const originalColors: ColorItem[] = [
    {
      name: 'Purple',
      hex: '#2B1C34',
      rgb: 'rgb(43, 28, 52)',
      description: 'Primary background color',
    },
    {
      name: 'Green',
      hex: '#BDDB59',
      rgb: 'rgb(189, 219, 89)',
      description: 'Accent color for highlights and CTAs',
    },
    {
      name: 'Blue',
      hex: '#249FAB',
      rgb: 'rgb(36, 159, 171)',
      description: 'Secondary accent color',
    },
  ];

  return (
    <div class="container mx-auto px-4 py-12">
      <div class="mx-auto max-w-6xl px-4 py-8">
        <div class="mb-8 text-center">
          <h1 class="mb-4 text-4xl font-bold">{t('brand.page_title')}</h1>
          <p class="text-xl text-gray-600">{t('brand.page_subtitle')}</p>
          <div class="mt-4 inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            <span>👥</span>
            <span>
              {t('brand.organizers_only_note')}{' '}
              <a
                href="/how-to-become-an-organizer/tools"
                class="underline hover:no-underline"
              >
                {t('brand.organizers_tools_cta')}
              </a>
            </span>
          </div>
        </div>

        {/* Table of Contents */}
        <div class="mb-12 rounded-lg bg-gray-50 p-6">
          <h2 class="mb-4 text-xl font-semibold">{t('brand.page_contents')}</h2>
          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <a
              href="#guidelines"
              class="flex items-center gap-2 rounded-md bg-white p-3 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
            >
              <span class="text-2xl">📋</span>
              <div>
                <div class="font-medium">{t('brand.usage_guidelines')}</div>
                <div class="text-sm text-gray-600">
                  {t('brand.brand_usage_rules')}
                </div>
              </div>
            </a>
            <a
              href="#logos"
              class="flex items-center gap-2 rounded-md bg-white p-3 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
            >
              <span class="text-2xl">🎨</span>
              <div>
                <div class="font-medium">{t('brand.logos_section')}</div>
                <div class="text-sm text-gray-600">
                  {t('brand.official_print_variants')}
                </div>
              </div>
            </a>

            <a
              href="#colors"
              class="flex items-center gap-2 rounded-md bg-white p-3 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
            >
              <span class="text-2xl">🎨</span>
              <div>
                <div class="font-medium">{t('brand.colors')}</div>
                <div class="text-sm text-gray-600">
                  {t('brand.current_legacy_colors')}
                </div>
              </div>
            </a>
            <a
              href="#wallpapers"
              class="flex items-center gap-2 rounded-md bg-white p-3 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
            >
              <span class="text-2xl">🖼️</span>
              <div>
                <div class="font-medium">{t('brand.wallpapers')}</div>
                <div class="text-sm text-gray-600">
                  {t('brand.desktop_backgrounds')}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <section id="guidelines" class="mb-16">
        <h2 class="mb-6 border-b pb-2 text-3xl font-bold">
          {t('brand.brand_usage_guidelines')}
        </h2>

        <div class="mb-8">
          <p class="mb-6 text-lg text-gray-700">{t('brand.usage_intro')}</p>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          {/* Permitted Uses */}
          <div class="rounded-lg border border-green-200 bg-green-50 p-6">
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-xl font-bold text-green-800">
                {t('brand.allowed_uses')}
              </h3>
            </div>
            <ul class="space-y-3 text-green-700">
              <li class="flex items-start gap-2">
                <span class="mt-1 text-green-600">•</span>
                <span>{t('brand.allowed_list.educational')}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-green-600">•</span>
                <span>{t('brand.allowed_list.community')}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-green-600">•</span>
                <span>{t('brand.allowed_list.social_media')}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-green-600">•</span>
                <span>{t('brand.allowed_list.press')}</span>
              </li>
            </ul>
          </div>

          {/* Prohibited Uses */}
          <div class="rounded-lg border border-red-200 bg-red-50 p-6">
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">❌</span>
              <h3 class="text-xl font-bold text-red-800">
                {t('brand.prohibited_uses')}
              </h3>
            </div>
            <ul class="space-y-3 text-red-700">
              <li class="flex items-start gap-2">
                <span class="mt-1 text-red-600">•</span>
                <span>{t('brand.prohibited_list.modification')}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-red-600">•</span>
                <span>{t('brand.prohibited_list.commercial')}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-red-600">•</span>
                <span>{t('brand.prohibited_list.misleading')}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-red-600">•</span>
                <span>{t('brand.prohibited_list.inappropriate')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Name Usage Note */}
        <div class="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 class="mb-3 text-xl font-bold text-blue-800">
            {t('brand.brand_name_note')}
          </h3>
          <p class="text-blue-700">{t('brand.brand_name_lowercase')}</p>
        </div>
      </section>

      <section id="logos" class="mb-16">
        <h2 class="mb-6 border-b pb-2 text-3xl font-bold">
          {t('brand.logos_section')}
        </h2>

        <h3 class="mb-6 text-2xl font-bold">
          {t('brand.logo_usage_guidelines')}
        </h3>
        <div class="mb-8 rounded-lg bg-blue-50 p-6">
          <p class="mb-4">{t('brand.logo_variants_intro')}</p>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-lg bg-white p-4 shadow-sm">
              <h4 class="mb-2 text-lg font-semibold text-green-700">
                {t('brand.light_logos_official')}
              </h4>
              <p class="mb-2 text-sm text-gray-700">
                {t('brand.light_logos_description')}
              </p>
              <ul class="text-sm text-gray-600">
                <li>• {t('brand.light_logos_use_1')}</li>
                <li>• {t('brand.light_logos_use_2')}</li>
                <li>• {t('brand.light_logos_use_3')}</li>
                <li>• {t('brand.light_logos_use_4')}</li>
              </ul>
            </div>
            <div class="rounded-lg bg-white p-4 shadow-sm">
              <h4 class="mb-2 text-lg font-semibold text-orange-700">
                {t('brand.bold_logos_print')}
              </h4>
              <p class="mb-2 text-sm text-gray-700">
                {t('brand.bold_logos_description')}
              </p>
              <ul class="text-sm text-gray-600">
                <li>• {t('brand.bold_logos_use_1')}</li>
                <li>• {t('brand.bold_logos_use_2')}</li>
                <li>• {t('brand.bold_logos_use_3')}</li>
                <li>• {t('brand.bold_logos_use_4')}</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="mb-4 text-2xl font-bold">{t('brand.light_logos')}</h3>
        <div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {
            <For each={officialLogos}>
              {(logo) => (
                <div class="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
                  <div class="flex h-48 items-center justify-center bg-gray-100 p-6">
                    <img
                      src={logo.path}
                      alt={logo.name}
                      width={200}
                      height={100}
                      class="max-h-full w-auto"
                    />
                  </div>
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-bold">{logo.name}</h3>
                      <span
                        class={`ml-2 rounded px-2 py-0.5 text-xs font-bold ${logo.path.toLowerCase().endsWith('.svg') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {logo.path.toLowerCase().endsWith('.svg')
                          ? 'SVG'
                          : 'PNG'}
                      </span>
                    </div>
                    {logo.description && (
                      <p class="mt-1 text-gray-600">{logo.description}</p>
                    )}
                    {logo.fileSize && (
                      <p class="mt-1 text-sm text-gray-500">
                        Size: {logo.fileSize}
                      </p>
                    )}
                    <a
                      href={logo.path}
                      download
                      class="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                      <FaSolidDownload />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              )}
            </For>
          }
        </div>

        <h3 class="mb-4 text-2xl font-bold">{t('brand.bold_print_logos')}</h3>
        <div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {
            <For each={boldLogos}>
              {(logo) => (
                <div class="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
                  <div class="flex h-48 items-center justify-center bg-gray-100 p-6">
                    <img
                      src={logo.path}
                      alt={logo.name}
                      width={200}
                      height={100}
                      class="max-h-full w-auto"
                    />
                  </div>
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-bold">{logo.name}</h3>
                      <span
                        class={`ml-2 rounded px-2 py-0.5 text-xs font-bold ${logo.path.toLowerCase().endsWith('.svg') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {logo.path.toLowerCase().endsWith('.svg')
                          ? 'SVG'
                          : 'PNG'}
                      </span>
                    </div>
                    {logo.description && (
                      <p class="mt-1 text-gray-600">{logo.description}</p>
                    )}
                    {logo.fileSize && (
                      <p class="mt-1 text-sm text-gray-500">
                        Size: {logo.fileSize}
                      </p>
                    )}
                    <a
                      href={logo.path}
                      download
                      class="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                      <FaSolidDownload />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              )}
            </For>
          }
        </div>

        <div class="mb-6 rounded-lg bg-gray-50 p-4">
          <details>
            <summary class="cursor-pointer text-lg font-medium">
              {t('brand.legacy_logos_obsolete')}
            </summary>
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {
                <For each={legacyLogos}>
                  {(logo) => (
                    <div class="overflow-hidden rounded-lg border bg-white shadow-sm">
                      <div class="flex h-40 items-center justify-center bg-gray-100 p-4">
                        <img
                          src={logo.path}
                          alt={logo.name}
                          width={160}
                          height={80}
                          class="max-h-full w-auto"
                        />
                      </div>
                      <div class="p-3">
                        <div class="flex items-center justify-between">
                          <h3 class="text-base font-medium">{logo.name}</h3>
                          <span
                            class={`ml-2 rounded px-1.5 py-0.5 text-xs font-bold ${logo.path.toLowerCase().endsWith('.svg') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                          >
                            {logo.path.toLowerCase().endsWith('.svg')
                              ? 'SVG'
                              : 'PNG'}
                          </span>
                        </div>
                        {logo.description && (
                          <p class="mt-1 text-sm text-gray-600">
                            {logo.description}
                          </p>
                        )}
                        {logo.fileSize && (
                          <p class="mt-1 text-xs text-gray-500">
                            {t('brand.size')}: {logo.fileSize}
                          </p>
                        )}
                        <a
                          href={logo.path}
                          download
                          class="mt-2 inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
                        >
                          <FaSolidDownload class="text-xs" />
                          <span>{t('brand.download')}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </For>
              }
            </div>
          </details>
        </div>
        <div class="mb-8 text-center">
          <a
            href="https://github.com/meetjspl/brand-assets"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <FaBrandsGithub />
            <span>{t('brand.view_complete_collection_github')}</span>
          </a>
        </div>
      </section>

      <section id="colors" class="mb-16">
        <h2 class="mb-6 border-b pb-2 text-3xl font-bold">
          {t('brand.colors')}
        </h2>

        <h3 class="mb-4 text-2xl font-bold">
          {t('brand.current_colors_post_2023')}
        </h3>
        <div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {
            <For each={currentColors}>
              {(color) => (
                <div class="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
                  <div
                    class="h-32"
                    style={{ 'background-color': color.hex }}
                  ></div>
                  <div class="p-4">
                    <h3 class="text-lg font-bold">{color.name}</h3>
                    <p class="mt-1 text-gray-600">{color.description}</p>
                    <div class="mt-2 space-y-1">
                      <p class="font-mono text-sm">
                        {t('brand.hex')}: {color.hex}
                      </p>
                      <p class="font-mono text-sm">
                        {t('brand.rgb')}: {color.rgb}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </For>
          }
        </div>

        <div class="mb-6 rounded-lg bg-gray-50 p-4">
          <details>
            <summary class="cursor-pointer text-lg font-medium">
              {t('brand.original_colors_obsolete')}
            </summary>
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {
                <For each={originalColors}>
                  {(color) => (
                    <div class="overflow-hidden rounded-lg border bg-white shadow-sm">
                      <div
                        class="h-24"
                        style={{ 'background-color': color.hex }}
                      ></div>
                      <div class="p-3">
                        <h3 class="text-base font-medium">{color.name}</h3>
                        <div class="mt-1 space-y-1 text-sm">
                          <p class="font-mono">HEX: {color.hex}</p>
                          <p class="font-mono">RGB: {color.rgb}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              }
            </div>
          </details>
        </div>
      </section>

      <section id="wallpapers" class="mb-16">
        <h2 class="mb-6 border-b pb-2 text-3xl font-bold">
          {t('brand.wallpapers')}
        </h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          {
            <For each={wallpapers}>
              {(wallpaper) => (
                <div class="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
                  <div class="relative flex h-64 items-center justify-center bg-gray-100 p-4">
                    <img
                      src={wallpaper.path}
                      alt={wallpaper.name}
                      class="object-contain"
                    />
                  </div>
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-bold">{wallpaper.name}</h3>
                      <span
                        class={`ml-2 rounded px-2 py-0.5 text-xs font-bold ${wallpaper.path.toLowerCase().endsWith('.png') ? 'bg-blue-100 text-blue-800' : wallpaper.path.toLowerCase().endsWith('.jpeg') || wallpaper.path.toLowerCase().endsWith('.jpg') ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}
                      >
                        {wallpaper.path.toLowerCase().endsWith('.png')
                          ? 'PNG'
                          : wallpaper.path.toLowerCase().endsWith('.jpeg') ||
                              wallpaper.path.toLowerCase().endsWith('.jpg')
                            ? 'JPEG'
                            : wallpaper.path.split('.').pop()?.toUpperCase()}
                      </span>
                    </div>
                    {wallpaper.description && (
                      <p class="mt-1 text-gray-600">{wallpaper.description}</p>
                    )}
                    {wallpaper.dimensions && (
                      <p class="mt-1 text-sm text-gray-500">
                        {t('brand.dimensions')}: {wallpaper.dimensions}
                      </p>
                    )}
                    {wallpaper.fileSize && (
                      <p class="mt-1 text-sm text-gray-500">
                        {t('brand.size')}: {wallpaper.fileSize}
                      </p>
                    )}
                    <a
                      href={wallpaper.path}
                      download
                      class="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                      <FaSolidDownload />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              )}
            </For>
          }
        </div>
      </section>
    </div>
  );
};

export default BrandPage;
