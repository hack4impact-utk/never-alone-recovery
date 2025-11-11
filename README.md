# Never Alone Recovery

<h1 align="center">
  <br>
    <img src="public/NeverAloneRecoveryLogo192x192.jpg" alt="Repository Banner" width="25%">  
  <br>
    Never Alone Recovery (NAR)
</h1>

## Description

NAR is a nonprofit that provides housing and life skills programs for women recovering from addiction, domestic violence, homelessness, and post-incarceration challenges.

They currently track client progress, rent payments, and donor outreach manually using notepads and spreadsheets, which is both time-consuming and error prone.

The goal is to develop an admin-sided client management system to manage client tasks, track rent payment, and simplify client intake.

## Getting Started

### Prerequisites

Please have the following installed on your machine:

- Node.js
- PNPM
- VSCode

Please have the following VSCode extensions installed:

- Prettier
- ESLint
- Code Spell Checker
- markdownlint

### Environment Variables

Create a `.env` file in the root directory of the project and add the following variables. Please contact leadership to obtain the following secrets:

```text
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Running the App

1. Run `pnpm install` to install the dependencies.
2. Run `pnpm run dev` to start the development server.

### Contributing

Branch protections are enabled on this repository.
To contribute, please create a new branch and make a pull request.
The rules for branch names are lax, just be sure to include your name.

An example branch name for a card that adds a reset password email would be:

```text
rudra-reset-password-email
```

Your pull request title must follow the conventional commits specification. An example of a valid pull request title is:

```text
feat: Add pending form submissions table
```

### Testing

#### Debugging

The `.vscode/launch.json` file is configured to run Next.js in debug mode. This can let you step through your code line by line and inspect variables.
To start debug mode, navigate to the `Run and Debug` tab in VSCode, select the mode, and click the green play button.
