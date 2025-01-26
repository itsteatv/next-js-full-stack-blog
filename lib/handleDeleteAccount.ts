
import { userDeleteAccount } from "@/actions/userDeleteAccount";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const handleDeleteAccount = async (
  providedId: string,
  setIsDeleting: (deleting: boolean) => void,
  router: ReturnType<typeof useRouter>
) => {
  let deletionSuccessful = false;

  try {
    setIsDeleting(true);

    await userDeleteAccount({ provided_id: providedId });

    toast.success("Your account has been successfully deleted.");
    deletionSuccessful = true;

    router.replace("/");

    if (deletionSuccessful) {
      window.location.reload();
    }
  } catch (error) {
    toast.error("Failed to delete your account. Please try again.");
    console.error("Error deleting account:", error);
  } finally {
    setIsDeleting(false);
  }
};
