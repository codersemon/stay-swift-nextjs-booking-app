// directives
"use client";

import { loginAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  // error state
  const [error, setError] = useState(null);
  const router = useRouter();

  // handle submit
  const handleSubmit = async (e) => {
    // prevent default action
    e.preventDefault();

    try {
      // get form data
      const formData = new FormData(e.currentTarget);

      const res = await loginAction(formData);

      if (!res.error) {
        router.push("/bookings");
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit" className="btn-primary w-full mt-4">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
