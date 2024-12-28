// dependencies
import { auth } from "@/auth";
import Image from "next/image";

const User = async () => {
  // get logged in user session
  const session = await auth();

  return (
    <section className="mt-[100px]">
      <div className="container">
        {/* profile info */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* profile image */}
          <div className="relative max-h-[180px] max-w-[180px] rounded-full lg:mb-8 h-[100px] w-[100px] bg-orange-600 grid place-items-center text-4xl text-white">
            {session?.user?.image ? (
              <Image
                alt={session?.user?.name}
                src={session?.user?.image}
                width={95}
                height={95}
                className="rounded-full"
              />
            ) : (
              session?.user?.name?.charAt(0)
            )}
          </div>
          {/* name , email */}
          <div>
            <h3 className="text-2xl font-semibold lg:text-[28px]">
              {session?.user?.name}
            </h3>
            <p className="leading-[231%] lg:text-lg">{session?.user?.email}</p>
          </div>
          <div className="w-3/4 border-b border-[#a4a4a4] py-6 lg:py-4" />
        </div>
        {/* end profile info */}
      </div>
    </section>
  );
};

export default User;
