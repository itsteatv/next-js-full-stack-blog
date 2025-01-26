import { downloadUserData } from "@/actions/downloadUserData";

export const handleDownloadData = async (
  setIsDownloading: (downloading: boolean) => void
) => {
  setIsDownloading(true);

  try {
    const jsonString = await downloadUserData();

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Failed to download user data:", error);
    alert("Failed to download user data. Please try again.");
  } finally {
    setIsDownloading(false);
  }
};
