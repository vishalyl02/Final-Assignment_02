import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Register from "./Register";
import Login from "./LoginForm";
import Profile from "./Profile";
import MyPosts from "./MyPosts";
import FollowAuthors from "./FollowAuthors";
import Navbar from "./Navbar";
import Category from "./Category";
import articles from "./ArticleData"; // Import the sample article data
import RegisterForm from "./RegisterForm";
import seedData from "./seedData"
const App = () => {

  const handleFollow = (authorId) => {
    console.log(`Following author with ID ${authorId}`);
  };

  const [user, setUser] = useState(null);


  const categories = ["science", "business", "art", "music", "nature"];
  const [posts, setPosts] = useState(seedData);

  const [newPost, setNewPost] = useState({
    title: "",
    topic: "",
    featuredImage: "",
    text: "",
    dateTime: "",
    author: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const addNewPost = () => {
    setPosts((prevPosts) => [
      ...prevPosts,
      {
        id: prevPosts.length + 1,
        ...newPost,
        likes: 0,
        comments: 0,
      },
    ]);
    setNewPost({
      title: "",
      topic: "",
      featuredImage: "",
      text: "",
      dateTime: "",
      author: "",
    });
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <div>
      <Navbar />

<Switch>
  {categories.map((category) => (
    <Route key={category} path={`/category/${category}`}>
      <Category
        name={category.charAt(0).toUpperCase() + category.slice(1)}
        articles={articles.filter((article) => article.category === category)}
      />
         </Route>
        ))}
        <Route path="/" exact>
          <h1>Welcome to the Home Page</h1>
        </Route>
      </Switch>
      Navigation Links
      <nav>
        <ul>
           <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/my-posts">My Posts</Link>
              </li>
              <li>
                <Link to="/follow-authors">Follow Authors</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by post, author, or topic..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Show all posts */}
      {filteredPosts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>Topic: {post.topic}</p>
          <img src={post.featuredImage} alt="Featured" />
          <p>{post.text}</p>
          <p>Date: {post.dateTime}</p>
          <p>Author: {post.author}</p>
          <p>Likes: {post.likes}</p>
          <p>Comments: {post.comments}</p>
          <button onClick={() => deletePost(post.id)}>Delete Post</button>
        </div>
      ))}

      {/* Add new post */}
      <div className="new-post">
        <h2>Add New Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
        /> 
         <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={newPost.topic}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="featuredImage"
          placeholder="Featured Image URL"
          value={newPost.featuredImage}
          onChange={handleInputChange}
        />
        <textarea
          name="text"
          placeholder="Text"
          value={newPost.text}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={newPost.dateTime}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newPost.author}
          onChange={handleInputChange}
        />
        <button onClick={addNewPost}>Submit Post</button>
      </div>

     {/* Level 2 - User Registration and Login Routes */}
     <Switch>
     <Route path="/register" component={RegisterForm} />
        <Route path="/login">
          <Login />
        </Route>
        {user && (
          <>
            <Route path="/profile">
              <Profile user={user} />
            </Route>
            <Route path="/my-posts">
              <MyPosts posts={posts} />
            </Route>
            <Route path="/follow-authors">
              <FollowAuthors authors={[]} onFollow={handleFollow} />
            </Route>
          </>
        )}
      </Switch>
    </div>
  );
};

export default App;