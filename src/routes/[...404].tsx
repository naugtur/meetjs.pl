import { FaSolidTriangleExclamation } from 'solid-icons/fa';
import { buttonVariants } from '@/components/ui/button';
import { Title } from '@solidjs/meta';
import { httpStatus } from '@solidjs/web';

const NotFound = () => {
  httpStatus(404);
  return (
    <div class="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Title>404 - meet.js</Title>
      <div class="mx-auto flex max-w-3xl flex-col gap-8 text-center">
        <FaSolidTriangleExclamation class="mx-auto h-12 w-12 text-primary" />
        <h1 class="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          404<br></br>Module not found
        </h1>
        <p class="mt-4 text-lg text-muted-foreground">
          Oops, the page you&apos;re looking for doesn&apos;t exist. It may have
          been moved or deleted.
        </p>
        <div class="mt-6">
          <a href="/" class={buttonVariants()}>
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
