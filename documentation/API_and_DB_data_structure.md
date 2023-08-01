# API and Database Data Structure

The following models are supported:

**Users** - A list of valid users for the database.

| Field      | Description                                                                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | A unique id representing this user (should be omitted during user creation, as it will be created automatically)                                                                                                  |
| auth_level | An integer value (1 or above) representing the authorisation level of this user (see Authorisation description below). Note this field is not required for the register route as it will be created automatically |
| first_name | The actual first name of the user                                                                                                                                                                                 |
| last_name  | The actual last name of the user                                                                                                                                                                                  |
| username   | A unique identifier for the user - also used to access the account                                                                                                                                                |
| password   | The password used to access the user's account                                                                                                                                                                    |

**Categories** - A list of categories for types of product sold

| Field    | Description                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| id       | A unique id representing this category (should be omitted during category creation, as it will be created automatically) |
| category | The name of the category (this must also be unique)                                                                      |

**Products** - A list of products for sale

| Field       | Description                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| id          | A unique id representing this product (should be omitted during product creation, as it will be created automatically) |
| name        | A name describing the product                                                                                          |
| url         | A url where an image of the product can be found                                                                       |
| description | A description of the product                                                                                           |
| price       | A numeric price for the product                                                                                        |
| category    | The id of the category this product belongs to                                                                         |

**Orders** - A list of customer orders

| Field            | Description                                                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | A unique id representing this order (should be omitted during order creation, as it will be created automatically)                                                                 |
| user_id          | The id of the user the order belongs to                                                                                                                                            |
| delivery_address | The address the order should be delivered to                                                                                                                                       |
| date_time        | A timestamp recording the time and date the order was created or last updated                                                                                                      |
| status           | Either 'active' if the order is current and not yet fulfilled or 'complete' if the order has been fulfilled. Any user can only ever have either 0 or 1 active orders.              |
| products         | A list of products included in the order. Each product has two fields: product_id - the id of the product being ordered, and quantity - how many of that product are being ordered |

## Using the API

NOTE: You can see a copy of these usage instructions by visiting the root of the API service in a web browser.

The API supports the following operations:

### User operations

| Operation         | Description                                                                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Register user     | This is for creation of non-administrative users, e.g. customers. This operation does not require authorisation, so can be used for self-service registration.                                                                                  |
| Create user       | This is a generalised operation for creation of users and it requires authorisation. This operation can be used for creating admin users, for example. A user can only create other users up to and including their own level of authorisation. |
| Index users       | This lists all users on the system. It is only accessible to admin users.                                                                                                                                                                       |
| Show user         | This shows a single user. Non-admin users can only access their own record.                                                                                                                                                                     |
| Update user       | This enables an existing user record to be updated. Non-admin users can only update their own record.                                                                                                                                           |
| Destroy user      | This enables a user record to be permanantly removed. Non-admin users can only destroy their own record. This operation will fail if there are any orders belonging to this user                                                                |
| Authenticate user | This should be used as part of a login process to verify a user. This operation is required before many other operations can be carried out.                                                                                                    |

### Category operations

| Operation        | Description                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Create category  | This creates a new product category. This operation is only available to admin users.                                                                                                |
| Index categories | This lists all product categories.                                                                                                                                                   |
| Show category    | This shows a single product category.                                                                                                                                                |
| Update category  | This enables an existing product category to be updated. This operation is only available to admin users.                                                                            |
| Destroy category | This enables a product category to be permanantly removed. This operation will fail if any products exist that are in that category. This operation is only available to admin users |

### Product operations

| Operation            | Description                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create product       | This creates a new product. This operation is only available to admin users.                                                                                              |
| Index products       | This lists all products.                                                                                                                                                  |
| Show product         | This shows a single product.                                                                                                                                              |
| Update products      | This enables an existing product to be updated. This operation is only available to admin users.                                                                          |
| Destroy product      | This enables a product to be permanantly removed. This operation will fail if any orders exist that contain that product. This operation is only available to admin users |
| Products by category | This lists all products in a given category.                                                                                                                              |
| TopProducts(x)       | This lists up to x top selling products. Products in active orders are not counted when this list is created.                                                             |

### Order operations

| Operation     | Description                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Create order  | This creates a new order.                                                                           |
| Index orders  | This lists all orders. Non-admin users will only see their own orders.                              |
| Show order    | This shows a single product. Non-admin users can view their own orders only.                        |
| Update orders | This enables an existing order to be updated. Non-admin users can update their own orders only.     |
| Destroy order | This enables an order to be permanantly removed. Non-admin users can destroy their own orders only. |