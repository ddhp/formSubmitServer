# Form Submit

A simple practice, submit a form, and POST to nodejs server, and save it to db

## Todo
- split services
- CRUD of express server

# Modules
*AngularJS
*Express
*sqlite3

# Structure
app
  - server
    - middlewares
      - static // static middlewares
      - api // static middlewares
      - general // middlewares required by static and api
    - controllers
      - static
      - other apis
    - models
      - all db related
    - views
      - all jade views
    server.js // app initializer
    passport.js // config for auth
    db.js // db config
