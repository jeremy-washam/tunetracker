# Platform Client

For this lab, I built a movie review website called Film Finder. 
* My original client (from lab 4) is deployed here: [v1](http://jeremywasham-lab4-filmfinder.surge.sh/)
* The updated frontend (for lab 5, now linked to my deployed heroku api) is here [v2](http://jeremywasham-filmfinder-v2.surge.sh/), this one is somewhat outdated now that I've added auth (it won't let you create a new post) but I figured I'd keep the link here anyway.
* And finally, the finished product, the working frontend with authentication: [Film Finder](http://jeremywasham-filmfinder-final.surge.sh/)

Below you can find my original description for lab 4, a summary of the changes I made to go along with lab 5, and a summary of the authentication stuff that I added in SA8.

(Note: I tagged these three versions as v1, v2, and v3, corresponding to each of the 3 assignments - this is somewhat confusing since my platform api is only tagged with v1 and v2, which technically go with v2 and v3 of the platform client).

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

## SA 8 Updates

Adding authentication to the frontend took a lot of work honestly, and I spent more time on this than I did on lab 5. In my finished product, I have working routes for signup and signin, both of which are displayed in the navbar (along the link to see all reviews) when a user isn't authenticated. Once a user has signed up or signed in, the navbar displays links to create a new post or sign out (again, along with the "all reviews" link).  While this setup sort of removes the need to make /posts/new re-route to signin if a user isn't authenticated (because they won't see the link), I still implemented that feature, which you can test by typing in the URl. Finally, I added a username to new posts when they're created, and each post now displays the username of the person who wrote it in addition to the usual title, content, tags, rating, and cover image. 

## SA 8 Limitations 
* All of the authentication stuff works, but I didn't get a chance to handle errors very gracefully on the frontend. For instance, if you try to signin and you enter an emaila that isn't found, nothing happens. That's not ideal, and I'm sure I could have figured out how to display a message telling the user that their email wasn't found, but I didn't get around to it.
* I also didn't get a chance to implement search or comments, either of which would've made the site a lot cooler.
