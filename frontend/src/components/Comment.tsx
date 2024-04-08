import axios from "axios";
import { TbTrashFilled } from "react-icons/tb";
import { url } from "../ApiUrl";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Post } from "../context/SearchContext";

interface MyComment {
  _id: any;
  author: string | undefined;
  comment: any;
  categories: string[];
  updatedAt: string;
}

interface CommentProps {
  comment: MyComment;
  post: Post;
  fetchComments: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, post, fetchComments }) => {
  const { user } = useContext(UserContext);

const deleteComment = async (id: any) => {
  try {
    if (id) {
      
      await axios.delete(`${url}/api/v1/comments/${id}`, {
        withCredentials: true,
      });

      fetchComments();
    } else {
      console.error("Error deleting comment: Comment ID is undefined or empty");
    }
  } catch (error) {
    // Handle error
    console.error("Error deleting comment:", error);
  }
};


  return (
    <div className="flex flex-col gap-2">
      <div className="px-2 py-2 bg-gray-200 rounded-lg gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-600">{comment.author}</h3>
          <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
            <p>{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(comment.updatedAt).toString().slice(15, 24)}</p>
            <div className="flex items-center gap-4 text-xl">
              {user?._id === post.userId && (
                <button onClick={() => deleteComment(comment._id)}>
                  <TbTrashFilled />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="px-4 mt-2">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
