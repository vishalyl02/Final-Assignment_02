import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Login from "./LoginForm";
import MyItems from "./MyItems";
import FollowAuthors from "./FollowAuthors";
import Category from "./Category";
import BlogEditor from "./BlogEditor";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import PricingPage from "./Pricing";
import "./style.css";
import BlogEdit from "./BlogEdit";
import "./App.css"
import SaveForLater from "./SaveForLater";
import NavigationLinks from "./NavigationLinks"
import UserProfile from "./UserProfile";
import PostCreationForm from "./PostCreationForm";
import RevisionHistory from "./RevisionHistory";
import scienceImages from "./Science";
import businessImages from "./Business";
import artImages from "./Art";
import musicImages from "./Music";
import natureImages from "./Nature";
import BlogList from "./BlogList";
import Drafts from "./Drafts";
import Bookmark from "./Bookmarks"
import AfterComponent from "./AfterComponent";



const SaveForLaterPosts = ({ savedPosts }) => {
  return (
    <div>
      <h2>Saved Posts</h2>
      {savedPosts.map((post) => (
        <Blog
          key={post.id}
          post={post}
          onDelete={() => {}}
          onEdit={() => {}}
          onSaveForLater={() => {}}
        />
      ))}
    </div>
  );
};


const calculateReadingTime = (text) => {
  if (!text) {
    return "Content not available"; // Return a custom message for unknown reading time
  }

  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTimeMinutes} minute${readingTimeMinutes !== 1 ? 's' : ''}`;
};


const Blog = ({ post, onDelete, onEdit, onSaveForLater }) => {
  const readingTime = calculateReadingTime(post.text);

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>Topic: {post.topic}</p>
      <img src={post.featuredImage} alt="Featured" />
      <p>{post.text}</p>
      <p>Date: {post.dateTime}</p>
      <p>Author: {post.author}</p>
      <p>Likes: {post.likes}</p>
      <p>Comments: {post.comments}</p>
      <p>
        Reading Time: {readingTime === "N/A" ? "N/A" : `${readingTime} minute${readingTime !== 1 ? 's' : ''}`}
      </p>
      <button onClick={() => onEdit(post)}>Edit</button>
      <button onClick={() => onDelete(post.id)}>Delete Post</button>
      <button onClick={() => onSaveForLater(post)}>Save for Later</button>
    </div>
  );
};






const App = () => {


  const [savedPosts, setSavedPosts] = useState([]);
const [filterAuthor, setFilterAuthor] = useState("");
const [filterDate, setFilterDate] = useState("");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]); // Set initial value to []
  const [showEditForm, setShowEditForm] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // Possible values: "likes", "comments", ""
  const [sortedPosts, setSortedPosts] = useState([]);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [topics, setTopics] = useState([]); 
  const [showAddNewPostForm, setShowAddNewPostForm] = useState(false);
  const [afterPosts, setAfterPosts] = useState([]);

  const handleToggleNewPostForm = () => {
    setShowAddNewPostForm(!showAddNewPostForm);
  };

  const [drafts, setDrafts] = useState([]); // Define drafts state
  const [stpts, setStpts] = useState([]); // Define posts state with a different name

  const addDraftToPosts = (draft) => {
    // Add the draft's details to the list of all posts using the setStpts function
    setStpts((prevStpts) => [
      ...prevStpts,
      { ...draft, id: prevStpts.length + 1, likes: 0, comments: 0 },
    ]);
  };


  const initialPostState = {
    title: "",
    topic: "",
    featuredImage: "",
    text: "",
    dateTime: "",
    author: "",
  };
  

  const saveAsDraft = () => {
    setDrafts((prevDrafts) => [...prevDrafts, newPost]); // Save the newPost as a draft
    setNewPost({
      title: "",
      topic: "",
      featuredImage: "",
      text: "",
      dateTime: "",
      author: "",
    });
    history.push("/drafts"); // Navigate to the Drafts route
  };



  const saveAfter = () => {
    const updatedAfterPosts = [...afterPosts, newPost];
    setAfterPosts(updatedAfterPosts);
    localStorage.setItem("afterPosts", JSON.stringify(updatedAfterPosts));
    setNewPost(initialPostState); // Replace initialPostState with your initial post state
  };

  const sortByLikes = () => {
    const sorted = [...filteredPosts].sort((a, b) => b.likes - a.likes);
    setSortOrder("likes");
    setSortedPosts(sorted);
  };

  const sortByComments = () => {
    const sorted = [...filteredPosts].sort((a, b) => b.comments - a.comments);
    setSortOrder("comments");
    setSortedPosts(sorted);
  };

  const resetSort = () => {
    setSortOrder("");
    setSortedPosts([]);
  };



  const saveForLater = (post) => {
    setSavedPosts((prevSavedPosts) => [...prevSavedPosts, post]);
    localStorage.setItem("savedPosts", JSON.stringify([...savedPosts, post]));
  };



  useEffect(() => {
    // Fetch the data from the backend API
    axios.get("http://localhost:5000/api/books")
      .then((response) => {
        setPosts(response.data); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 





  useEffect(() => {
    // Fetch the data from the backend API
    axios.get("http://localhost:5000/api/topics")
      .then((response) => {
        setTopics(response.data); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);








  useEffect(() => {
    // On component mount, set filteredPosts to all posts
    setFilteredPosts(posts);
  }, [posts]);

  const history = useHistory(); 



  const handleLogin = () => {
    // alert("hello")
    setUser(true); // Set the user to true when logged in
    // ... your other login logic ...
  };
 

  const handleLogout = () => {
    setUser(null); // Set the user to null when logged out
    // ... your other logout logic ...
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (!value || value.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts?.filter((post) => {
        return (
          post?.title?.toLowerCase().includes(value.toLowerCase()) ||
          post?.author?.toLowerCase().includes(value.toLowerCase()) ||
          post?.topic?.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredPosts(filtered || []);
    }
  };

  const handleFilterByAuthor = () => {
    const filtered = posts?.filter(
      (post) =>
        post?.author?.toLowerCase() === filterAuthor.toLowerCase()
    );
    setFilteredPosts(filtered || []);
  };

  const handleFilterByDate = () => {
    const filtered = posts?.filter((post) => {
      const postDate = new Date(post.dateTime).toISOString().slice(0, 10);
      return postDate === filterDate;
    });
    setFilteredPosts(filtered || []);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilterAuthor("");
    setFilterDate("");
    setFilteredPosts(posts);
  };
  const [editedPost, setEditedPost] = useState({
    id: null,
    title: "",
    topic: "",
    featuredImage: "",
    text: "",
    dateTime: "",
    author: "",
    likes: 0,
    comments: 0,
  });

  // Function to handle the "Edit" button click
  const editPost = (post) => {
    setEditedPost(post);
    setShowEditForm(true); // Show the BlogEdit component
    history.push("/"); // Navigate back to the home screen when Edit is clicked
  };

  // Function to handle the update of an edited post
  const updatePost = () => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      )
    );
    setEditedPost({
      id: null,
      title: "",
      topic: "",
      featuredImage: "",
      text: "",
      dateTime: "",
      author: "",
      likes: 0,
      comments: 0,
    });
  };
  const cancelEdit = () => {
    setEditedPost(null);
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleFollow = (authorId) => {
    console.log(`Following author with ID ${authorId}`);
  };

  const categories = ["science", "business", "art", "music", "nature"];

  const [newPost, setNewPost] = useState({
    title: "",
    topic: "",
    featuredImage: "",
    text: "",
    dateTime: "",
    author: "",
  });

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
  const location = useLocation();
  const isAllPostsRoute = location.pathname === "/all-posts";

  // Filter the posts based on the route
  const postsToShow = isAllPostsRoute ? filteredPosts : filteredPosts.slice(0, 2); // Show 2 posts in initial view

  return (
    <div>
      <Router>
      <NavigationLinks user={user} categories={categories} />

<Switch>
 {categories.map((category) => (
          <Route key={category} path={`/category/${category}`}>
            <Category
              name={category.charAt(0).toUpperCase() + category.slice(1)}
              articles={topics.filter((topic) => topic.category === category)}
              images={
                category === "science"
                  ? scienceImages
                  : category === "business"
                  ? businessImages
                  : category === "art"
                  ? artImages
                  : category === "music"
                  ? musicImages
                  : category === "nature"
                  ? natureImages
                  : []
              }
            />
          </Route>
        ))}
  <Route path="/" exact>
    <h1>Welcome to the Home Page</h1>
    <BlogList />
  </Route>
  <Route path="/pricing" component={PricingPage} />
  <Route path="/all-posts">
  <div className="search-bar">
          <input
            type="text"
            placeholder="Search by post, author, or topic..."
            value={searchQuery}
            onChange={handleSearch}
          />
        <input
            type="text"
            placeholder="Filter by author"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          />
          <input
            type="date"
            placeholder="Filter by date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button onClick={handleFilterByAuthor}>Filter by Author</button>
          <button onClick={handleFilterByDate}>Filter by Date</button>
          {searchQuery && (
            <button onClick={clearSearch}>Clear Search and Filters</button>
          )}
        </div>
      <div className="sort-buttons">
          <button onClick={sortByLikes}>Sort by Likes</button>
          <button onClick={sortByComments}>Sort by Comments</button>
          <button onClick={resetSort}>Reset Sort</button>
        </div>

       {/* Show all posts */}
       {sortOrder !== "" ? (
          sortedPosts.map((post) => (
            <Blog
              key={post.id}
              post={post}
              onDelete={deletePost}
              onEdit={editPost}
              onSaveForLater={saveForLater} 
            />
          ))
        ) : (
          filteredPosts.map((post) => (
            <Blog
              key={post.id}
              post={post}
              onDelete={deletePost}
              onEdit={editPost}
              onSaveForLater={saveForLater}
            />
          )))}

        {showEditForm && (
          <BlogEdit
            editedPost={editedPost}
            setEditedPost={setEditedPost}
            onCancel={() => setShowEditForm(false)} // Hide the BlogEdit component
            onUpdate={() => {
              updatePost();
              setShowEditForm(false); // Hide the BlogEdit component after updating
            }}
          />
        )}
           
            <button onClick={handleToggleNewPostForm}>Add New Post</button>
            {showAddNewPostForm && (
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
      <div>
      {editedPost.id ? ( // Editing an existing post
        <div>
          <button onClick={updatePost}>Update Post</button>
        </div>
      ) : (
        <div>
          <button onClick={addNewPost}>Submit Post</button>
          <button onClick={saveAfter}>Save as Draft</button> {/* Using "saveAfter" function */}
        </div>
      )}
    </div>
  </div>
)}
          </Route>
</Switch>
        <Route path="/saved-posts">
        <SaveForLaterPosts savedPosts={savedPosts} />
      </Route>
        {/* Level 2 - User Registration and Login Routes */}
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login">
              <Login onLogin={handleLogin} />
            </Route>
                 
            <Route path="/after" component={AfterComponent} />
            <Route path="/drafts" component={Drafts} />
                 <Route path="/bookmarks">
              <Bookmark />
            </Route>

          {user && (
            <>
              <Route path="/userprofile">
              <UserProfile user={user} onLogout={handleLogout} />
              </Route>
              <Route path="/create-post">
                     <PostCreationForm />
                   </Route>
                   <Route path="/my-items">
              <MyItems />
                 </Route>
              <Route path="/follow-authors">
                <FollowAuthors authors={[]} onFollow={handleFollow} />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;