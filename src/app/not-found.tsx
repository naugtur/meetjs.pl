import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const NotFound = () => {
	return (
		<div className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
				<pre className="font-mono text-red-500">
					{`TypeError: Cannot read properties of undefined 
    (reading 'page')
    at getPage(universe.js:404:13)
    at Object.findPath(/dev/null:0:0)
    at Router.execute(matrix.js:1:1)
    at Router.universe.js:42:42`}
				</pre>

				<h1 className="mt-4 font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
					<span className="text-red-500">Uncaught Error:</span> 404_PAGE_NOT_FOUND
				</h1>

				<p className="text-lg text-muted-foreground">
					Looks like this route is <code className="text-primary">undefined</code>.
					Maybe you forgot to <code className="text-primary">npm install</code> this page?
				</p>

				<div className="flex gap-4 justify-center">
					<Link
						href="/"
						className={buttonVariants({ variant: "default" })}
						prefetch={false}
					>
						npm start fresh
					</Link>
					<Link
						href="javascript:history.back()"
						className={buttonVariants({ variant: "outline" })}
					>
						git checkout prev
					</Link>
				</div>

				<p className="text-sm text-muted-foreground">
					Error Code: 404_BRAIN_NOT_RESPONDING
				</p>
			</div>
		</div>
	);
};

export default NotFound;
