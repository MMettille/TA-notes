## Setting up Your Server:

[ ] Bring express into your project with these terminal commands:   
  `npm init --yes` and `npm install express`  
[ ] Make a .gitignore - add these files to the git ignore:  
  node_modules/
  package-lock.json  
[ ] Make sure that in your package.json you have a `script` that (at least) has this line:  
  ` "scripts": {
    "start": "node server/server.js"
    }, `  
    
## Inside your server.js file:  
[ ] create an instance of express by adding this line of code:  
    `const express = require("express"); - const app = express();`   
[ ] Set up the port:  
    `const port = {port number here}`   
    example: `const port = 8000;`  
[ ] Direct express to the public folder using this code::
    `app.use(express.static("server/public"));` 
[ ] Add your server listener and starting function:
    app.listen(port, () => {
        console.log("listening on port", port);
    });
    
## YAY! We're up! Let's test it to make sure it actually works.
[ ] Start your server!
  - `npm start`in your terminal
  - Go to page in browser and type in the port name (e.g. http://localhost:8000/). 
  - Whatever is in your html file is what you should see on the page.
