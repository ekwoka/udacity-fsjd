# Requirements

## Best Practices

### Scaffold and configure a single-page application with Angular

The project requires only npm install and ng serve to install and launch the application
--DONE--

### Document the project in the README

The Project README includes a description of the project, as well as instructions for installation and launch

### Organize and write clean code

Components, models, services, and other assets are easy to find and organized intuitively.
--DONE--

Code is free from syntax errors and follows the Udacity Frontend Nanodegree Style Guide
--DONE--

### Design for user experience

The experience and flow of the application resemble that of a typical e-commerce application, including:

- The shopping cart page shows a total cost for all products in the cart --DONE--
- Input forms are validated (e.g., a minimum length for the customer’s name on the shopping cart checkout page) --DONE--
- Feedback is given to the user when the cart is modified (i.e., how is the user alerted when a product has been added to the cart?) --DONE--
- The details page for a product shows a photo of the product, the name, the price, and the description. --DONE--
- Products can be removed from the cart --DONE--
- An order confirmation page (e.g. a “success” page) is shown to the user after successful checkout --DONE--

### Use CSS to style the application

All components are styled, and CSS syntax is clean and follows the Udacity Frontend Nanodegree Style Guide.
--DONE--

The provided CSS may be used but is not required.

## Components

### Fetch and use data from an external API

The list of products is retrieved from an external API or by using the HttpClient service to read the provided `data.json` file.
--DONE--

The product list template shows relevant product information to the user, including a photo of the product, the name, and the price.
--DONE--

The `*ngFor` directive is used to loop over any lists.
--DONE--

### Create a logical hierarchy of components

Application code clearly shows component hierarchy where child components are dependent on parent components, and sibling components are not dependent on each other.
--DONE--

Collect input from the user using controlled form elements and Angular events
--DONE--

`ngModel` is used on the element to bind a form control to a data property. `ngModelChange` is used to listen to any `ngModel` changes (i.e., rather than `change`).
--DONE--

### Use Angular event bindings

The application listens for and responds to user actions (e.g., click) using Angular event bindings.
--DONE--

### Create and use custom TypeScript models

The application includes a TypeScript model for a product. That is, component code incorporates instances of a Product type.
--DONE--

Individual properties of the model are appropriately typed (e.g., url: string).
--DONE--

## Data Flow

### Use decorators to pass data between parent and child components

When information needs to be shared between parent and child components, the application uses the @Input decorator.
--DONE--

Conversely, when sending data from a child component to its parent component, the application uses the @Output decorator and EventEmitter class.
--DONE-- (Never needed this?)

### Use a service to pass data between sibling components

Cart data is shared between the product list component and the shopping cart component. As such, a service is used to facilitate passing data between said components.
--DONE--

## Routing
### Use Angular routing in templates

The application uses the `<router-outlet>` placeholder and the routerLink attribute in HTML templates.
--DONE--

As a single-page application, the page does not reload during navigation.
--DONE--

### Set up and configure the app routing module

An AppRoutingModule is included in the application, with relevant components imported and path and component values appropriately set.
--DONE--
