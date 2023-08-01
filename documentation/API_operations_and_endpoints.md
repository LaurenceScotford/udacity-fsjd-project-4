# API Operations and Endpoints

**NOTE:** You can see a copy of these usage instructions by visiting the root of the API service in a web browser.

The API supports the following operations:

## User operations

| Operation         | Description                                                                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Register user     | This is for creation of non-administrative users, e.g. customers. This operation does not require authorisation, so can be used for self-service registration.                                                                                  |
| Create user       | This is a generalised operation for creation of users and it requires authorisation. This operation can be used for creating admin users, for example. A user can only create other users up to and including their own level of authorisation. |
| Index users       | This lists all users on the system. It is only accessible to admin users.                                                                                                                                                                       |
| Show user         | This shows a single user. Non-admin users can only access their own record.                                                                                                                                                                     |
| Update user       | This enables an existing user record to be updated. Non-admin users can only update their own record.                                                                                                                                           |
| Destroy user      | This enables a user record to be permanantly removed. Non-admin users can only destroy their own record. This operation will fail if there are any orders belonging to this user                                                                |
| Authenticate user | This should be used as part of a login process to verify a user. This operation is required before many other operations can be carried out.                                                                                                    |

## Category operations

| Operation        | Description                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Create category  | This creates a new product category. This operation is only available to admin users.                                                                                                |
| Index categories | This lists all product categories.                                                                                                                                                   |
| Show category    | This shows a single product category.                                                                                                                                                |
| Update category  | This enables an existing product category to be updated. This operation is only available to admin users.                                                                            |
| Destroy category | This enables a product category to be permanantly removed. This operation will fail if any products exist that are in that category. This operation is only available to admin users |

## Product operations

| Operation            | Description                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create product       | This creates a new product. This operation is only available to admin users.                                                                                              |
| Index products       | This lists all products.                                                                                                                                                  |
| Show product         | This shows a single product.                                                                                                                                              |
| Update products      | This enables an existing product to be updated. This operation is only available to admin users.                                                                          |
| Destroy product      | This enables a product to be permanantly removed. This operation will fail if any orders exist that contain that product. This operation is only available to admin users |
| Products by category | This lists all products in a given category.                                                                                                                              |
| TopProducts(x)       | This lists up to x top selling products. Products in active orders are not counted when this list is created.                                                             |

## Order operations

| Operation     | Description                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Create order  | This creates a new order.                                                                           |
| Index orders  | This lists all orders. Non-admin users will only see their own orders.                              |
| Show order    | This shows a single product. Non-admin users can view their own orders only.                        |
| Update orders | This enables an existing order to be updated. Non-admin users can update their own orders only.     |
| Destroy order | This enables an order to be permanantly removed. Non-admin users can destroy their own orders only. |

## Routes

To use the API, append the URL with a route to one of the following endpoints:

