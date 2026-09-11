interface CityEmailProps {
  email: string;
}

export const CityEmail = (props: CityEmailProps) => {
  return (
    <section class="flex w-full flex-col items-center justify-center gap-4 bg-green p-8">
      <h2 class="text-center font-medium">
        For more information, please contact us at{' '}
      </h2>
      <a
        href={`mailto:${props.email}`}
        class="text-2xl font-bold hover:underline"
      >
        {props.email}
      </a>
    </section>
  );
};
