import {
  FaBrandsFacebook,
  FaBrandsGithub,
  FaBrandsMeetup,
} from 'solid-icons/fa';
import { For, Show } from 'solid-js';

interface LocalGroupProps {
  localGroups?: string[];
}

const detectIcon = (link: string) => {
  if (link.includes('meetup.com')) {
    return (
      <>
        <span class="sr-only">Meetup group</span>
        <FaBrandsMeetup class="h-12 w-12" />
      </>
    );
  }

  if (link.includes('lu.ma')) {
    return (
      <>
        <span class="sr-only">Luma group</span>
        <img src="/luma.svg" alt="Luma logo" width={50} height={50} />
      </>
    );
  }

  if (link.includes('facebook.com')) {
    return (
      <>
        <span class="sr-only">Facebook group</span>
        <FaBrandsFacebook class="h-10 w-10" />
      </>
    );
  }

  if (link.includes('crossweb.pl')) {
    return (
      <>
        <span class="sr-only">Crossweb group</span>
        <img
          src="/crossweb-favicon.png"
          alt="Crossweb logo"
          width={50}
          height={50}
        />
      </>
    );
  }

  if (link.includes('github.com')) {
    return (
      <>
        <span class="sr-only">Github group</span>
        <FaBrandsGithub class="h-10 w-10" />
      </>
    );
  }
};

export const LocalGroups = (props: LocalGroupProps) => {
  return (
    <Show when={props.localGroups?.length}>
      <section class="flex flex-col items-center justify-center gap-4 p-8">
        <h2 class="text-center text-2xl font-bold">Join our local groups</h2>
        <div class="flex gap-2">
          <For each={props.localGroups}>
            {(localGroup) => (
              <a
                href={localGroup}
                class="flex items-center justify-center gap-1"
                target="_blank"
                rel="noopener"
              >
                {detectIcon(localGroup)}
              </a>
            )}
          </For>
        </div>
      </section>
    </Show>
  );
};
