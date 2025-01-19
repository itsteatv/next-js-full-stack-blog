"use client";

import { Spinner } from "@/components/Spinner";

interface LoadingProps {
  color?: string;
}

const Loading = ({ color }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center absolute inset-0">
      <Spinner width={24} height={24} color={color} />
    </div>
  );
};

export default Loading;
