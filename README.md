JS MVC
====================

A pure JavaScript MVC app bundled with [Webpack](https://webpack.js.org/) and served with its Dev Server and [Jest](https://jestjs.io/) for testing. The CSS is preprocessed with [Sass](https://sass-lang.com/) and the JavaScript is written in ES6/7/8 thanks to [Babel](https://www.github.com/babel/babel/).

The app runs a router that watches for hashchange with data binding for display and form inputs.

# Installation
Clone this repository in you favourite directory and install dependencies with `npm install`. This assumes you already have [NodeJS](https://nodejs.org/) installed in your environment.

# Development server
Run `npm start` to start development server. It will automaticaly open the server with your default browser.

# Testing
To run test cases using Jest run `npm test`

# Production build
Build production package ind ist folder with `npm run production` 