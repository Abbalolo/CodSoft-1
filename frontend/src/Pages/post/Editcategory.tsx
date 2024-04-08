import { FormEvent, useContext, useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "axios";
import { url } from "../../ApiUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Editcategory() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [cat, setCat] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const navigate = useNavigate();
  const path = useLocation();
  const { user } = useContext(UserContext)

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/posts/${path.pathname.slice(6)}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPhoto(res.data.photo);
      setCats(res.data.categories);
      console.log(res.data)

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatePost: {
      title: string;
      userId: any;
      description: string;
      categories: string[];
      photo?: string | null;
    } = {
      title,
      description,
      userId: user?._id,
      categories: cats,
    };

    if (photo) {
      const data = new FormData();
      const filename = Date.now() + photo.name;
      data.append("img", filename);
      data.append("file", photo);
      updatePost.photo = filename;

      try {
        const imgUpload = await axios.post(`${url}/api/v1/upload`, data);
        console.log(imgUpload.data);
      
      } catch (error) {
        console.error(error);
      }
    }
    
    try {
      const res = await axios.put(`${url}/api/v1/posts/${path.pathname.slice(6)}`, updatePost, {
        withCredentials: true,
      });
      console.log(res.data)
      navigate(`/posts/post/${res.data._id}`);
      //  navigate(`/`);
    } catch (error) {
      console.log(error);
    }

  };

  const addCategories = () => {
    if (cat.trim() !== "") {
      setCats([...cats, cat.trim()]);
      setCat("");
    } else {
      console.log("Category cannot be empty");
    }
  };

  const deleteCategory = (index: number) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchPost();
  }, [path.pathname.slice(6)]);

  return (
    <div className="h-[85vh] flex justify-center items-center w-full flex-col px-6">
      <h1 className="text-xl font-bold md:text-2xl mt-8">Update post</h1>
      <form
        className="flex flex-col justify-center mt-7 gap-3 border p-4 md:w-[34%] w-full rounded-md py-5"
        onSubmit={handleSubmit}
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

        <div className="flex flex-col ">
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
          <div className="flex mt-3">
            {cats?.map((category, index) => (
              <div
                key={index}
                className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
              >
                <p>{category}</p>
                <p>
                  <FaRegTimesCircle onClick={() => deleteCategory(index)} />
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
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white w-full md:w-[40%] mx-auto md:text-lg font-bold py-2 px-4 rounded mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Editcategory;
