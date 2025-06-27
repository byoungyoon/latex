"use client";

import { useStore } from "@/app/state";
import { ChangeEventHandler } from "react";

export default function ValueAction() {
  const { value, setValue } = useStore();

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <textarea
      className="bg-gray-100 w-full h-full p-4 text-base outline-none"
      value={value}
      onChange={onChange}
    />
  );
}
