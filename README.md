<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bawses/it-project-crm">
    <img src="assets/CataLog_logo.png" alt="Logo" width="270" height="100">
  </a>

<h3 align="center">:orange_square:Your Professional CRM - CataLog:blue_square:</h3>

  <p align="center">
    CataLog is a Personal CRM that helps you to stay in touch with your network wherever you are. You can easily save and retrieve the contact details of your network by either adding their profile or through creating a manual contact.  
    <br />
    <a href="https://bawses-it-project.atlassian.net/wiki/spaces/BAWSES/overview?homepageId=262290"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://it-project-crm.vercel.app/welcome">View Demo</a>
    ·
    <a href="https://github.com/bawses/it-project-crm/issues">Report Bug</a>
    ·
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
CataLog is the modern CRM that brings your world closer to you. It is both a Digital Phonebook and a social media site for Professional Networking, allowing you to access your contacts from any computer or mobile device. CataLog also helps organisations connect with professionals. 

### Features
##### Digital Phonebook :closed_book:
<ul>
  <li>Add a Manual Contact Entry</li>
  <li>Edit and Save a Manual Contact Entry</li>
  <li>Record personal notes for a Manual Contact Entry</li>
  <li>Categorise a Manual Contact by adding tags</li>
  <li>Merge Manual Contact and CataLog User Profile</li>
  
  <li>View your Contacts Directory</li> 
  <li>Sort your Contacts Directory based on different fields (i.e. first name, last name, etc…)</li>
  <li>Filter categories of Contacts by applying tags</li>
  <li>Search for a Contact from your list of Contacts (Local Search)</li>
</ul>

##### Networking :globe_with_meridians:
<ul>
  <li>Add a User as a Contact</li>
  <li>View and edit user's personal profile</li>
  <li>Record personal notes for an Added Contact</li>
  <li>Categorise an Added Contact by adding tags</li>
  
  <li>Create Organisation Profile</li>
  <li>Edit and Save Organisation Profile</li>
  <li>Search for any CataLog User or Organisation Profile (Global Search)</li>
</ul>

##### Platform Services :desktop_computer:
<ul>
  <li>Sign Up/Log In for Personal and Organisation Accounts (Email and Google options)</li>
  <li>Add Recovery Email</li>
  <li>Update Password</li>
</ul>

### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://nextjs.org/)
* [Material UI](https://mui.com/getting-started/usage/)
* [MongoDB](https://www.mongodb.com/)
* [Vercel](https://vercel.com/docs/concepts)

### Prerequisites

To successfully clone and run the website locally, you either must have or should have the following already installed:

* [NodeJS](https://nodejs.org/en/) Version >=12
* [Visual Studio Code](https://code.visualstudio.com/)

### Installation

Get a free API Key at [https://example.com](https://example.com)

1. Clone the repo
   ```sh
   git clone https://github.com/bawses/it-project-crm
   ```
   
2. Install NPM packages
   ```sh
   npm install
   ```
3. Then, run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
  
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
   
Open [http://localhost:3000](http://localhost:3000) with your browser to view and experiment with the webpage locally.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/...](http://localhost:3000/api/). This endpoint can be edited in `pages/api/*.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

<p align="right">(<a href="#top">back to top</a>)</p>

## Running Unit Tests Locally

To run unit tests locally, go to package.json in the project's root directory and replace the 'test' command in scripts from:

```bash
jest
```

to

```bash
jest --setupFilesAfterEnv='./tests/setupEnv.js'
```

Upon completion, you will also see the creation of a file **test-report.html** in which you may load up in a live local server for inspection.

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
