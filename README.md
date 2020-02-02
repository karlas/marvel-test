# Marvel Characters Test

## Overview

This is a NextJS app. However, it was bootstrapped with Create-React-App. Benefits of an SSR app instead having an SPA app is having the first render content being served on first server hit. So, we have some content that user can browse before browser downloads the JS bundle, and performs the first Marvel API request.

Transition from CRA to Next was not a big deal.

## Online version

You can find it [here](https://fervent-snyder-8594c1.netlify.com/). Server runs on a Netlify lambda function (serverless)

## How to run in your local machine

I have been using Yarn through the development, but if you can't install it, NPM should work with any problem.

To install:  ``yarn install``
For development:  ``yarn dev``
To build an optimized version for production in local: ``yarn build`` and then ``yarn start``
Run tests: ``yarn test``

The Marvel API keys should be entered as environment vars in a ``.env`` file, at app's root folder. You can check ``.env.sample`` in order to guess how to introduce them

## State Management

App relies on React's Context API to handle its state. It's very similar to Redux.

There's a Context which stores the state app, performs the needed API requests, and exposes data and methods to interact with the components to all component hierarchy under its provider.

Components access the context via hooks

## UI
I used two different libraries: Material-UI and Styled components

Material UI provides a very mature and complete collection of components, layouts, and utils.

Styled components provide a CSS syntax and a direct abstraction to the relationship between the component props, and its visual translation. Also, Material UI CSS rules can be modified with no difficulty with Styled Components.

## Unit testing
I have used Jest with Enzyme. There are a few tests: One to check the search header behavior, and another to test the context and its relation with components.