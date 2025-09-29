export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  salaryMin: number;
  salaryMax: number;
  currency: string;
  email: string;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    border: string;
    text: string;
    textSecondary: string;
  };
}

export const jobOffers: JobOffer[] = [
  // Add new job offers here
  // Example structure:
  // {
  //   id: "unique-job-id",
  //   title: "Job Title",
  //   company: "Company Name",
  //   location: "City",
  //   description: "Job description...",
  //   technologies: ["Tech1", "Tech2", "Benefit1"],
  //   salaryMin: 8000,
  //   salaryMax: 12000,
  //   currency: "PLN",
  //   email: "contact@company.com",
  //   theme: {
  //     primary: "color-900",
  //     secondary: "color-800", 
  //     background: "from-color-50 to-color-100",
  //     border: "color-200",
  //     text: "color-700",
  //     textSecondary: "color-800",
  //   },
  // },
];
