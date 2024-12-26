"use client";

import { Spinner } from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center absolute inset-0">
      <Spinner width={24} height={24} color="white" />
    </div>
  );
};

export default Loading;
