<script setup lang="ts">
const props = defineProps<{ textToCopy: string }>();

const copied = ref(false);
let timeout: ReturnType<typeof setTimeout> | undefined;

const copyText = () => {
  navigator.clipboard.writeText(props.textToCopy);
  copied.value = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    copied.value = false;
  }, 2_000);
};

onBeforeUnmount(() => clearTimeout(timeout));
</script>

<template>
  <div
    class="cursor-pointer rounded-md border border-gray-200 bg-white p-3 text-center transition-colors hover:bg-gray-50"
    title="Click to copy"
    @click="copyText"
  >
    <code class="text-lg font-bold text-blue-600">{{ textToCopy }}</code>

    <div class="mt-1 text-xs text-gray-500">
      {{ copied ? 'Copied!' : 'Click to copy' }}
    </div>
  </div>
</template>
