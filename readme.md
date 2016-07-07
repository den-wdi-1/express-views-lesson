# Views in Express

### Objectives
*After this lesson, students will be able to:*

- Create and render views in an Express application
- Explain the differences between views and partials in Handlebars
- Render partials and iterate over data in views

### Preparation
*Before this lesson, students should already be able to:*

- Write express controllers and models
- Connect Express models to Mongoose/MongoDB

## Views in Express - Intro (5 mins)

Some times we want to render the HTML directly from server. Some examples of why we might want to do this are:
- SEO to ensure that the words that appear to a user appear to search engines
- Support for older browsers
- Large JavaScript downloads for pages with limited functionality

Rendering the HTML is often called a view. Using Express out of the box, the view engine is Jade - an engine that 
relies on white space.  But we're familar with Handlebars. We can actually use Handlebars to create HTML on the 
server that we can then send as a response.

We are going to return to our `candies` app to focus on how to add views using Handelbars, pass data to those views,
and DRY up the views by using partials.

### Setting up the current app
- Clone the repo
- Change to the ``starter-code`` directory
- Run ``npm install``
- Run ``node db/seeds.js``
- Run ``nodemon server.js``

After you run all of those commands visit ``localhost:3000/candies`` and make sure that you get a few candies back
 in JSON format.

## Setting up our app to use Handlebars 

First, let's require `express-handlebars` in our applications `package.json`

```
npm install --save express-handlebars
```

Now, let's take a look at our `server.js` file and add the following:

```javascript
var handlebars = require('express-handlebars');
//

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
```

