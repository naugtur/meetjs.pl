<script setup lang="ts">
import IconDiscord from '~icons/fa6-brands/discord';
import IconFacebook from '~icons/fa6-brands/facebook';
import IconGithub from '~icons/fa6-brands/github';
import IconInstagram from '~icons/fa6-brands/instagram';
import IconLinkedin from '~icons/fa6-brands/linkedin';
import IconSquareXTwitter from '~icons/fa6-brands/square-x-twitter';
import IconYoutube from '~icons/fa6-brands/youtube';
import type { SocialIconName } from '~~/src/content/socialLinks';

defineProps<{ name: SocialIconName }>();

const ICONS = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  linkedin: IconLinkedin,
  'square-x-twitter': IconSquareXTwitter,
  discord: IconDiscord,
  github: IconGithub,
  youtube: IconYoutube,
} satisfies Record<SocialIconName, unknown>;
</script>

<template>
  <component :is="ICONS[name]" />
</template>
