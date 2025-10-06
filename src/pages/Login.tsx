import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contex/AuthContex";
import Swal from "sweetalert2";
import type { Login as LoginType } from "../types/types";

const Login = () => {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const [form, setForm] = React.useState<LoginType>({
    email: "nimantha@x.com",
    password: "11111111",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) return;

    try {
      await auth.login(form); // send both email & password
      Swal.fire({
        title: "Login successful",
        icon: "success",
      });
      navigate("/"); // redirect to home or dashboard
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        title: "Login failed",
        text: "Invalid credentials",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-gray-50 dark:bg-gray-900 p-5 rounded-2xl"
    >
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>

      {/* Register link */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Register here
        </Link>
      </p>
    </form>
  );
};

export default Login;
