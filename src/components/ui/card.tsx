import { omit, type ParentProps } from 'solid-js';
import type { JSX } from '@solidjs/web';

import { cn } from '@/lib/utils';

type DivProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>;

const Card = (props: DivProps) => {
  const rest = omit(props, 'class');
  return (
    <div
      class={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        props.class,
      )}
      {...rest}
    />
  );
};

const CardHeader = (props: DivProps) => {
  const rest = omit(props, 'class');
  return (
    <div class={cn('flex flex-col space-y-1.5 p-6', props.class)} {...rest} />
  );
};

const CardTitle = (
  props: ParentProps<JSX.HTMLAttributes<HTMLHeadingElement>>,
) => {
  const rest = omit(props, 'class');
  return (
    <h3
      class={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        props.class,
      )}
      {...rest}
    />
  );
};

const CardDescription = (
  props: ParentProps<JSX.HTMLAttributes<HTMLParagraphElement>>,
) => {
  const rest = omit(props, 'class');
  return (
    <p class={cn('text-sm text-muted-foreground', props.class)} {...rest} />
  );
};

const CardContent = (props: DivProps) => {
  const rest = omit(props, 'class');
  return <div class={cn('p-6 pt-0', props.class)} {...rest} />;
};

const CardFooter = (props: DivProps) => {
  const rest = omit(props, 'class');
  return (
    <div class={cn('flex items-center p-6 pt-0', props.class)} {...rest} />
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
