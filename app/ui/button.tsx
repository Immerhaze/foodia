import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-bold tracking-wide w-full text-xl h-10 bg-white border-2 p-2 rounded-xl shadow-sm shadow-semantic_green_light flex flex-row gap-2 justify-center items-center",
        className
      )}
      {...rest} // Ensure that all the passed props are spread here, including onClick
    >
      {children}
    </button>
  );
}
