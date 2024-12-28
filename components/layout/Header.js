// dependencies
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Logout from "../auth/Logout";

const Header = async () => {
  // get logged in user session info
  const session = await auth();

  return (
    <nav>
      <Link href="/">
        <Image
          src="/assets/stayswift.svg"
          alt="Stay Swift Logo"
          width={174}
          height={60}
        />
      </Link>
      <ul>
        <li>
          <Link href="/hotels">Recommended Places</Link>
        </li>
        <li>
          <Link href="#">About Us</Link>
        </li>
        <li>
          <Link href="#">Contact us</Link>
        </li>
        <li>
          <Link href="/bookings">Bookings</Link>
        </li>

        {session?.user ? (
          <div className="flex justify-center items-center gap-x-2">
            <p>{session?.user?.name}</p>
            <span>|</span>
            <Logout />
          </div>
        ) : (
          <li>
            <Link href="/login" className="login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
