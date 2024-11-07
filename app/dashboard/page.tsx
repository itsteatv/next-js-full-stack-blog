import Input from "@/components/Input";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {
  UserCircleIcon,
  UserGroupIcon,
  AtSymbolIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Dashboard = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  return (
    <div className="divide-y divide-white/5">
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
              <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-full w-full text-gray-300"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <div>
                <button
                  type="button"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                >
                  Change avatar
                </button>
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-white"
              >
                First name
              </label>

              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                  <UserCircleIcon aria-hidden="true" className="h-5 w-5" />
                </div>
              </div>
              <Input
                id="first-name"
                name="first-name"
                type="text"
                value={user?.given_name || ""}
                placeholder="Please enter your first name"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Last name
              </label>
              <div className="mt-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                    <UserGroupIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                </div>
                <Input
                  id="last-name"
                  name="last-name"
                  type="text"
                  value={user?.family_name || ""}
                  placeholder="Please enter your last name"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                    <AtSymbolIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user?.email || ""}
                  placeholder="Please enter your email"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute left-0 flex items-center pl-3">
                      <UserIcon aria-hidden="true" className="h-5 w-5" />
                    </div>
                  </div>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={user?.username || ""}
                    placeholder="Please enter your username"
                    className="flex-1 border-0 bg-transparent py-1.5 pl-10 text-white focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              type="button"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
