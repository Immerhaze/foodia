import { cn } from "@/lib/utils";
export function PageSkeleton() {
  function SkeletonCard({ className }: any) {
    return (
      <>
        <div
          className={cn(
            " h-[350px] w-1/2 bg-white rounded-xl shadow-md mx-2 overflow-hidden",
            className
          )}
        >
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
      </>
    );
  }
  function SkeletonButtons({ icon, classNameIcon, classnameBtn }: any) {
    return (
      <span
        className={cn(
          "w-1/2 rounded-xl h-10 md:h-20 flex flex-row justify-center items-center shadow-semantic_green_light shadow-sm bg-widget_light ",
          classnameBtn
        )}
      >
        <span
          className={cn(
            `icon-[${icon}] text-3xl md:text-4xl mr-2`,
            classNameIcon
          )}
        ></span>
        <div className="animate-pulse rounded-md bg-muted h-4 md:h-8 w-[70%] bg-slate-500/30"></div>
      </span>
    );
  }
  return (
    <>
      <div className="w-full h-20 md:hidden text-secondary text-center flex justify-center items-center text-primary_text_light font-normal text-4xl">
        <h1>
          MEALT
          <span className="text-semantic_green_light font-extrabold">AI</span>M
        </h1>
      </div>
      <div className="h-20 w-full flex justify-center items-center">
        <span className="text-2xl rounded-lg w-2/3 text-white bg-semantic_green_light font font-semibold tracking-wider flex flex-row justify-center items-center py-2">
          <h2>Cargando..</h2>
        </span>
      </div>
      <div className="w-full flex flex-row">
        <SkeletonCard className="hidden  lg:block" />
        <SkeletonCard className="w-full  lg:w-1/2" />
      </div>
      <div className="flex w-full h-[15%] flex-row justify-between items-center">
        <span className=" embla__prev h-1/2 w-14 rounded-xl shadow-semantic_green_light shadow-sm bg-widget_light flex justify-center items-center">
          <span className="icon-[material-symbols--arrow-back] text-2xl"></span>
        </span>
        <span className="embla__next h-1/2 w-14 rounded-xl shadow-semantic_green_light shadow-sm bg-widget_light flex justify-center items-center">
          <span className="icon-[material-symbols--arrow-forward] text-2xl"></span>
        </span>
      </div>
      <div className="w-full h-1/6 flex flex-col md:flex-row items-center justify-start gap-2  p-2">
        <SkeletonButtons icon="mdi--email-arrow-right" className="text-black" />
        <SkeletonButtons icon="dashicons--pdf" className="text-black" />
        <SkeletonButtons
          icon="icon-park-twotone--back"
          className="text-semantic_green_light"
          classnameBtn="md:hidden"
        />
      </div>
    </>
  );
}
