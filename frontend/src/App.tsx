import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./Pages/Dashboard";
import Footer from "./components/Footer";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import PostDetails from "./Pages/post/PostDetails";
import CreatePost from "./Pages/post/CreatePost";
import Editcategory from "./Pages/post/Editcategory";
import Profile from "./Pages/user/Profile";
import { UserContextProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";
import MyBlog from "./Pages/user/MyBlog";

function App() {
  return (
    <UserContextProvider>
      <SearchProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/post/:postId" element={<PostDetails />} />
            <Route path="/write" element={<CreatePost />} />
            <Route path="/edit/:id" element={<Editcategory />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/my-blog" element={<MyBlog />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </SearchProvider>
    </UserContextProvider>
  );
}

export default App;
