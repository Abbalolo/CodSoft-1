import axios from "axios";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../ApiUrl";
import ErrorPage from "../../components/ErrorPage";
import Loader from "../../components/Loader";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      if (password === cpassword) {
        const res = await axios.post(`${url}/api/v1/auth/register`, {
          username,
          email,
          password,
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setIsLoading(false);
        setError(false);
        navigate("/login");
      } else {
        console.log("Passwords don't match");
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.log(err);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.length < 4) {
      alert("Username must be at least 4 characters long");
      return;
    }
    if (password.length < 4) {
      alert("Password must be at least 4 characters long");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email format");
      return;
    }
    if (password !== cpassword) {
      alert("Passwords don't match");
      return;
    }
    await handleRegister();
  };

  return (
    <main className="h-[85vh] flex justify-center items-center w-full flex-col px-6">
      <h2 className="text-lg md:text-xl font-bold text-center">Register</h2>
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-7 gap-2 border p-4 md:w-[35%] w-full rounded-md py-5"
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="name">
            UserName:
          </label>
          <input
            className="border text-gray-400 border-gray-300 focus-within:border-black outline-none rounded-md p-2 w-full"
            type="text"
            id="name"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.length < 4 && (
            <span className="text-red-500">
              Username must be at least 4 characters long
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            className="border focus-within:border-black text-gray-400 border-gray-300 outline-none rounded-md p-2 w-full"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!email.includes("@") && (
            <span className="text-red-500">Invalid email format</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="password">
            Password:
          </label>
          <div className="relative">
            <input
              className="border text-gray-400 border-gray-300 focus-within:border-black outline-none rounded-md p-2 w-full pr-12"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400"
              onClick={handleTogglePassword}
            >
              {showPassword ? <AiFillEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {password.length < 4 && (
            <span className="text-red-500">
              Password must be at least 4 characters long
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <div className="relative">
            <input
              className="border text-gray-400 border-gray-300 focus-within:border-black outline-none rounded-md p-2 w-full pr-12"
              type={showCPassword ? "text" : "password"}
              id="confirm-password"
              name="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400"
              onClick={handleToggleCPassword}
            >
              {showCPassword ? <AiFillEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
      <div className="my-5">
        Already have an account?{" "}
        <Link
          className="font-semibold underline hover:text-blue-400"
          to="/login"
        >
          Login here
        </Link>
      </div>
      <ErrorPage error={error} />
    </main>
  );
}

export default Register;
