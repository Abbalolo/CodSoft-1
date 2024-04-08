// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Post } from "../Pages/Dashboard";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { imgF } from "../ApiUrl";

interface HomePostProps {
  posts: Post[];
}

const HomePost: React.FC<HomePostProps> = ({ posts}) => {
  const { user } = useContext(UserContext);

  return (
    <div className=" flex flex-col  my-8 gap-5">
      {posts.length != 0 ? (
        posts?.map((post) => (
          <div key={post._id}>
            <Link to={user ? `/posts/post/${post._id}` : "/login"}>
              <div className="flex flex-col md:flex-row h-full gap-3">
                {/* Left */}
                <div className="flex md:h-[200px] md:w-[500px] w-full justify-center items-center">
                  <img
                    src={imgF+post.photo}
                    alt="my image"
                    className="h-full w-full md:object-cover object-contain "
                  />
                </div>
                {/* Right */}
                <div className=" py-2 md:py-2  w-full">
                  <h1 className="text-xl font-bold md:mb-2 md:text-2xl">
                    {post.title}
                  </h1>
                  <div className="flex items-center justify-between mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
                    <p>@{post.username}</p>
                    <div className="flex  items-center gap-2 ">
                      {/* <p>{formattedDates[post.createdAt]}</p> */}
                      <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                      <p>{new Date(post.updatedAt).toString().slice(15, 24)}</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-lg">
                    {post.description.slice(300)}....
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="h-screen w-full text-center">
          <p className=" font-semibold text-2xl lg:text-3xl ">
            sorry post not available
          </p>
        </div>
      )}
    </div>
   
  );
};

export default HomePost;
