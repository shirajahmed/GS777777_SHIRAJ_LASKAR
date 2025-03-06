// register page

import { useState } from "react";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const newUser = { name, email, password };

    try {
      toast.success("Registration successful!");
    } catch {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center  bg-[#f5f5f5]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-[#dcdcdc]"
      >
        <h3 className="text-[#101010] text-center mb-4 text-2xl font-semibold">
          Sign Up
        </h3>

        <div className="mb-4">
          <label className="block text-[#303030] mb-2">First name</label>
          <input
            type="text"
            className="w-full p-3 border border-[#ced4da] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ec297] focus:border-[#0ec297]"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#303030] mb-2">Email address</label>
          <input
            type="email"
            className="w-full p-3 border border-[#ced4da] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ec297] focus:border-[#0ec297]"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#303030] mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-[#ced4da] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ec297] focus:border-[#0ec297]"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-3 bg-[#0ec297] text-white font-semibold rounded-lg hover:bg-[#88c2bb] transition-colors"
          >
            Sign Up
          </button>
        </div>

        <p className="text-right text-sm">
          Already registered?{" "}
          <a href="/login" className="text-[#ff5e8a] hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
