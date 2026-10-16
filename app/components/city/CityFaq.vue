<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import type { FAQQuestion } from '~~/src/content/cityPages';

defineProps<{ questions: FAQQuestion[] }>();
</script>

<template>
  <section class="p-8">
    <h2 class="text-center text-2xl font-bold">FAQ</h2>
    <div class="w-full">
      <details
        v-for="question in questions"
        :key="question.id"
        name="faq"
        class="group border-b"
      >
        <summary
          class="flex cursor-pointer list-none items-center justify-between py-4 font-medium transition-all hover:underline [&::-webkit-details-marker]:hidden"
        >
          {{ question.question }}
          <ChevronDown
            class="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div class="pb-4 text-sm">
          <p><RichText :content="question.answer" /></p>
        </div>
      </details>
    </div>
  </section>
</template>
