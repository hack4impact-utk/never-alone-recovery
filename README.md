# 2025-nextjs-template

<h1 align="center">
  <br>
    <img src="https://placehold.co/192x192" alt="Repository Banner" width="25%">  
  <br>
    Repository Name
</h1>

## Tech Lead Instructions

### Overview

This repository serves as a template for you to get started with your project.

It has

- MUI set up

- The DB connection set up

- Authentication set up

- A PR pipeline that ensures all PRs are named consistently, pass linting, and pass type checking (simulating a build but faster)

- Examples of how to build forms and tables

### 1. Setup repository settings

First, we need to ensure everyone commits the same way.

Go to features and turn off the features your team does not need.

Go to pull requests and turn off "allow merge commits" and "allow rebase merging". This ensures the commit history is linear and easy to follow.

Set the squash merging commit message to "pull request title"

Turn on "automatically delete head branches". This ensures that when you merge a PR, the branch is deleted.

Next, create a team in the GitHub organization and add your team members. Then, give people in the team write access to your repository so they can contribute.

### 2. Set up branch instructions

Go to settings and go to the "branches" tab under "code and automation"

Click "add classic branch protection rule"

The branch name pattern is "main"

Enable the following options

- Require a pull request before merging

- Require status checks to pass before merging
  - Add "lint-and-format" as a status check that must pass

### 3. Setup DB

Make an account at Neon Postgres and get the database

Copy the connection string and add it to a `.env` file

```text
DATABASE_URL=insert_string_here
```

Then, run the following command to add the next-auth tables to your db

`npx drizzle-kit migrate`

When you decide your DB schema, update the `schema.ts` file and consult the Drizzle documentation on how to create and execute migrations.

#### 4. Setup next-auth

I will assume you are using Google OAuth.

If you don't need auth, remove the next-auth tables and all next-auth related stuff from this project.

If you HAVE to use a credentials provider (email / password), you will have to do everything yourself. Consult the `st-christopher-truckers-relief-fund` on how this can be done. But try very hard to avoid doing this because it is a lot of extra work.

Read these instructions: [Google Provider for Next-Auth](https://next-auth.js.org/providers/google)

Setup the following environment variables

```text
AUTH_DRIZZLE_URL=[whatever your database_url is]
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=[generate a random string on the command line]
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

One way to generate the secret (or any other API key if you ever need one) is this command: `openssl rand -hex 32`

### 5. Finish the README

Spec out the README.md file.

### Misc

Add project name to package.json

Make yourself a favicon.ico and swap out the one Vercel logo with it. There are online tools to do this.

Update title and description of the project in `src/app/layout.tsx`

Pick a primary color (based on your nonprofit) and change the primary color in `src/styles/theme.ts`. If you want to mess around with the secondary color do that as well.

Delete the Tech Lead section of the README when done

Environment variables are usually of type "string | undefined" but we can just force them to be string in the `global.d.ts` file

## Description

Insert description of project here.
Give a high level of the non-profit, they're issue, and what you are doing.

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

Create a `.env` file in the root directory of the project and add the following variables:

```text
DB_CONNECTION_STRING=

EXAMPLE_ENV_VAR=example-value
EXAMPLE_ENV_VAR_2=example-value-2
PRIVATE_ENV_VAR=
PRIVATE_ENV_VAR_2=
```

Please contact leadership to obtain the following:

- DB_CONNECTION_STRING
- PRIVATE_ENV_VAR
- PRIVATE_ENV_VAR_2

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
