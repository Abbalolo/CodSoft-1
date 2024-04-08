import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../ApiUrl";
import HomePost from "../components/HomePost";
import { SearchContext } from "../context/SearchContext";
import ContentLoader from "../components/ContentLoader";

export interface Post {
  _id:any,
  title: string;
  description: string;
  photo: string;
  username: string;
  updatedAt: string;
  userId: string;
}

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { filteredList } = useContext(SearchContext);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Post[]>(`${url}/api/v1/posts/`);
      setPosts(response.data);
     
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setPosts(filteredList);
  }, [filteredList]);

  return (
    <div className="px-6 md:px-[100px] ">
      {isLoading ? (
        <div className="h-screen w-full">
          <ContentLoader />
        </div>
      ) : (
        <HomePost posts={posts} />
      )}
    </div>
  );
};

export default Dashboard;
