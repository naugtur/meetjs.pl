import { For, Show } from 'solid-js';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { FaBrandsGithub, FaBrandsLinkedin } from 'solid-icons/fa';
import { Organizer } from '@/types/organizer';

interface OrganizersProps {
  city: string;
  organizers: Organizer[];
}

export const Organizers = (props: OrganizersProps) => {
  return (
    <section class="flex w-full flex-col items-center justify-center gap-4 p-8">
      <h2 class="text-2xl font-bold">{props.city} organizers</h2>
      <p class="text-center">
        Meet the people who organize meetups in {props.city}
      </p>
      <div class="flex w-full flex-col justify-center gap-8 px-4 md:flex-row">
        <For each={props.organizers}>
          {(organizer) => (
            <Card class="w-full max-w-[15rem] overflow-hidden text-2xl font-bold md:w-1/3">
              <CardContent class="flex items-center justify-center pt-6">
                <img
                  src={organizer.image || '/avatar-placeholder.png'}
                  alt={organizer.name}
                  width={150}
                  height={150}
                  class="rounded-md"
                />
              </CardContent>
              <CardFooter class="flex w-full flex-col items-center justify-center gap-1">
                <CardTitle class="text-center">{organizer.name}</CardTitle>
                <div class="flex items-center justify-center gap-1">
                  <Show when={organizer.email}>
                    <a
                      href={`mailto:${organizer.email}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <span class="sr-only">Email</span>@
                    </a>
                  </Show>
                  <Show when={organizer.linkedin}>
                    <a href={organizer.linkedin} target="_blank" rel="noopener">
                      <span class="sr-only">Linkedin</span>
                      <FaBrandsLinkedin />
                    </a>
                  </Show>
                  <Show when={organizer.gitHub}>
                    <a href={organizer.gitHub} target="_blank" rel="noopener">
                      <span class="sr-only">GitHub</span>
                      <FaBrandsGithub />
                    </a>
                  </Show>
                </div>
              </CardFooter>
            </Card>
          )}
        </For>
      </div>
    </section>
  );
};
