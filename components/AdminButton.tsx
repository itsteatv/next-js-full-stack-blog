  "use client";

  import toast from "react-hot-toast";
  import Button from "./Button";
  import { useRouter } from "next/navigation";

  const AdminButton = ({ isAdmin }: { isAdmin: boolean }) => {
    const router = useRouter();

    const handleAdmin = function () {
      if (isAdmin) {
        router.push("/admin");
      } else {
        toast.error("You are not admin!");
      }
    };

    return (
      <Button
        onClick={handleAdmin}
        content="Admins only"
        type="button"
        className="inline-block w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed bg-white px-8 py-4 mt-4 text-center duration-300 font-semibold text-black no-underline"
        ripple
        variant="gradient"
      />
    );
  };

  export default AdminButton;
