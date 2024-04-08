import axios from "axios";
import { createContext, useState, useContext, ReactNode } from "react";
import { url } from "../ApiUrl";

type MyComponentProps = {
  children: ReactNode;
};

interface SearchContextType {
  searchQuery: string;
  handleSearch: (query: string) => void;
  filteredList: Post[];
}

export interface Post {
  _id: any,
  title: string;
  description: string;
  photo: string;
  username: string;
  updatedAt: string;
  userId: string;
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  handleSearch: () => {},
  filteredList: [],
});

export const SearchProvider = ({ children }: MyComponentProps) => {
  const [filteredList, setFilteredList] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchPosts = async (query: string) => {
     try {
       const response = await axios.get<Post[]>(`${url}/api/v1/posts/`);

       const filtered = query
         ? response.data.filter(
             (item) =>
               item.title.toLowerCase().includes(query.toLowerCase()) ||
               item.description.toLowerCase().includes(query.toLowerCase())
           )
         : [];
       setFilteredList(filtered);
     } catch (error) {
       console.error("Error fetching posts:", error);
     }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchPosts(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch, filteredList }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
