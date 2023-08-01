# Notes on Future Improvements

There is no admin app for viewing or processing orders, so any new orders will just sit as unfulfilled orders in the database forever. Although, it wasn't a requirement for this course, I may build an admin backend later for my own satisfaction.

The app does not have any verification process for new accounts. Ideally newly registered users should be sent an email with a link to verify their account.

The app only allows registered users to submit orders, but a feature to create an order using an anonymous guest account would be useful. Registration could then be offered as an option at the point of ordering.

The front end stores the current user identity in localstorage for 24h, so a user will be automatically logged in if they don't manually log out and then return to the site within that time period. Ideally users should have to opt into this behaviour by selecting a 'remember me' option when they log in.

