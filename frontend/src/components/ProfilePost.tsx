import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { imgF, url } from "../ApiUrl";
import { Link} from "react-router-dom";
import ContentLoader from "./ContentLoader";
import { UserContext } from "../context/UserContext";

export interface Post {
  _id: any;
  title: string;
  description: string;
  photo: string;
  username: string;
  updatedAt: string;
  categories: string[];
  userId: string;
}

function ProfilePost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const fetchPostDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Post[]>(
        `${url}/api/v1/posts/user/${user?._id}`
      );
      setPosts(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [user?._id]);

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <ContentLoader />
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="h-screen w-full text-center">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row mt-8 md:space-x-4">
      {posts.length !== 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <Link to={`/posts/post/${post._id}`}>
              <div className="flex flex-col md:flex-row h-full gap-3">
                {/* Left */}
                <div className="flex md:h-[200px] md:w-[500px] w-full justify-center items-center">
                  <img
                    src={imgF + post.photo}
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
                      <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                      <p>{new Date(post.updatedAt).toString().slice(15, 24)}</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-lg">
                    {post.description.slice(100)}....
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="h-screen w-full text-center">
          <p className=" font-semibold text-2xl lg:text-3xl ">
            Sorry, post is empty
          </p>
        </div>
      )}
    </div>
  );
}

export default ProfilePost;
