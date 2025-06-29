import { socialLinksData } from '@/content/socialLinks';

export const SocialLinks = () => {
  return (
    <ul className="flex items-center gap-4 p-4 text-xl text-white md:gap-2">
      {socialLinksData.map((socialLink) => (
        <li key={socialLink.name}>
          <a href={socialLink.url} target="_blank">
            {socialLink.icon}
            <span className="sr-only">{socialLink.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
