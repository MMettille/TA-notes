# Initalizing A Fullstack App with jQuery

- Create files:  
    - A **Folder** named `server`  
      - A **Folder** named `modules`
        -  `pool.js`
      - A **Folder** named `public`
        -   A **Folder** named `scripts`
            -   `client.js`
        -   A **Folder** named `styles`
            -   `stylesheet.css`
        -   A **Folder** named `vendors`
            -   Copy over your `jquery.js`!
            -   Are you using boostrap? If yes:
                -   Copy over your `bootstrap.css`
                -   Copy over your `boostrap.bundle.js`
        -   `index.html`
      - A **Folder** named `routes`
      - `server.js`
    - `.gitignore`  
    - `README.md`
    - `database.sql`
  
**COMMIT**
  
  - Install Packages
    - `npm init --yes`
    - `npm install express`
    - `npm install pool`
    - `npm install pg`


- Inside your `.gitignore`, hide these files
    - `node_modules/`
    - `package_lock.json`

- Inside your `package.json` add (at least) this line in the scripts section
  ```
  "scripts": {
    "start": "node server/server.js"
    },
  ```
  
- Inside your `server.js`

```
// Bring express into your project
const express = require('express');
// Bring body parser into your project, so you can parse responses coming from the frontend
const bodyParser = require('body-parser');
// Bring your project's route(s) into the server.js
const bookRouter = require('./routes/book.router.js');

// Create an app with express
const app = express();
// Make sure that you can parse responses from the frontend inside this app
app.use(bodyParser.urlencoded({extended: true}));

/*
  This line is going to route all calls to /THING_HERE to the myRouter file.
  We do this to better organize our backend.
  If, for instance, we are building an app to organize our home library, we could have calls to
  /book (for the books)
  and
  /author (for the authors).
  
  Now, if you are looking for a particular book based on it's id, you may make a GET request to `book/{id}`/
  The line below will "shave off" the `/book` and will push you directly into a bookRouter!
  It's pretty nifty and will save you time later!
*/
app.use('book', bookRouter);

// Serve back static files by default
app.use(express.static('server/public'));

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
// Start the server and check that the server is running:
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
```

**COMMIT**

- Inside your `index.html` file:
  - Source in your `client.js`
  - Source in your `jquery.js`
  - Source in your `stylesheet.css`
  - Are you using bootstrap?
    - Source in `bootstrap.css`
    - Source in `boostrap.bundle.js`
 - Add a test `<p>boop!</p>` in the `<body>`

- Time to start up your app! 
  - Run `npm start` in your terminal
  - Go to page in browser (e.g. http://localhost:8000/).
  - If you did everything right, you'll be booped!

**COMMIT**

- Inside your `README.md` file:
  - Tell us about your app!
  - I recommend this app (made by a Prime grad!): https://johnturner4004.github.io/readme-generator/

- Inside your `database.sql`
  - Copy over how you created your database! Don't forget to update this if you make changes to your database!

**Hey! You have an initialized app! YAY! Now all you have to do is.........build it! 😂**
