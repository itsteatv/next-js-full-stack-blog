"use client";

import { useState } from "react";
import Modal from "./Modal";
import Button from "@/components/Button";
import Loading from "@/app/[locale]/blog/loading";
import { useTranslations } from "next-intl";
import { handleDeleteAccount } from "@/lib/handleDeleteAccount";
import { useRouter } from "next/navigation";

interface DeleteAccountSectionProps {
  userId: string;
}

const DeleteAccountSection = ({ userId }: DeleteAccountSectionProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("dashboard");
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        onClick={openModal}
        disabled={isDeleting}
        isLoading={isDeleting}
        label={t("deleteAccount.button")}
        pendingContent={t("deleteAccount.deleteLoading")}
        loadingComponent={
          <div className="relative w-6 h-6">
            <Loading color="white" />
          </div>
        }
        aria-label={
          isDeleting ? "Deleting your account" : "Delete your account"
        }
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
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
                onClick={closeModal}
                label={t("modal.cancel")}
              />
              <Button
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                onClick={async () => {
                  await handleDeleteAccount(userId, setIsDeleting, router);
                  closeModal();
                }}
                label={
                  isDeleting ? t("modal.deleteLoading") : t("modal.delete")
                }
                disabled={isDeleting}
                isLoading={isDeleting}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteAccountSection;
