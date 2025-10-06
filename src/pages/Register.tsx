import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contex/AuthContex";
import type { Register } from "../types/types";
import Swal from "sweetalert2";

const Register = () => {
  const useAuth = React.useContext(AuthContext);
  const [form, setForm] = React.useState<Register>({
    name: "nimantha",
    email: "nimantha@x.com",
    password: "11111111",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!useAuth) return; // safety check

    try {
      await useAuth.register(form);
      Swal.fire({
        title: "Registration successful",
        icon: "success",
      });
      // useAuth.login(newUser);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
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
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => handleChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
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
          onChange={(e) => handleChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          onChange={(e) => handleChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            required
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
        Register
      </button>

      {/* Register link */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
        Don’t have an account?
        <Link to="/login">
          <a className="text-blue-600 hover:underline dark:text-blue-400">
            Login here
          </a>
        </Link>
      </p>
    </form>
  );
};

export default Register;
