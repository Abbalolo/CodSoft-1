import {  useContext, useState } from "react";
import ProfilePost from "../../components/ProfilePost";
import axios from "axios";
import { url } from "../../ApiUrl";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

function Profile() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const { postId } = useParams<{ postId: string | undefined }>();

10

  const updateUserAccount = async () => {
    try {
      const res = await axios.put(
        `${url}/api/v1/users/${user?._id}`,
        {
          username,
          email,
          // password
        },
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserAccount = async () => {
    try {
      const res = await axios.delete(`${url}/api/v1/users/${user?._id}`,
        { withCredentials: true });
      console.log(res.data);
      setUser(null)
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchProfile();
  // }, [postId]);

  return (
    <div className="px-6 md:px-[200px] mt-8 flex md:flex-row md:gap-10 justify-center flex-col-reverse md:items-start items-start ">
      <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
        <h1 className="font-bold text-xl mt-8 md:mt-0">Your post</h1>
        <ProfilePost />
      </div>
      <div className="md:sticky md:top-16 w-full flex flex-col md:justify-end items-center  space-y-4 md:w-[30%]">
        <h1 className="text-xl font-bold mb-4 md:mb-0 text-center">profile</h1>
        <div className=" flex flex-col gap-3 w-full">
          <input
            className="border text-gray-400 border-gray-300 outline-none rounded-md p-2 w-full"
            type="text"
            name="username"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border  text-gray-400 border-gray-300 outline-none rounded-md p-2 w-full"
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input
            className="border  text-gray-400 border-gray-300 outline-none rounded-md p-2 w-full"
            type="password"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <div className="flex items-center space-x-3 mt-3">
            <button
              onClick={updateUserAccount}
              className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 rounded-md"
            >
              Update
            </button>
            <button
              onClick={deleteUserAccount}
              className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 rounded-md"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
