// directives
"use client";

// dependencies
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SocialLogins = ({ fromLogin }) => {
  return (
    <>
      <div className="text-center text-xs text-gray-500">
        {fromLogin ? (
          <Link href="/register">Register</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}{" "}
        or Signup with
      </div>
      <div className="flex gap-4">
        <button className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
          <Image src="/assets/fb.png" alt="fb" width={20} height={20} />
          <span>Facebook</span>
        </button>
        <button
          className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
          onClick={() =>
            signIn("google", { callback: "http://localhost:3000/bookings" })
          }
        >
          <Image src="/assets/google.png" alt="fb" width={20} height={20} />
          <span>Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogins;
