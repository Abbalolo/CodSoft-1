import { FormEvent, useContext, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { url } from "../../ApiUrl";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [cat, setCat] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPost: {
      title: string;
      username: string | undefined;
      userId: any;
      description: string;
      categories: string[];
      photo?: string | null; 
    } = {
      title,
      description,
      username: user?.username,
      userId: user?._id,
      categories: cats,
    };

    if (photo) {
      const data = new FormData();
      const filename = Date.now() + photo.name; 
      data.append("img", filename);
      data.append("file", photo);
      newPost.photo = filename;

      try {
        const imgUpload = await axios.post(`${url}/api/v1/upload`, data);
        console.log(imgUpload.data);
      
      } catch (error) {
        console.error(error);
      }


    }

    try {
      const res = await axios.post(`${url}/api/v1/posts/create`,newPost, { withCredentials: true } )
      // console.log(res.data)
       navigate(`/posts/post/${res.data._id}`);
      //  navigate(`/`);
    } catch (error) {
      console.log(error)
    }

  };

  const addCategories = () => {
    if (cat.trim().length > 0) {
      setCats((prevCats) => [...prevCats, cat.trim()]);
      setCat("");
    }
  };

  const deleteCategories = (index: number) => {
    const updatedCats = cats.filter((_, i) => i !== index);
    setCats(updatedCats);
  };

  return (
    <div className="h-[85vh] flex justify-center items-center w-full flex-col px-6">
      <h1 className="text-xl font-bold md:text-2xl mt-8">Create new post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-7 gap-3 border p-4 md:w-[34%] w-full rounded-md py-5"
      >
        <div className="flex flex-col gap-3">
          <input
            className="border text-gray-400 border-gray-300 outline-none rounded-md p-2 w-full"
            type="text"
            placeholder="Enter post title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
       
          <input
            className="border text-gray-400 border-gray-300 outline-none rounded-md p-2 w-full"
            type="file"
            name="photo"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            required
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input
              className="border text-gray-400 border-gray-300 outline-none rounded-md p-2 w-full"
              type="text"
              placeholder="Enter post category"
              name="category"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />

            <button
              type="button"
              onClick={addCategories}
              className="bg-black rounded-sm text-white px-4 py-2 font-semibold cursor-pointer"
            >
              Add
            </button>
          </div>
          {/* categories */}
          <div className="flex mt-3">
            {cats.map((cat, index) => (
              <div
                key={index}
                className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
              >
                <p>{cat}</p>
                <p>
                  <FaRegTimesCircle onClick={() => deleteCategories(index)} />
                </p>
              </div>
            ))}
          </div>
        </div>
        <textarea
          className="px-2 outline-none py-2 border"
          placeholder="Enter post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white w-full md:w-[40%] mx-auto md:text-lg font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