| Operation            | HTTP verb | Endpoint                    | Authentication required | Body                                                                                                                                                                                     | Returns                                                   |
| -------------------- | --------- | --------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Register user        | POST      | `/users/register`           | No                      | JSON object with required properties.                                                                                                                                                    | JSON file with the created user                           |
| Create user          | POST      | `/users`                    | Yes                     | JSON object with required properties.                                                                                                                                                    | JSON file with the created user                           |
| Index users          | GET       | `/users`                    | Yes                     | None                                                                                                                                                                                     | JSON file with array of users                             |
| Show user            | GET       | `/users/:id`                | Yes                     | None                                                                                                                                                                                     | JSON file with selected user                              |
| Update user          | PUT       | `/users/:id`                | Yes                     | JSON object containing properties to be amended with new values (any properties not included will be left unchanged)                                                                     | JSON file with the updated user                           |
| Destroy user         | DELETE    | `/users/:id`                | Yes                     | None                                                                                                                                                                                     | JSON file with the deleted user                           |
| Authenticate user    | POST      | `/users/authenticate`       | No                      | JSON object containing the following properties: username: user name for the user to be logged in; password: password for the user to be logged in                                       | JSON file with a token for the authenticated user.        |
| Create category      | POST      | `/categories`               | Yes                     | JSON object with required properties.                                                                                                                                                    | JSON file with the created category                       |
| Index categories     | GET       | `/categories`               | No                      | None                                                                                                                                                                                     | JSON file with array of categories                        |
| Show category        | GET       | `/categories/:id`           | No                      | None                                                                                                                                                                                     | JSON file with selected category                          |
| Update categories    | PUT       | `/categories/:id`           | Yes                     | JSON object containing property to be amended with new value                                                                                                                             | JSON file with the updated category                       |
| Destroy category     | DELETE    | `/categories/:id`           | Yes                     | None                                                                                                                                                                                     | JSON file with the deleted category                       |
| Create product       | POST      | `/products`                 | Yes                     | JSON object with required properties NOTE: date_time can be omitted as it is set automatically by the app.                                                                               | JSON file with the created product                        |
| Index products       | GET       | `/products`                 | No                      | None                                                                                                                                                                                     | JSON file with array of products                          |
| Show product         | GET       | `/products/:id`             | No                      | None                                                                                                                                                                                     | JSON file with selected product                           |
| Update product       | PUT       | `/products/:id`             | Yes                     | JSON object containing properties to be amended with new values (any properties not included will be left unchanged NOTE: date_time is always updated automatically if a change is made) | JSON file with the updated product                        |
| Destroy product      | DELETE    | `/products/:id`             | Yes                     | None                                                                                                                                                                                     | JSON file with the deleted product                        |
| Products by category | GET       | `/products_in_category/:id` | No                      | None                                                                                                                                                                                     | JSON file with a list of products in the given category   |
| Top Products         | GET       | `/top_products/:max`        | No                      | None                                                                                                                                                                                     | JSON file with an array of up to max top selling products |
| Create order         | POST      | `/orders`                   | Yes                     | JSON object with required properties.                                                                                                                                                    | JSON file with the created order (see below)              |
| Index orders         | GET       | `/orders`                   | Yes                     | None                                                                                                                                                                                     | JSON file with array of orders                            |
| Show order           | GET       | `/orders/:id`               | Yes                     | None                                                                                                                                                                                     | JSON file with selected order                             |
| Update order         | PUT       | `/orders/:id`               | Yes                     | JSON object containing properties to be amended with new values (any properties not included will be left unchanged)                                                                     | JSON file with the updated order                          |
| Destroy order        | DELETE    | `/orders/:id`               | Yes                     | None                                                                                                                                                                                     | JSON file with the deleted order                          |

### Examples

| Operation                              | HTTP verb | Endpoint              | Body                                                                                                             | Auth                                                      |
| -------------------------------------- | --------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Customer self registration             | POST      | `/users/register`     | `{"first_name": "Desperate", "last_name": "Dan", "username": "ddan", "password": "unbreakable_password"}`        | No auth headers required                                  |
| Authenticate existing user             | POST      | `/users/authenticate` | `{"username": "admin", "password": "cant_touch_this"}`                                                           | No auth headers required                                  |
| Create an admin user                   | POST      | `/users`              | `{ "auth_level": "2", "first_name": "Ivan", "last_name": "Account", "username": "admintoo", "password": "fido"}` | Bearer token set to string generated by authenticate step |
| Update the name of an existing product | PUT       | `/products/37`        | `{"name": "New and improved sparkle" }`                                                                          | Bearer token set to string generated by authenticate step |
| Get top 5 products                     | GET       | `/top_products/5`     | No body required                                                                                                 | No auth headers required                                  |
| Get an index of all categories         | GET       | `/categories`         | No body required                                                                                                 | No auth headers required                                  |
| Show an order                          | GET       | `/orders/142`         | No body required                                                                                                 | Bearer token set to string generated by authenticate step |
| Destroy an order                       | DELETE    | `/orders/37`          | No body required                                                                                                 | Bearer token set to string generated by authenticate step |