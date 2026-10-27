import Link from 'next/link';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { buttonVariants } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
        <FaTriangleExclamation className="text-primary mx-auto h-12 w-12" />
        <h1 className="text-foreground mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
          404<br></br>Module not found
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Oops, the page you&apos;re looking for doesn&apos;t exist. It may have
          been moved or deleted.
        </p>
        <div className="mt-6">
          <Link href="/" className={buttonVariants()} prefetch={false}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
