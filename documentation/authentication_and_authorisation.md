# Authentication and Authorisation

The system works on the principle that each user has an authorisation level. The minimum authorisation level is 1 and higher levels can be any integer value above this.

The default build assumes three levels of authorisation:

- Level 1: End user - this level is intended to represent customers. They have access to all operations required for creating and maintaining their user account and for making and modifying orders.
- Level 2: Admin user - this level is intended to represent administrative users. They have access to all operations and can access data not directly associated with their user account.
- Level 3: Super user - this is a permanant user. Only one super user account exists and it is created automatically when the application begins. The presence of the super user account ensures that the full REST api can always be accessed, even if no other user accounts exist. When the application is first started after an install, you will want to authorise the super user account and use this to create any admin level user accounts that are initially required. NOTE: Creation of additional super user accounts or modification/deletion of the existing super user account is not permitted within the API.

A few operations, e.g. viewing products or product categories, can be accessed with authorisation. Most operations require a user to be authenticated before they can be accessed.
Use the Authenticate route to authenticate a user. If the user is valid, this route will return a secure web token. This token must be sent in the Authorization header with any operation that requires authorisation.

For operations that require authorisation, there are potentially two levels of access:

- Own records: The user can only access records that are owned by them, e.g. their user account and their orders. Customers are generally confined to this level of access.
- Universal access: The user can access any records. This level of access is generally assigned only to administrative users.

Any route that requires authorisation is first passed through the verifyAuthToken middleware. This middleware takes three additional parameters: minimum level for any access, minimum level for universal access, comparison property for ensuring access to own records only (this can be set to null for records where there is no concept of ownership by a user account, e.g. catgeories or products). Attempts to access this route by a user without the required authorisation level will be blocked.

## Example

Let's say that the minimum level for any access is set to 2 and the minimum level for universal access is set to 3. This is how the following three users would be impacted:

| User    | Authorisation level | Access permitted |
| ------- | ------------------- | ---------------- |
| Alan    | 1                   | None             |
| Barbara | 2                   | Own records only |
| Colin   | 3                   | All records      |

## A note on password security

Passwords are stored in an encrypted form in the database. The API will never return password data, therefore, when a user record is requested, the password property is always blank. One possible method for handling lost passwords, given this configuration, is for an admin user to modify the user record with a temporary password and then for the user to change this after successful login.

## Tips

- You will need to use the superuser account to create your initial admin user(s). Once you have at least one admin user, you can switch to that account for further user creation if you wish
- API operations on the superuser account are not permitted, i.e. you can't use the API to update or destroy the superuser. The superuser account will also not be revealed by any show or index operations.
- Users are not permitted to read, update or destroy user accounts at a higher authorisation level than their own
- Users created using the register option are always created at the default authorisation level
- Users at the default authorisation level (customers) are not permitted to update or destroy category and product records and can only read, update and destroy other records that belong to them