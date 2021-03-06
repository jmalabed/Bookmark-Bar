# General Assembly Project 1: The Bookmark Bar

This project utilizes MongoDB, Mongoose, EJS, Express.js, and Node.js in order to render a database containing resources relevant to topics that have been covered in the General Assembly coursework. The application accepts new resources which can be voted on to show which resources have been the most helpful.


## Index:

 - [Scope](#Scope)
 - [User Stories](#user-stories)
 - [Link to Page](#link-to-page)
 - [Site Graphics](#site-graphics)
 - [Minimum Viable Product](#minimum-viable-product)
 - [Code Snippets](#code-snippets)
 - [Future Work](#future-work)
 - [Acknowledgements](#acknowledgements)



## Scope


### Technologies

This project is completed with:
 - HTML
 - CSS
 - Javascript
 - Express.js
 - MongoDB
 - Mongoose
 - Node.js

## User Stories
### Main Objectives
 - When navigating to the index, a user will be able to navigate to the desired topic of their choice.
 - user utilizes wiki-page style navigation
 - user will be able to contribute and edit resources on topic page
 - A user will be able to add likes to highlight helpful resources
 - A user will be able to update and delete resources from their respective lists
### Stretch Goals
 - Individual user profile to contain resources
 - A user will be able to add comments to resources to note anything particular.
 - A separate about us page will be created to give background on the contributors.
 - A user will be able to find context behind resources through a descriptive blog post in which the code from the particular resource has been implemented.


## Link to Page
- [The BookmarksBar](https://damp-gorge-54237.herokuapp.com/)
## Site Graphics
### Sitemap

![Sitemap](https://github.com/jmalabed/project1/blob/submaster/wireframe/pr1-sitemap.png)

### Wireframe
#### First Pass

![Topic Wireframe](https://github.com/jmalabed/project1/blob/submaster/ari-topic-index.jpg)

#### Full Site Wireframes

[Link to Wireframes](https://github.com/jmalabed/project1/blob/submaster/SiteWireframeREADME.md)

### Entity Relationship Diagram

![ERD](https://github.com/jmalabed/project1/blob/submaster/wireframe/pr1-ERD.png)

## Minimum Viable Product
- Create an Express Application.
- Utilize CRUD routes using REST conventions.
- Use EJS to render objects from MongoDB in the browser as HTML.
- Instantiate and persist at LEAST two models to a Mongo Database. Use at least one one-to-many or many-to-many relationships between models.
- At least one model needs to include full CRUD functionality.
- 50+ Git commits.
- Write clean and professional-looking code. Include comments where necessary and utilize spacing and proper indentation to ensure that code is easy to follow.
- Visual design with Flexbox, CSS Grid, Bootstrap, Materialize, Foundation, Skeleton, or another CSS framework to make your front-end snazzy. First impressions matter!
- Deploy app on Heroku.


## Code Snippets
### Login Logout Button - J

```
<div class="float-right mr-5">
  <% if (user) { %>
    <p>Welcome, <%=user.username%>! </p>
    <form action="/user/logout?_method=DELETE" method="POST">
      <input type="submit" class="btn btn-danger" name="" value="LOGOUT">
    </form>


  <% } else { %>
    <a href="/user" id="loginLink"><button type="button" name="login"  id="login" class="btn btn-primary">LOGIN</button></a>
    <script type="text/javascript">
      const welcomeMsg = document.getElementById('welcomeMsg')
    </script>
  <% }%>
</div>
```

## Future Work
#### Account Setup
- Accounts should not be able to have the same username.
- Users should have account page. This will contain the ability to change password, set a profile picture, and

#### Comment Ranking
- Comments should appear in order of how many likes they have and be sortable. The comment with the greatest number of likes should also be visible.


## Acknowledgements
-Bootstrap
