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

## Views in Express

Some times we want to render the HTML directly from server. Some examples of why we might want to do this are:
- SEO to ensure that the words that appear to a user appear to search engines
- Support for older browsers
- Large JavaScript downloads for pages with limited functionality

Rendering the HTML is often called a view. Using Express out of the box, the view engine is Jade - an engine that 
relies on white space.  But we're familiar with Handlebars. We can actually use Handlebars to create HTML on the 
server that we can then send as a response.

We are going to return to our `candies` app to focus on how to add views using Handlebars, pass data to those views,
and DRY up the views by using partials.

### Setting up the current app
- Clone the repo
- Change to the ``starter-code`` directory
- Make sure Mongo is running
- Run ``npm install``
- Run ``node db/seed.js``
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
// other code

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
```

Let's look at a few things going on here: `path` is a core Node module dealing with paths.  In our example, we've 
added the [path.join()](https://nodejs.org/api/path.html#path_path_join_path1_path2) method. For us, this normalizes 
all the arguments into a path string which will help when we use the `__dirname` global variable and a file or 
folder.  After adding this, our Node app's view folder will look like:  
`/Users/your_username/your_projects_folder/starter-code/views`

It won't check for an existing path but it will transform the path string.

The second app.set() tells Express to use the Handlebars templating engine. This allows you to use Handlebars 
templates to render your HTML. We also have set up a layout of ``main.handlebars``. A layout is a template file that 
includes many of the basic page elements. We'll go over layouts in more detail in the next section.

Since we're ready to use `.handelbars` now, let's set up our file structure to make sure our application can call the files properly. Create the following folder structure:

```
- views/
----layouts
--------main.handlebars

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
Now that we have the layout setup we can start working on the individual web pages we want to view. Lets start by 
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

Now we can user the ``render`` method of ``response`` object in our route callback to render the Handlebars template.
How do we do this? 

Look in ``controllers/candies.js`` file. In the ``getAll`` function right now we're returning JSON but we want to 
user Handlebars. This is super easy we change 

```javascript
  response.json(dbCandies);
```

to 

```javascript
  response.render('index', {candies: dbCandies});
```

The first argument 'index' says which view to use and object contains the information to pass to Handlebars.  In 
this case we have a ``candies`` object in our template and we want the ``dbCandies`` object to take its place in
this version of template.

Take 3 minutes to add the following to your copy of the repo:

- install Handlebars
- the main.handlebars layout
- the index.handlebars view 

## Partials
Some HTML is used over and over in your app. One example is to a form to create a candy. Our index page is pretty
bland right now. Let's make it more functional by adding a create candy form.

###Excerise 
This partial will be just HTML so let's try to write about it independently. Set up your form real quick in 
`views/partials/form.handlebars` with:

- A h3 tag that says "Create Candy!"
- Surround your form with a fieldset tag. This will help bootstrap make the form look pretty.
- A form with a POST method that submits to the `/candies` endpoint
- Two inputs for name and color that have the css class `form-control` and placeholders that are the same as the 
name
- A submit button
- Around each input and the submit tag add div with classes ``form-group`` and ``col-md-4``.

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

To add partial to the ``index`` template all we need to do is add:
```javascript
 {{> createCandyForm }}
```

## Independent Practice 

> ***Note:*** This can be a pair programming activity or done independently

Expand on this application by doing the following:

- Add a new route to make a separate new candy page using the partial
- Create an update page where users can update information about their candy
  - The update controller functionality is written for you already!
- Create a footer as a separate partial and render it in the main.handlebars file
  - In the footer add in "Candies ©"

Use these [docs](https://github.com/ericf/express-handlebars).

## Conclusion 
- Describe how to configure your Express app to use Handlebars.
- Use Handlebars templates 
- Explain how Handlebars lets us render dynamic data on a particular view.


