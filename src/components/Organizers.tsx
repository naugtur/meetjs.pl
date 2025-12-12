import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { Organizer } from '@/types/organizer';

interface OrganizersProps {
  city: string;
  organizers: Organizer[];
}

export const Organizers = ({ city, organizers }: OrganizersProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-bold">{city} organizers</h2>
      <p className="text-center">
        Meet the people who organize meetups in {city}
      </p>
      <div className="flex w-full flex-col justify-center gap-8 px-4 md:flex-row">
        {organizers.map((organizer) => (
          <Card
            key={organizer.name}
            className="w-full max-w-[15rem] overflow-hidden text-2xl font-bold md:w-1/3"
          >
            <CardContent className="flex items-center justify-center pt-6">
              {organizer.image ? (
                <Image
                  src={organizer.image}
                  alt={organizer.name}
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              ) : (
                <Image
                  src="/avatar-placeholder.png"
                  alt={organizer.name}
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              )}
            </CardContent>
            <CardFooter className="flex w-full flex-col items-center justify-center gap-1">
              <CardTitle className="text-center">{organizer.name}</CardTitle>
              <div className="flex items-center justify-center gap-1">
                {organizer.email && (
                  <a
                    href={`mailto:${organizer.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Email</span>@
                  </a>
                )}
                {organizer.linkedin && (
                  <a
                    href={organizer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Linkedin</span>
                    <FaLinkedin />
                  </a>
                )}
                {organizer.gitHub && (
                  <a
                    href={organizer.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">GitHub</span>
                    <FaGithub />
                  </a>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
