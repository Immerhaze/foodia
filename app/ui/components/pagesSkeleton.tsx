import { Skeleton } from "../../../components/ui/skeleton";

export function PageSkeleton() {
  return (
    <>
      <div className="w-full h-20 md:hidden text-secondary text-center flex justify-center items-center text-primary_text_light font-normal text-4xl">
        <h1>
          MEALT
          <span className="text-semantic_green_light font-extrabold">AI</span>M
        </h1>
      </div>
      <div className="h-20 w-full flex justify-center items-center">
        <button className="text-2xl rounded-lg w-2/3 text-white bg-semantic_green_light font font-semibold tracking-wider flex flex-row justify-center items-center py-2">
          <h2>RECETAS</h2>
        </button>
      </div>
      <div className="h-1/2  md:h-1/2 bg-white rounded-xl shadow-md mx-2 overflow-hidden">
        <div className="w-full border-black/10 border-b-2 h-20 bg-gray-200 mb-6 p-2 flex justify-center items-center">
          <div className="animate-pulse rounded-md bg-muted w-full h-9 bg-slate-500/30"></div>
        </div>
        <div className="w-full h-full flex flex-col gap-3 p-5 ">
          <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-1/4 "></div>
          <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-1/4 mb-6"></div>
          <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-3/4 mb-3"></div>
          <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-3/4"></div>
        </div>
      </div>
      <div className="flex w-full h-[15%] flex-row justify-between items-center">
        <span className=" embla__prev h-1/2 w-14 rounded-xl shadow-semantic_green_light shadow-sm bg-widget_light flex justify-center items-center">
          <span className="icon-[material-symbols--arrow-back] text-2xl"></span>
        </span>
        <span className="embla__next h-1/2 w-14 rounded-xl shadow-semantic_green_light shadow-sm bg-widget_light flex justify-center items-center">
          <span className="icon-[material-symbols--arrow-forward] text-2xl"></span>
        </span>
      </div>
      <div className="w-full h-1/6 flex flex-col items-center justify-start gap-2  p-2">
        <span className="w-1/2 rounded-xl h-10 flex flex-row items-center shadow-semantic_green_light shadow-sm bg-widget_light ">
          <span className="icon-[mdi--email-arrow-right] text-3xl mr-2"></span>
          <div className="animate-pulse rounded-md bg-muted h-4 w-[70%] bg-slate-500/30"></div>
        </span>
        <span className="w-1/2 rounded-xl h-10 flex flex-row items-center shadow-semantic_green_light shadow-sm bg-widget_light ">
          <span className="icon-[dashicons--pdf] text-3xl mr-2"></span>
          <div className="animate-pulse rounded-md bg-muted h-4 w-[70%] bg-slate-500/30"></div>
        </span>
        <span className="w-1/2 md:hidden rounded-xl h-10 flex flex-row items-center shadow-semantic_green_light shadow-sm bg-widget_light ">
          <span className="icon-[icon-park-twotone--back] text-semantic_green_light text-3xl mr-2"></span>
          <div className="animate-pulse rounded-md bg-muted h-4 w-[70%] bg-slate-500/30"></div>
        </span>
      </div>
    </>
  );
}
