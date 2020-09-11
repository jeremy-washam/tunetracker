# Platform Client

For this lab, I built a movie review website called Film Finder. 
* My original client (from lab 4) is deployed here: [Film Finder v1](http://jeremywasham-lab4-filmfinder.surge.sh/)
* The updated frontend (for lab 5, now linked to my deployed heroku api) is here [Film Finder v2](http://jeremywasham-filmfinder-v2.surge.sh/)

Below you can find my original description for lab 4, as well as a summary of the frontend changes I made to go along with lab 5. 

## Lab 4 Overview

It took me a long time to figure everything out for this one, but I'm very happy with the final result. All of the lab specs are fully implemented: there are individual routes for new post, list view, and full post view, the app makes CRUD api calls to create, update, or delete a post, and to fetch a post by id or fetch all posts, and the content supports markdown. The site displays tiles for each movie review, with the movie title, cover image, and tags. The nav bar has routes to the main page (which displays all of the posts) and the new post page, with input fields for title, tags, cover URL, and content. I added some simple input validation here (which  doesn't allow you to create a post with any empty fields). When you click on a post, it displays the full post (routed by post ID) with the image, tags, title, and review, as well as some nice little icons to delete the post, edit the post, or go back to the main page. 

Going forward, I plan to add star reviews (using a React component library called react-star-rating), add author name to each review (once authentication is added), and add search and comments as well. I'd like it to be a site where people can log in and add reviews/ratings, search for reviews of their favorite movies, and comment on other people's reviews.

## Lab 4 Limitations
* I was hoping to do more with the styling (beyond just dark mode with white text and an accent color for hover effects,etc), but I ended up just going with a similar look to my previous lab (and honestly I like the look of that one a little bit more). That said, I am still happy with how it looks, so this isn't a huge hangup.
* I wanted to do more robust input validation, particularly for the cover URL, but I couldn't figure it out.
* I planned on combining my "new post" component and the "edit post" within my post component - they're almost identical and I ended up using a lot of the same code for both of them - but I didn't get a chance to refactor it.

## Lab 4 Attempted Extra Credit
* While it's similar to a blog, it is technically "something other than a blog" (a movie review website!) The distinctions should become a lot clearer once I finish lab 5 and SA8, especially once I add star ratings.
* I added very simple input validation - in "new post," it displays a little error message if you leave any of the fields blank, and it won't let you create a new post unless each field is filled in. 

## Lab 5 Updates

For the second part of the project (lab 5), instead of using the CS52 API, I linked the client to my own API, hosted at Heroku. You can find my code along with my description of that part of the project [here](https://github.com/dartmouth-cs52-20X/platform-api-jeremy-washam)

Creating my own backend allowed me to make a few changes to the project. The biggest change was that I added ratings to the movie reviews. I added another field for each post, called "ratings," which takes a number from 0 to 5. From there, I used a cool React Component library called react-star-ratings to render the ratings  - basically, when you create a new post, you rate each movie from 0 to 5, and the component fills in the stars based on the rating (i.e. if you enter 3, 3 stars are filled in). I added the star ratings to the full post view, as well as to the tile view. I also added a way to sort the reviews on the main page / tile view, either by date (most recent reviews show up first), or by rating (with the highest rating films showing up first). I handled the sorting on the backend, adding a function called fetchPostsByRating that, as the name suggests, returns the posts by rating. I'm not sure if this is the most efficient way to do this, but it provided some extra practice with server side routing and whatnot, and it works great, so I'm happy with it. 

## Lab 5 Attempted Extra Credit
Both mentioned above: the addition of a new field / display for star ratings, and the added ability to sort the posts by rating. 
