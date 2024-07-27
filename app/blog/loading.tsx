"use client";

import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center absolute inset-0">
      <Spinner className="h-6 w-6" />
    </div>
  );
};

export default Loading;
