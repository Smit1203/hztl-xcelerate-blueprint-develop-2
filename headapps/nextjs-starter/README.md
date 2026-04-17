# HZTL Xcelerate Blueprint

HZTL Xcelerate Blueprint aims to help teams build experiences faster, more consistently, and with confidence. It combines the official Sitecore JSS Starter Kit with a robust HZTL development foundation and reusable component library. Future enhancements will include automated migration, design system integration, AI tools, connectors for CDP and Content Hub, etc. to further enhance efficiency and scalability.

Cross-functional HZTL teams are currently working together to design, document, and develop additional components and features while refining and improving the existing library. By following our teams' collective best practices, this accelerator will help streamline development, promote reusability, and enable engineers to focus on innovation, custom functionality, and user experience rather than recreating common patterns.
<br>
<br>

## Table of Contents

### Access & Tools

[Code Repo](#code-repo) | [Sitecore Access](#sitecore-access) | [Environments](#environments) | [Tooling](#tooling)<br>

### Getting started

[Local Setup](#local-setup) | [XM Cloud Setup](#xm-cloud-setup) | [Component Development](#component-development)

---

<br>

## Code Repo

- [hztl-xcelerate-blueprint on Github](https://github.com/horizontalintegration/hztl-xcelerate-blueprint) - _You are here_
  - _Contact Song Vang or David Ly if you need access_

## Sitecore Access

- [XM Cloud instance](https://xmapps.sitecorecloud.io/?organization=org_lt6yYWsNb2KUH8Zx&tenantName=horizontald4ecc-hztlxcelera396c-dev9275)
  - _Contact Song Vang or David Ly if you need access_

## Environments

### Base Site

- HZTL Xcelerate Blueprint - Coming Soon

### Brand Sites

- #### BrandX

  - [BrandX: Preview](https://hztl-blueprint-brandx-dev-preview.vercel.app/)
  - [BrandX: Dev](https://hztl-blueprint-brandx-dev.vercel.app/)
  - BrandX: Stage - Coming Soon
  - BrandX: Prod - Coming Soon

- #### Nimbus Goods

  - [Nimbus Goods: Preview](https://hztl-blueprint-nimbus-dev-preview.vercel.app/)
  - [Nimbus Goods: Dev](https://hztl-blueprint-nimbus-dev.vercel.app/)
  - Nimbus Goods: Stage - Coming Soon
  - Nimbus Goods: Prod - Coming Soon

- #### HelloWorld Corp
  - [HelloWorld Corp: Preview](https://hztl-blueprint-helloworld-dev-preview.vercel.app/)
  - [HelloWorld Corp: Dev](https://hztl-blueprint-helloworld-dev.vercel.app/)
  - HelloWorld Corp: Stage - Coming Soon
  - HelloWorld Corp: Prod - Coming Soon

### Storybook

- HZTL Xcelerate Blueprint: Storybook - Coming soon

## Tooling

- [Cursor AI - The AI Code Editor](https://www.cursor.com/en)
  - We are testing this out. It can be used instead of VS Code. All VS Code extensions will work on it.

_TODO: Create Cursor Guide Page_

## Local Setup

### Branching Strategy

- **Develop Branch:** Please branch off from the `develop` branch and follow the guidelines at [Branching Strategies](https://horizontal.atlassian.net/wiki/spaces/hxc/pages/7275054333956/Branching+Strategies)
- **Main Branch:** The `main` branch is the production branch.

### Front-End Setup

1. Switch to the required Node version - [Node 20.10.0 or higher](https://nodejs.org/en/download):  
   `nvm use 20.10.0`

   - Or check which version you are running:  
     `nvm ls`  
     Install if needed:  
     `nvm install 20.10.0`  
     Switch to this version:  
     `nvm use 20.10.0`

2. Clone the repo:  
   `git clone https://github.com/horizontalintegration/hztl-xcelerate-blueprint.git`

3. Move into the working folder:  
   `cd headapps/nextjs-starter`

4. Install the dependencies:  
   `npm install`

5. Next, copy the appropriate environment variables separately and paste them where needed in your app's .env.local or .env file.  
   _(Ask Song Vang or David Ly for this if you don't already have this)_
   `bash
    NEXT_PUBLIC_DEFAULT_SITE_NAME=BrandX
    SITECORE_API_KEY=(check with team)
    SITECORE_EDGE_CONTEXT_ID=(check with team)
    SITECORE_EDITING_SECRETs=(check with team)
    SITECORE_API_HOST=(check with team If you don't set this then TypeError: Failed to parse URL from error then you haven't configured this value) 
    `

6. Start the local development server:  
   `npm run start:connected`

   - You should now be able to access the app on http://localhost:3000 and see your changes in real-time as you make them.

7. Start Storybook locally:  
   `npm run storybook`

   - Storybook should launch in a new browser tab automatically.

## XM Cloud Setup

### Connecting to XM Cloud

This part is optional for Front-End, but still good to know. It can speed up process if BED and FED are working in parallel.

The commands below should be run from the root of the project.

- After checking out your repo run: `dotnet tool restore`

  - If you don't .NET installed at all, download from here so you at least have a version installed:  
    [Download .NET (Linux, macOS, and Windows)](https://dotnet.microsoft.com/en-us/download)
  - Next time you run it (may need a new terminal/console window) it may tell you you have the wrong version and will provide a link to the correct version (.NET 6 as of this writing, even though it's now out dated, it's required). Install this specified version
    - [ONE TIME ACTIVITY]
  - **macOS Apple Silicon (ARM64) users:** If you encounter architecture mismatch errors (e.g., "incompatible architecture (have 'x86_64', need 'arm64e' or 'arm64')"), you need to install the ARM64 version of .NET 6.0:
    1. Install ARM64 .NET 6.0 SDK to your user directory:
       ```bash
       curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel 6.0 --install-dir ~/.dotnet --architecture arm64
       ```
    2. Add to your `~/.zshrc` (or `~/.bash_profile` if using bash):
       ```bash
       export DOTNET_ROOT="$HOME/.dotnet"
       export PATH="$HOME/.dotnet:$PATH"
       ```
    3. Restart your terminal or run `source ~/.zshrc`
    4. Verify installation: `dotnet --version` should show `6.0.x`
    - [ONE TIME ACTIVITY]

- Once all that is set up, run:  
  `dotnet sitecore cloud login`

      - This should open a browser, and ask you to allow access if you’re already logged in. If you’re not logged it, it will prompt you to log in.

      - [Occasionally need to rerun when login expires]

- Next, you’ll want to connect your environment with:  
  `dotnet sitecore cloud environment connect --environment-id 1FPMhgbz1BoVNEHYvfnSjS`

      - This is for the BluePrint Dev environment.

          - [ONE TIME ACTIVITY]

- Afterwards you should have this file: `.sitecore\user.json` which we’ll need to edit

  - Under the `"dev"` section, change `allowWrite` to `true`.

  - Also copy the `authority` entry from `xmCloud` to `dev`

    - [ONE TIME ACTIVITY]

- Now you can run:  
  `dotnet sitecore serialization pull -n dev`

      - This should pull the data templates from XM Cloud Dev environment into serialized files. These are needed to generate the TypeScript models with Leprechaun

- Go to `headapps\nextjs-starter` and run `npm run leprechaun`

      - This should generate the models based on the updated data templates.

  <br>
  <br>

> _The above steps would normally be run by BED, however in cases where BED and FED are working closely together, BED can create the data templates and FED can run the above to get the latest templates and models, so they can work in parallel and not need to wait for BED to check in and merge the models. BED should still be the one to actually commit the Sitecore items as they have better context of what should be checked in._
>
> _Discuss and collaborate with your team on what process works best for you._

### Commit Hooks

- From NextJS folder, run npm run install-pre-commit-hook
- This will run linting, type checking, and unit tests before each committing.

## Component Development

- Follow the [Developer Checklist](https://horizontal.atlassian.net/wiki/spaces/hxc/pages/7275026513922/Developer+Checklist)
- Try to use [Cursor AI](#tooling) to generate the initial version of the component. Some tips:
  - Give name of component to be created
  - Give a reference to the component to copy
  - Give name of model to use
  - Paste requirements in prompt
  - _TODO: Instructions on how to reference Figma directly_
    - Until then, paste a screenshot of the component directly in the box. Attempting to use the attach functionality didn’t work for me but pasting from the clipboard did.
  - [Optional] Make temp commits often so you can revert.
    - [Optional] Use Amend Commit option so it doesn’t show up as a bunch of commits in Git history.
    - For temp commits, feel free to use “no-verify”, but don’t do that for final commit.
  - If Claude models are overloaded, try switching to ChatGPT.
  - AI seems better at creating/adding new functionality than modifying existing, so feel free to prompt for edits, but if it doesn’t get it in 2-3 attempts probably be to do it manually.
  - Example prompt:
    > Create a Sitecore component called “MyFancyCardList” in the “lists” folder using “CardList.tsx” as a reference and using “MyFancyCardList” model.  
    > _[Requirements here]_

<br>

---

<br>

_Thank you for checking out this project. Your efforts and feedback will continue to help us improve and optimize headless development in Sitecore JSS experiences. Questions? Please reach out to us on the #xm-cloud Slack channel._
