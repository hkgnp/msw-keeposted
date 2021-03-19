# How to Use

- msw keeposted can be accessed at [https://suspicious-northcutt-d2f899.netlify.app](https://suspicious-northcutt-d2f899.netlify.app)
- Details of the API used for this prototype can be found at [https://github.com/hkgnp/msw-keeposted-api](https://github.com/hkgnp/msw-keeposted-api)
- As this is a prototype, please do not use it for actual services, and do not key in any sensitive patient data.

This app consists of 6 core functions:

1. Dynamic search of various attributes
2. Filter resources by resource category
3. Change number of results per page
4. Post reviews of resources
5. Register / Login / Log out (to contribute resources)
6. Contribute / Edit resources and upload a relevant picture.
7. User dashboard (to edit your name and email)

# Project Summary

This web application is to be used by Medical Social Workers (MSWs) to contribute resources that may be helpful to their colleagues within or outside their organisation. It is a community driven platform where contributors only need to register to contribute new resources, but registration is not needed to review resources.

# Strategy

It is important for MSWs to be kept updated on the latest health and social care resources that can be used to help patients. Often time, MSWs will need to either maintain their own database of resources, or to frequently ask around whenever their patient needs something that they are not familiar with. Depending on who is asked, there may be different responses. And because the landscape changes quickly, information can get outdated by the time you need it.

This application hopes to be able to create a consolidate pool of updated resources for everyone to reference, and for MSWs to be able to also contribute reviews to keep the data refreshed.

## User Stories

1. As a MSW, I want to be able to look for relevant social and healthcare resources using keywords.
2. As a MSW, I want to be able to contribute new resources that I have come across and provide useful details about them.
3. As a MSW, I want to be able to leave reviews of resources that I have used for my patients, to better advise other MSWs who are thinking of using them.
4. As a user, I want to be able to edit the resources that I or my fellow healthcare professionals have contributed.

# Scope

The app must be able to perform the following functions:

- Allow users to employ a variety of search and filter methods to locate the resource they need.
- Allow a user to register, log in and log out.
- Users' passwords must be hashed before storing on the database.
- Allow a user to edit their details on their own dashboard.
- For accountability purposes, to only allow registered users to contribute new resources.
- Allow registered users to edit not only their own contributions, but those of others as well.
- To encourage resources to be vetted as much as possible, allow non-registered users to contribute reviews.
- Each resource should contain critical information, including a map to allow easy location of resource.

# Structure

### Dynamic search

Dynamic search for resources using either the Title, Description, Address or Postal Code. Users can also adjust the number of results that they want to see in one page.

### Filter resources

Filter resources by their category. Users can also adjust the number of results that they want to see in one page.

### Post reviews

Post reviews of resources for other users to decide on the suitability for their patients.

### Register / Login / Log out

Register for an account to contribute or edit resources. User can login and a JWT will be stored on the browser until the user logs out, where it will be deleted.

### User dashboard

Users who have registered and logged in, can access their Dashboard where they can change their display name and username.

### Contribute resource / Edit resource

Registered users can log in to contribute a new resource or edit an existing resource (contributed by themselves or others). They will also be able to upload a picture from their device to provide more details about the resource.

# Skeleton

![image](./readmescreenshots/dashboard.png)
![image](./readmescreenshots/posts.png)
![image](./readmescreenshots/contributeresource.png)
![image](./readmescreenshots/resource.png)

# Code style

Code is formatted using Prettier (installed as an extension in VS Code).
[![js-standard-style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg?style=flat)](https://github.com/prettier/prettier)

# Deployment

`msw-keeposted` is deployed to Netlify. The API for resources, reviews and user information is hostedon Heroku. MongoDB and Amazon S3 are used for storing text information and images respectively. API details can be found at []()

`msw-toolbox` is deployed to Github Pages. MongoDB is used to store the referral information for retrieval, and the API used to communicate with MongoDB is hosted on Heroku. This API was specially created for this project and it can be found on [msw-keeposted API](https://github.com/hkgnp/msw-keeposted-api). Dependency details for the API can be found on the page directly.

# Tech/frameworks Used

This app is made only possible thanks to the following technologies:

- [Github](https://www.github.com/)
- [Node](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [reactstrap](https://reactstrap.github.io/)
- [React Router](https://reactrouter.com/)
- [Express](https://expressjs.com/)
- [Leaflet](https://leafletjs.com/)
- [Leaflet Default Icon Compatibility](https://github.com/ghybs/leaflet-defaulticon-compatibility)
- [Bootstrap](https://getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [MongoDB](https://www.mongodb.com/cloud/atlas)
- [Amazon S3](https://aws.amazon.com/s3/)
- [Heroku](https://www.heroku.com)
- [Axios](https://github.com/axios/axios)
- [Unsplash](https://unsplash.com)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- Built with [VS Code](https://code.visualstudio.com/)

# API References

And it is also made only possible thanks to the painstaking work done by the following organisations:

- [OneMap](https://app.swaggerhub.com/apis/onemap-sg/new-onemap-api/1.0.3)
- [Open Street Map](https://www.openstreetmap.org/)
- [Mapbox](https://www.mapbox.com/)

# Acknowledgments

- Mr Paul Chor
- Mr Alexander Yan
- Mr Shun
- Mr Ace Liang
- Mr Christopher Seow
- My wonderful classmates who have been part of this journey together:
  - Hidayah
  - Howard
  - Julius
  - Ryan
  - Ying Ru
- The following guides that helped me understand React further:
  - [To Handle Authentication with Node JS, Express, Mongo, JWT](https://codeburst.io/to-handle-authentication-with-node-js-express-mongo-jwt-7e55f5818181)
  - [Stack Overflow: how to implement Pagination in reactJS](https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs)
