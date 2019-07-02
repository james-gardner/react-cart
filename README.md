This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes about the technical test

I've used React and Hooks to demonstrate how I might put a basic shopping cart application together. I think React's a good fit because you can model your code around user interactions and the resulting state.

Rather than diving into Redux for state management I've chosen to use hooks to achieve practically the same thing. There's a dedicated 'reducer' for managing the state changes to the cart itself and another for currency.

I've tried to timebox this technical test to demonstrate the technology choice and approach.

The spec says:

"The user can click on a checkout button which will then display the total price for the basket with the option to display the amount in different currencies. For example, if the basket contained Milk and the currency selected was USD with an exchange rate of 1.5, the total would be $1.95 USD."

I've chosen to show the total as items are added to the cart. The reasoning behind that is that you know how much you're spending before you checkout. Introducing a checkout button would be trivial in any case because of the way that the app is organised. The currency selector is also displayed as a permanent fixture which I acknowledge you wanted displayed on the checkout page.


Please ensure that you have node installed and run ```npm i``` when you've cloned/downloaded from this repo.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
