"use client";

import { useStore } from "@/app/state";
import BaseMathJax from "@/app/_component/BaseMathJax";

export default function MathJaxAction() {
  const { resultValue } = useStore();

  return <BaseMathJax content={resultValue} />;
}
