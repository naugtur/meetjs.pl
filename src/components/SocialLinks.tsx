import { For } from 'solid-js';
import { socialLinksData } from '@/content/socialLinks';

export const SocialLinks = () => {
  return (
    <ul class="flex items-center gap-4 p-4 text-xl text-white md:gap-2">
      {
        <For each={socialLinksData}>
          {(socialLink) => (
            <li>
              <a href={socialLink.url} target="_blank">
                {socialLink.icon}
                <span class="sr-only">{socialLink.name}</span>
              </a>
            </li>
          )}
        </For>
      }
    </ul>
  );
};
