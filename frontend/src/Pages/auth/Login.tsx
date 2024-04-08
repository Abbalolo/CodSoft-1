import axios from "axios";
import { useState, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../ApiUrl";
import ErrorPage from "../../components/ErrorPage";
import Loader from "../../components/Loader";
import { UserContext } from "../../context/UserContext";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (password.length < 4) {
        alert("Password must be at least 4 characters long");
        return;
      }
      if (!email.includes("@")) {
        alert("Invalid email format");
        return;
      }
      const res = await axios.post(
        `${url}/api/v1/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      setIsLoading(false);
      setError(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.log(err);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleLogin();
  };

  return (
    <main className="h-[85vh] flex justify-center items-center w-full flex-col px-6">
      <h2 className="text-lg md:text-xl font-bold text-center">Login</h2>
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-7 gap-2 border p-4 md:w-[35%] w-full rounded-md py-5"
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            className="border text-gray-400 border-gray-300 focus-within:border-black outline-none rounded-md p-2 w-full"
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
          <div className="flex items-center border text-gray-400 focus-within:border-black border-gray-300 outline-none rounded-md p-[0.5rem] w-full">
            <input
              className="outline-none w-full "
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="flex text-[22px]"
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

        <button
          type="submit"
          className="bg-black text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
      <div className="my-5">
        Don't have an account?{" "}
        <Link
          className="font-semibold underline hover:text-blue-400"
          to="/register"
        >
          Register here
        </Link>
      </div>
      <ErrorPage error={error} />
    </main>
  );
}

export default Login;
