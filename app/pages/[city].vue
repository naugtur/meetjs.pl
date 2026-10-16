<script setup lang="ts">
import { getCityPage, type CityPage } from '~~/src/content/cityPages';

definePageMeta({
  validate: (route) =>
    'city' in route.params && Boolean(getCityPage(route.params.city)),
});

const route = useRoute('city');
const siteUrl = useSiteUrl();

const page = computed(() => getCityPage(route.params.city) as CityPage);

const cityMetadata = (city: CityPage): PageMetadata => {
  const canonical = siteUrl(`/${city.slug}`);
  const { title, description, keywords, ogImageCity, twitter } = city.metadata;
  if (city.kind === 'placeholder') return { title, description, canonical };

  const image = {
    url: siteUrl(`/api/og?city=${ogImageCity}`),
    width: 1200,
    height: 630,
    alt: `meet.js | JavaScript meetups in ${title.replace(/^meet\.js /, '')}`,
  };
  return {
    title,
    description,
    keywords,
    canonical,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: canonical,
      siteName: 'meet.js',
      images: [image],
    },
    ...(twitter
      ? {
          twitter: {
            card: 'summary_large_image',
            site: '@meetjs',
            title: 'meet.js',
            description,
            images: [image],
          },
        }
      : {}),
  };
};

useSiteMeta(() => cityMetadata(page.value));
</script>

<template>
  <main
    class="mx-auto flex max-w-7xl flex-col justify-between md:flex-row lg:px-8"
  >
    <div class="flex w-full flex-col">
      <template v-if="page.kind === 'full'">
        <CityBanner :city="page.bannerName" :background="page.cover" />
        <CityEventSection :city="page.eventsCity" />
        <CityLocalGroups
          v-if="page.localGroups"
          :local-groups="page.localGroups"
        />
        <div
          v-if="page.embed"
          id="video"
          style="display: flex; justify-content: center"
        >
          <iframe
            :src="page.embed.src"
            :height="page.embed.height"
            :width="page.embed.width"
            allowfullscreen
            :title="page.embed.title"
          ></iframe>
        </div>
        <CityFaq :questions="page.faq" />
        <CityOrganizers
          :city="page.organizers.cityLabel"
          :organizers="page.organizers.people"
        />
        <CityEmail v-if="page.email" :email="page.email" />
      </template>
      <div v-else class="prose dark:prose-invert my-8 max-w-none space-y-8">
        <h1 class="text-4xl font-bold">{{ page.name }}</h1>
        <p>
          We're looking for organizers!
          <a href="mailto:contact@meetjs.pl" class="font-bold"
            >Let us know if you want to help.</a
          >
        </p>
      </div>
    </div>
  </main>
</template>
