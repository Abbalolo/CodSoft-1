import { FiEdit } from "react-icons/fi"; 

import { TbTrashFilled } from "react-icons/tb";

import Comment from "../../components/Comment";
import {  useNavigate, useParams } from "react-router-dom";
import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { imgF, url } from "../../ApiUrl";
import Loader from "../../components/Loader";
import { UserContext } from "../../context/UserContext";



export interface Post {
  _id: any;
  title: string;
  description: string;
  photo: string;
  username: string;
  updatedAt: string;
  categories: string[]
  userId: string;
}
export interface MyComment {
  id: any;
  author: string;
  comment: string;
  categories: string[];
  updatedAt: string;
}

function PostDetails() {

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("")
  const [comments, setComments] = useState<MyComment | null>(null);

  const { postId } = useParams<{ postId: string }>();

  const {user} = useContext(UserContext)

const navigate = useNavigate()

  const fetchPostDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Post>(`${url}/api/v1/posts/${postId}`);
      setPost(response.data);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setIsLoading(false);
    }
  };

const deletePost = async () => {
  setIsLoading(true);
  try {
    await axios.delete(`${url}/api/v1/posts/${postId}`, {
      withCredentials: true,
    });

    setIsLoading(false);
    navigate("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    setIsLoading(false);
  }
};

 
 const addComment = async (event: FormEvent<HTMLFormElement>) => {
   event.preventDefault();

   try {
     const newComment = {
       author: user?.username,
       comment: commentText,
       userId: user?._id,
       postId: postId,
     };

    await axios.post<MyComment>(
       `${url}/api/v1/comments/create`,
       newComment,
       { withCredentials: true }
     );
    //  console.log(res.data);
     fetchComments();
     setCommentText("");
    //  window.location.reload()
   } catch (error) {
     console.error("Error adding comment:", error);
   }
 };

const fetchComments = async () => {
  try {
    const res = await axios.get<MyComment>(
      `${url}/api/v1/comments/post/${postId}`,
      {
        withCredentials: true,
      }
    );
    setComments(res.data);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
  };


  useEffect(() => {
    fetchPostDetails();
     fetchComments();
  }, [postId]);


  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <Loader />
      </div>
    );
  }

  if (!post) {
    return <div className="h-screen w-full text-center"><p>Post not found.</p></div>;
  }



return (
  <main className="px-6 md:px-[150px] py-10 ">
    <div className="flex flex-col">
      <div className="flex justify-between ">
        <h1 className="text-xl font-bold md:mb-2 md:text-2xl">{post.title}</h1>
        <div className="flex items-center gap-4 text-xl">
          {user?._id === post.userId && (
            <>
              <button onClick={() => navigate(`/edit/${postId}`)} >
               <FiEdit />
              </button>
              <button onClick={deletePost}>
                <TbTrashFilled />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center mt-5 justify-between mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
        <p>@{post.username}</p>
        <div className="flex space-x-2">
          <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(15, 24)}</p>
        </div>
      </div>
    </div>

    <img
      src={imgF + post.photo}
      alt="Post"
      className="h-full w-full object-cover"
    />
    <p className="text-sm md:text-lg py-3">{post.description}</p>

    <div className="flex items-center mt-3 space-x-4 font-semibold">
      <p>Categories:</p>
      <div className="flex items-center  space-x-2 text-sm ">
        {post.categories.length !== 0
          ? post.categories.map((cat, index) => (
              <div key={index} className="bg-gray-300 rounded-md px-3 py-1">
                {cat}
              </div>
            ))
          : null}
      </div>
    </div>
    <div className="flex flex-col mt-4">
      <h3 className="flex items-center  font-semibold">Comments:</h3>
      <div className="flex flex-col gap-3">
        {Array.isArray(comments) &&
          comments.map((c) => (
            <div key={c.id}>
              <Comment comment={c} post={post}   fetchComments={ fetchComments} />
            </div>
          ))}
      </div>

      <form
        onSubmit={addComment}
        className="w-full flex flex-col mt-4 md:flex-row md:gap-4 "
      >
        <input
          type="text"
          placeholder="Write a comment"
          className="md:w-[80%] outline-none px-4 py-2 mt-4 md:mt-0 border rounded-md"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 md:w-[30%] mt-4 md:mt-0 text-sm md:text-base rounded-md">
          Add comment
        </button>
      </form>
    </div>
  </main>
);
}

export default PostDetails;