Let's look at a few things going on here: `path` is a core Node module dealing with paths.  In our example, we've 
added the [path.join()](https://nodejs.org/api/path.html#path_path_join_path1_path2) method. For us, this normalizes 
all the arguments into a path string which will help when we use the `__dirname` global variable and a file or 
folder.  After adding this, our Node app's view folder will look like:  
`/Users/your_username/your_projects_folder/starter-code/views`

It won't check for an existing path but it will transform the path string.

The second app.set() tells Express to use the Handlebars templating engine. This allows you to use Handlebars 
templates to render your HTML. We also have set up a layout of main.handlebars. A layout is a template file that 
includes many of the basic page elements. We'll go over layouts in more detail in the next section.

Since we're ready to use `.handelbars` now, let's set up our file structure to make sure our application can call the files properly. Create the following folder structure:

```
- views/
----main.handlebars

```

## Layouts
One of the basic ideas behind server side rendering is that we can write a small snippet of HTML and then use that
code many times over the course of the app.  One of the highest level of the code reuse is to create a layout that 
contains the boilerplate HTML information.  

In Handlebars a basic layout file looks like:
```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <title>Candies!</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="stylesheets.css">
  </head>
  <body>

      {{{body}}}

  </body>
</html>
```

Most of this file is just HTML boilerplate. The one new line of code is ``{{{body}}}``. In Handlebars, the triple 
{ is used when we want to copy HTML into a Handlebars variable. In this case we are saying that something, the rest
of our views, will fill in the body data and that the body data will be properly formated HTML.

Express-handlebars will take this layout file and apply it to all of the files that use Handlebars in the app. We 
can then focus our individual views just on the HTML that we are __rendering__ or displaying in that view.

What might be some examples of elements that we might want to include in a layout? Another way of asking this 
question is what types of elements might be common across the entire app.
<details>
Some potential answers:

- Navbars
- Common footers that include links to appear on all pages
- Common JavaScript links.
</details>

## Building the index page
Now that we have the layout setup we can start working on the indivdaul webpages we want to view. Lets start by 
working on our first page the index page. For this page we want to add some styling and show all of the candies in 
our Mongo database. 

We start by making a Handlebars template. Let's add the following template ``views/index.handlebars``.

```html
<h1>
  <a target="_blank" href="https://www.youtube.com/watch?v=mKli0y-Xr-Q">Candy Shoppe</a>
</h1>
<div class="container">
  
    {{#each candies}} 
    <ul>
      <li> <strong>Name : </strong> {{name}} </li>
      <li> <strong>Color : </strong> {{color}} </li>
    </ul>
    {{/each}}
</div>
```

Changing the controller


### Setting up the app
A quick aside on setting up the app. To actually view the app locally we need to 

## Partials
Some HTML is

##Excerise 

Ok, you've done this before.  Set up your form real quick in `candy/form.handlebars` with:

- A h3 tag that says "Create Candy!"
- Surrond your form with a fieldset tag. This will help bootstrap make the form look pretty 
- A form with a POST method that submits to the `/candies` endpoint
- Put the 
- Two inputs for name and color that have the css class `form-control` and placeholders that are the same as the 
name
- A submit button

Solution:
<details>
<h3>Create Candy!</h3>
<fieldset>
  <form method="POST" action="/candies">
    <div class="form-group col-md-4">
      <input name="name" class="form-control" placeholder="Name"/>
    </div>
    <div class="form-group col-md-4">
      <input name="color"  class="form-control" placeholder="Color"/>
    </div>
    <div class="form-group col-md-4">
      <input class="btn btn-primary col-md-12" type="submit" value="Submit">
    </div>
  </form>
</fieldset>
</details>

#### More Middleware We Might Use:
* [body-parser](https://www.npmjs.com/package/body-parser)
* [method-override](https://www.npmjs.com/package/method-override)
* [path](https://docs.nodejitsu.com/articles/file-system/how-to-use-the-path-module/)
* [morgan](https://www.npmjs.com/package/morgan)


<!--
> Note: Provide students with the correct answer once time is up

```html
<h3>Create Candy!</h3>
<fieldset>
  <form method="POST" action="/candies">
    <div class="form-group col-md-4">
      <input name="name" class="form-control" placeholder="Name"/>
    </div>
    <div class="form-group col-md-4">
      <input name="color"  class="form-control" placeholder="Color"/>
    </div>
      <div class="form-group col-md-4">
        <input class="btn btn-primary col-md-12" type="submit" value="Submit">
      </div>
  </form>
</fieldset>
```
-->

## Set up our layout to iterate over data - Catch-up (15 mins)

We'll create an index page that will double as our form.  But first let's make sure our application is set up to 
pass data from our database to our views if a user visits the `/candies` endpoint.

First, in our `config/routes.js` file, let's make sure our app can both get a list of all the candies and post a new candy from the same endpoint:

```javascript
var candiesController = require('../controllers/candies');

// http://localhost:3000/candies
router.route('/candies')

//GET all candies
   .get(candiesController.getAll)

//POST a new blob
   .post(candiesController.createCandy);
```

First, we require the controllers, then we set the candies routes and the `GET` AND `POST` actions that will occur when hitting this endpoint.  Now let's define these methods in our controller: `.getAll` and `.createCandy`.  We'll need to set up error handling and serve the response to the correct view with `.render`.  First, let's start with the `.getAll` function, together:

```javascript
// GET
function getAll(request, response) {
  Candy.find(function(error, candies) {
    if(error) response.json({message: 'Could not find any candy'});

    // response.json({message: candies});
    response.render('layout', {candies: candies});
  });
}
```

## Write a `createCandy` method that will pull from `name` and `color` inputs - Independent Practice (5 mins)

```javascript
// POST
function createCandy(request, response) {

  // fill in your code here

  candy.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate candy b/c:' + error});

    response.redirect('/candies');
  });  
}
```

<!--
> Note: Provide students with the correct answer once time is up

    ```
    console.log('in POST');
    console.log('body:',request.body);
    var candy = new Candy({name: request.body.name, color: request.body.color});
    candy.save();

    ```
-->


## Let's make our layout! Code along (15 mins)

First, all the header stuff is exactly the same as it would be in a `.html` file - in `layout.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Candy App</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
</head>
```

Again, even though this is an `.ejs` file we're able to write html because we've set up our app to use the ejs templating engine, which can render HTML with embedded JavaScript.

Now, we're going to do two things.  First, because we're assuming we're at the `/candies` endpoint, we'll have the `canides` object with all of our candies and the associated attributes.  So let's iterate over that object with JavaScript.  Just like you would in Ruby, you specify that what's being read is JavaScript with opening and closing `<% %>`, if you want the code to execute; `<%= %>` if you want the code to execute and render on the browser. 

> Note: Recent versions of EJS have [a few more options](https://www.npmjs.com/package/ejs#tags)

So let's create a `<body>` and first, let's show all of our candies, with the name and color:

```html
<body>

</body>
```

Now we can use partials within our layout.ejs page.  The method is `include` instead of `render`:

```html
...
    <hr>
    <div class="container">
        <% include ./partials/candy/form %>
    </div>
...
```

Now your `layout.ejs` page should look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Candy App</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="stylesheets/main.css" /></head>
<body>
    <h1>
        <a target="_blank" href="https://www.youtube.com/watch?v=mKli0y-Xr-Q">Candy Shoppe</a>
    </h1>
    <div class="container">
    <% for(var i=0; i< candies.length; i++) {  %>
    <ul>
      <li><b>Name : </b> <%= candies[i].name %></li>
      <li><b>Color : </b> <%= candies[i].color %></li>
    </ul>
    <% } %>
    </div>

    <hr>
    <div class="container">
        <% include ./partials/candy/form %>
    </div>

</body>
</html>
```


## Independent Practice (15 mins)

> ***Note:*** This can be a pair programming activity or done independently

Expand on this application by doing the following:

- Add an update link with the `link_to` helper to each candy on your `/candies` page
- Create an update page where users can update information about their candy
  - The update functionality is written for you already!
- Create a footer as a separate partial and render it in the layout.ejs file
  - In the footer add in "Candies ©"

Use these [docs](http://www.embeddedjs.com/getting_started.html).


## Conclusion (5 mins)
- Describe the difference between `ejs` views and partials.
- Describe how to configure your Express app to use `ejs`.
- Explain how `ejs` lets us render dynamic data on a particular view.
- Identify some middleware we are using and explain why you might or might not use it again.
