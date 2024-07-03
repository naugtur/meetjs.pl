import { ScriptProps } from 'next/script';

export const Card = (props: ScriptProps) => {
	return <div className="rounded-2xl border border-gray-500 bg-white p-4 text-black">{props.children}</div>;
};

export const CardHeader = (props: ScriptProps) => {
	return <div className="">{props.children}</div>;
};

export const CardTitle = (props: ScriptProps) => {
	return <div className="text-2xl font-semibold">{props.children}</div>;
};

export const CardDescription = (props: ScriptProps) => {
	return <div className="text-gray-400">{props.children}</div>;
};

export const CardContent = (props: ScriptProps) => {
	return <div className="mt-6">{props.children}</div>;
};
