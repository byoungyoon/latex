"use client";

import { useStore } from "@/app/state";

export default function ResultAction() {
  const { value, setResultValue } = useStore();

  const onResult = () => {
    setResultValue(value);
  };

  return (
    <button
      type="button"
      className="outline-none bg-blue-300 text-white px-2 py-1 rounded-lg cursor-pointer"
      onClick={onResult}
    >
      변환하기
    </button>
  );
}
