# Official [meet.js](https://meetjs.pl) website repository

Website for meet.js community.

## Stack

- [Next.js 15 (app router)](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwindcss](https://tailwindcss.com/docs)

## Development

1. Clone the repository `git clone git@github.com:naugtur/meetjs.pl.git`
2. Enter the repository `cd meetjs.pl`
3. Install dependencies `pnpm install`
4. Setup env variables `cp .env.example .env`
5. Run development server `pnpm dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Security

- For basic security all lifecycle scripts are disabled in .npmrc (also supported by pnpm) and in case the setting is not respected, `preinstall-always-fail` will error out to warn you.
- Socket.dev warnings on PRs are enabled for the repo.

## Setting Up the Development Environment

To set up the development environment for this project, follow these steps:

1. **Clone the repository**: Clone the repository to your local machine using the following command:
   ```bash
   git clone git@github.com:naugtur/meetjs.pl.git
   ```

2. **Enter the repository**: Navigate to the project directory:
   ```bash
   cd meetjs.pl
   ```

3. **Install dependencies**: Install the required dependencies using pnpm:
   ```bash
   pnpm install
   ```

4. **Set up environment variables**: Copy the example environment variables file and configure it as needed:
   ```bash
   cp .env.example .env
   ```

5. **Run the development server**: Start the development server:
   ```bash
   pnpm dev
   ```

6. **Open the application**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Contributing Guidelines

We welcome contributions from the community! To contribute to this project, please follow these guidelines:

1. **Fork the repository**: Fork the repository to your GitHub account.

2. **Create a new branch**: Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b my-feature-branch
   ```

3. **Make your changes**: Implement your changes in the new branch.

4. **Commit your changes**: Commit your changes with a descriptive commit message:
   ```bash
   git commit -m "Add new feature"
   ```

5. **Push your changes**: Push your changes to your forked repository:
   ```bash
   git push origin my-feature-branch
   ```

6. **Create a pull request**: Open a pull request to the main repository, describing your changes and the purpose of the pull request.

## Project Overview

The meet.js website is the official platform for the meet.js community, a group of JavaScript enthusiasts in Poland. The website provides information about upcoming and past meetups, events, and other community activities. It is built using modern web technologies, including Next.js, React, TypeScript, and Tailwindcss.

Key features of the website include:

- **Event Listings**: View upcoming and past meet.js events, including details such as date, time, location, and description.
- **Event Filtering**: Filter events by city to find meetups in specific locations.
- **Responsive Design**: The website is designed to be responsive and accessible on various devices, including desktops, tablets, and mobile phones.
- **Community Contributions**: The website is open-source, allowing community members to contribute to its development and improvement.

We hope you find the meet.js website useful and informative. If you have any questions or feedback, please feel free to reach out to us!
