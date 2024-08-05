import { cn } from "@/lib/utils";

interface FunctionalBtnProps {
  classNameIcon?: string;
  classNameBtn?: string;
  text?: string;
  fn?: (arg: any) => void;
}

export function FunctionalBtn({
  classNameIcon,
  classNameBtn,
  text,
  fn,
}: FunctionalBtnProps) {
  return (
    <span
      onClick={fn} // Use the fn prop as the onClick handler
      className={cn(
        `rounded-xl flex flex-row justify-center items-center shadow-semantic_green_light shadow-sm bg-widget_light cursor-pointer`,
        classNameBtn
      )}
    >
      <span className={cn(`text-3xl md:text-4xl mr-2`, classNameIcon)}></span>
      <p>{text}</p>
    </span>
  );
}
