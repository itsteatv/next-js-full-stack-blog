"use client";

import { useState, useTransition } from "react";
import Modal from "./Modal";
import Button from "@/components/Button";
import Loading from "@/app/[locale]/blog/loading";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { deleteAccount } from "@/actions/deleteAccount";
import toast from "react-hot-toast";

interface DeleteAccountSectionProps {
  userId: string;
}

const DeleteAccountSection = ({ userId }: DeleteAccountSectionProps) => {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("dashboard");
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAccount(userId);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Account deleted successfully.");
        router.push("/en/blog");
      }
    });
  };

  return (
    <div
      className="flex flex-col items-start mx-auto max-w-2xl gap-8 px-4 sm:px-6 lg:px-8"
      role="region"
      aria-labelledby="delete-account-heading"
    >
      <div>
        <h2
          id="delete-account-heading"
          className="text-2xl font-semibold dark:text-white leading-tight"
        >
          {t("deleteAccount.title")}
        </h2>
        <p className="mt-4 text-base dark:text-gray-300 leading-relaxed">
          {t("deleteAccount.description")}
        </p>
        <p className="mt-2 text-sm dark:text-gray-400">
          {t("deleteAccount.warning")}
        </p>
      </div>

      <Button
        type="button"
        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-red-500 hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-red-400 focus-visible:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-gray-400"
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
        isLoading={isPending}
        label={t("deleteAccount.button")}
        pendingContent={t("deleteAccount.deleteLoading")}
        loadingComponent={
          <div className="relative w-6 h-6">
            <Loading color="white" />
          </div>
        }
        aria-label={isPending ? "Deleting your account" : "Delete your account"}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h3 className="text-lg font-semibold dark:text-white">
              {t("modal.title")}
            </h3>
            <p className="mt-2 text-sm dark:text-white">
              {t("modal.description")}
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <Button
                className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
                label={t("modal.cancel")}
              />
              <Button
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                onClick={handleDelete}
                label={isPending ? t("modal.deleteLoading") : t("modal.delete")}
                disabled={isPending}
                isLoading={isPending}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteAccountSection;
