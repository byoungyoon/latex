import ResultAction from "@/app/_action/ResultAction";
import ValueAction from "@/app/_action/ValueAction";
import MathJaxAction from "@/app/_action/MathJaxAction";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="w-[1200px] h-[840px] border border-gray-300 rounded-lg p-4 flex gap-4">
        <div className="w-1/2 h-full flex flex-col items-end gap-3">
          <ValueAction />
          <ResultAction />
        </div>
        <div className="flex-1" style={{ zoom: 2 }}>
          <MathJaxAction />
        </div>
      </div>
    </div>
  );
}
