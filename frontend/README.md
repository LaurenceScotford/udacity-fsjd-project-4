# Store Frontend Project

This is my submission for the third project for the Udacity Full Stack Javascript Developer Nanodegree and part of my solution for the fourth project.

## About

This is a front end for an online store. It is built using the Angular framework. A corresponding back end is also included in this repositpory.

**IMPORTANT:** This solution includes fake credit card entry on the order screen. This solution is not compliant with any credit card processing standards and should not be used for this purpose. Please do not enter real credit card numbers when using this app.

### Navigation

When a user navigates to the root URL for the store, it initally shows the product list page. The user can navigate freely between this page and their cart by using the navigation links in the header.

### Register

The register page enables a user to register for a new account. Registration and login are required before a purchase can be made.

### Login

The login page enables a user to login to an existing account. Login is required before a purchase can be made.

### Product list page

The product list page displays photographs and details (name and price) for the avilable products.
The user can use a drop down list to select a quantity of the product they wish to purchase and then click an Add to cart button to add one or more of this item to their cart.
The user can also select a products photograph to see a detail page for that product.

### Product detail page

The detail page shows details for just a single product. In addition to the information shown on the product list page, this page shows a brief description of the product. Again, the user can use the quantity drop down list and Add to cart button on this page.

### Cart page

The cart page shows a list of products and quantities in the cart. The user can adjust the quantities here if desired. This page also has a form for the other required order details (customer's name, delivery address and credit card number). Once valid entries have been added for these, the user can select the Submit button to submit their order.

**IMPORTANT:** This screen includes fake credit card entry. This solution is not compliant with any credit card processing standards and should not be used for this purpose. Please do not enter real credit card numbers when using this app. The solution will accept any 16 digit number. These will not be checked against any credit card databases or validated by any security or authorisation systems and will not be retained.

### Confirmation page

This will show a confirmation page that confirms the items and quantities ordered, the total cost and the date and time of order.

### Other features

- Cart icon on header changes colour to show the status of the cart (empty or not empty)
- Images on the product list and product detail pages have a tag to show how many of that item are in the cart
- The order form on the cart page will not be shown until the user has logged in with an authorised account
- The order form on the cart page will not activate the Submit button until valid data is entered and instructive error messages are shown when invalid data is entered
- There is a messaging system that shows useful confirmations of activity (or errors where applicable) in a floating status bar at the top of the screen

## Set up

After downloading and unzipping the files, open a terminal in the project root folder and install the application:

```
npm install
```

Once the installation of dependencies has finished, you might want to run the test suite to check everything is working correctly:
```
npm run test
```

To run the full product, you will need a suitable back end to be up and running (see [https://github.com/LaurenceScotford/udacity-fsjd-project-2](https://github.com/LaurenceScotford/udacity-fsjd-project-2) for example and details of the data format):

```
npm start
```

This serves the application on the default port (4200) and will automatically open the application in the default browser.

## Potential improvements
- Enable users to make orders using a temporary guest account, so that registration and login is optional

## Third party libraries and resources

- This project is based on starter files supplied by [Udacity](https://www.udacity.com/)
- This application was built using the [Angular framework](https://angular.io/)
