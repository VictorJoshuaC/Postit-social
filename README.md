## Post-it API

<p>Post-it API is a RESTful API for a simple blogging platform. It allows users to create, read, update, and delete blog posts, as well as create and reply to comments on blog posts.

The API is built using Node.js with the Express framework, and it uses MongoDB for data storage. It also uses JSON Web Tokens (JWTs) for user authentication and authorization.</p>

References
List any references or external resources used in the project.

Troubleshooting
Provide any troubleshooting information for common issues.

# Getting Started
 To get started with the Post-it API, you will need to have Node.js and MongoDB installed on your system.


<ol>
    <li>Clone this repository to your local machine.</li>
    <li>Navigate to the root directory of the project in your terminal.</li>
    <li>Run npm install to install all the required dependencies.</li>
    <li>Create a .env file in the root directory of the project, and add the following environment variables:</li>
    PORT=<5000> <br>
    MONGO_URI=<mongodb+srv://admin:Jxk5VzRrbzAoXXVi@cluster2.j2yrznc.mongodb.net/post-itsocial?retryWrites=true&w=majority><br>
    JWT_SECRET=<mysecretkey>

   <li>Run npm start to start the API server.</li>

</ol> 

# Endpoints
 <b>Authentication</b>

<p> POST /users/register - Register a new user.
    POST /users/login - Log in an existing user.
<h3>Posts</h3>
    GET /posts - Get all posts.
    GET /posts/:id - Get a specific post by ID.
    POST /posts - Create a new post.
    PUT /posts/:id - Update an existing post by ID.
    DELETE /posts/:id - Delete an existing post by ID.
    Comments  POST /posts/:postId/comments - Create a new comment on a post.
    PUT /posts/:postId/comments/:commentId - Update an existing comment on a post by ID.
</p>

<p>
 <b>Comments</b>
    POST /posts/:postId/comments - Create a new comment on a post.
    PUT /posts/:postId/comments/:commentId - Update an existing comment on a post by ID.
    DELETE /posts/:postId/comments/:commentId - Delete an existing comment on a post by ID.
    POST /comments/:commentId/replies - Create a new reply to a comment.
    PUT /comments/:commentId/replies/:replyId - Update an existing reply to a comment by ID.
    DELETE /comments/:commentId/replies/:replyId - Delete an existing reply to a comment by ID.
</p>
  <b>User</b>  
    GET /users - Get all users.
    GET /users/:id - Get a specific user by ID.
    PUT /users/:id - Update an existing user by ID.
    DELETE /users/:id - Delete an existing user by ID.
</p>


# Models
  <p>
    User
    name - The name of the user.
    email - The email address of the user.
    password - The hashed password of the user.
    avatarUrl - The URL of the user's avatar.

    Post
    title - The title of the post.
    body - The body content of the post.
    user - The ID of the user who created the post.
    comments - An array of comments on the post.

    Comment
    body - The body content of the comment.
    user - The ID of the user who created the comment.
    replies - An array of replies to the comment.

    Reply
    body - The body content of the reply.
    user - The ID of the user who created the reply.
  </p>

  ## Authentication and Authorization
    The Post-it API uses JSON Web Tokens (JWTs) for user authentication and authorization. When a user logs in or registers, the API generates a JWT and returns it to the client. The client must then include the JWT in the Authorization header of any subsequent requests that require authentication or authorization.

<h2>API USES </h2> 
<i>
  JWT_SECRET, a secret key stored on the server, to sign the JWTs and verify their authenticity.

    To implement authentication and authorization, the API provides two middleware functions: authenticateToken and authorizeUser.

    The authenticateToken middleware function checks if the Authorization header contains a JWT, verifies its authenticity using JWT_SECRET, and adds the decoded payload to the request object if the JWT is valid. If the JWT is invalid or missing, the middleware returns a 401 Unauthorized response.

    The authorizeUser middleware function checks if the authenticated user has the required role(s) to access the requested resource. It takes an array of roles as a parameter and checks if the authenticated user has at least one of the roles. If the user has the required role(s), the middleware calls the next middleware function in the chain. If the user doesn't have the required role(s), the middleware returns a 403 Forbidden response
</i>



## Troubleshooting

Here are some common issues you may encounter while using this Post-it API, along with suggestions for how to resolve them:

* Authentication errors: If you are unable to authenticate with the API, ensure that you are providing a valid JWT in the Authorization   header of your requests. You can generate a JWT by logging in or registering a user with the API.

* Authorization errors: If you are unable to access a particular resource, ensure that the user associated with your JWT has the necessary permissions. For example, if you are trying to delete a post, ensure that the user associated with your JWT is the creator of the post.

* CORS errors: If you are making requests to the API from a different domain or port, you may encounter CORS (Cross-Origin Resource Sharing) errors. To resolve this, ensure that the API is configured to allow requests from your domain or port.

* Server errors: If you are encountering server errors, such as 500 Internal Server Error, check the logs for any error messages or stack traces. This can help you identify the cause of the error and determine how to resolve it.

* Database errors: If you are encountering database errors, such as 404 Not Found, ensure that the requested resource exists in the database. You may also want to check that the database is properly configured and running.

* Request validation errors: If you are receiving errors related to invalid request parameters or data, ensure that you are providing valid data in the correct format. You can refer to the API documentation for guidance on valid request parameters and data formats.





The directory style shown in the example is commonly known as the "Model-View-Controller" (MVC) directory structure. It's a software design pattern that separates an application into three interconnected components: the model (data), the view (user interface), and the controller (logic). The goal of this pattern is to separate concerns and improve the maintainability, scalability, and testability of an application.




