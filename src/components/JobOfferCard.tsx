import { JobOffer } from '@/data/offers';

interface JobOfferCardProps {
  offer: JobOffer;
}

export function JobOfferCard({ offer }: JobOfferCardProps) {
  const {
    title,
    company,
    description,
    technologies,
    salaryMin,
    salaryMax,
    currency,
    email,
    theme,
  } = offer;

  const emailSubject = encodeURIComponent(`${title} Application`);
  const applyUrl = `mailto:${email}?subject=${emailSubject}`;

  return (
    <div className={`rounded-lg border border-${theme.border} bg-gradient-to-r ${theme.background} p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h3 className={`text-xl font-semibold text-${theme.primary}`}>{title}</h3>
          <p className={`text-${theme.secondary} font-medium`}>{company}</p>
          <p className={`mt-2 text-sm text-${theme.text}`}>
            {description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className={`rounded-full bg-${theme.textSecondary.split('-')[0]}-100 px-3 py-1 text-xs font-medium text-${theme.textSecondary}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6">
          <div className="text-right">
            <p className={`text-lg font-semibold text-${theme.primary}`}>
              {salaryMin.toLocaleString()} - {salaryMax.toLocaleString()} {currency}
            </p>
            <p className={`text-sm text-${theme.text}`}>per month</p>
          </div>
          <a
            href={applyUrl}
            className={`mt-3 inline-flex items-center justify-center rounded-md bg-${theme.textSecondary.split('-')[0]}-600 px-4 py-2 text-sm font-medium text-white hover:bg-${theme.textSecondary.split('-')[0]}-700`}
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
