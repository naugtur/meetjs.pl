<script setup lang="ts">
const open = ref(false);
const panelId = useId();
</script>

<template>
  <header role="banner" class="sticky top-0 z-40">
    <nav class="bg-purple" aria-label="Main navigation">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-between sm:items-stretch"
          >
            <Logo />
            <DesktopNavigation />
            <aside
              class="hidden items-center justify-center md:flex"
              aria-label="Social media links"
            >
              <SocialLinks />
              <LanguageSwitcher variant="desktop" />
            </aside>
          </div>
          <MobileMenuButton
            :open="open"
            :controls="panelId"
            @toggle="open = !open"
          />
        </div>
      </div>
      <div v-if="open" :id="panelId" class="sm:hidden">
        <MobileNavigation />
      </div>
    </nav>
  </header>
</template>
