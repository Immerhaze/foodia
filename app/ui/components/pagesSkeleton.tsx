import { cn } from "@/lib/utils";
import { FunctionalBtn } from "./functionalBtn";
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
            <span className="flex flex-col gap-2 border-b-2 border-accent_color_light/20">
              <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-3/5 "></div>
              <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-3/5 mb-2"></div>
            </span>
            <span className="flex flex-row gap-2 border-b-2 border-accent_color_light/20">
              <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-5/6 mb-3"></div>
              <span className="icon-[mdi--chevron-down]"></span>
            </span>
            <span className="flex flex-row gap-2 border-b-2 border-accent_color_light/20">
              <div className="animate-pulse rounded-md bg-muted h-7 bg-slate-500/30  w-5/6 mb-4"></div>
              <span className="icon-[mdi--chevron-down]"></span>
            </span>
          </div>
        </div>
      </>
    );
  }
  function SkeletonButtons({ classNameIcon, classnameBtn }: any) {
    return (
      <span
        className={cn(
          "text-white h-8  w-2/3 md:w-1/2 rounded-xl flex flex-row justify-center items-center cursor-pointer shadow-semantic_green_light shadow-sm bg-widget_light ",
          classnameBtn
        )}
      >
        <span className={cn(`text-3xl md:text-4xl mr-2`, classNameIcon)}></span>
        <div className="animate-pulse rounded-md bg-muted h-4 md:h-8 w-[70%] bg-slate-500/30"></div>
      </span>
    );
  }
  return (
    <>
      <div className="w-full h-10 md:hidden text-secondary text-center flex justify-center items-center text-primary_text_light font-normal text-3xl">
        <h1>
          MEALT
          <span className="text-semantic_green_light font-extrabold">AI</span>M
        </h1>
      </div>
      <div className="h-calc-100-minus-40px  md:h-full flex flex-col items-center">
        <div className="h-1/6 w-full  flex justify-center items-end">
          <span className="text-2xl rounded-lg w-2/3 text-white bg-semantic_green_light font font-semibold tracking-wider flex flex-row justify-center items-center py-2">
            <h2>CARGANDO...</h2>
          </span>
        </div>
        <div className="w-full  h-[66.666666%] md:h-4/6 flex flex-col justify-center items-center">
          <div className="w-full  h-5/6 flex justify-center items-center">
            <SkeletonCard className="hidden  lg:block" />
            <SkeletonCard className="w-full  lg:w-1/2" />
          </div>
          <div className="flex w-full h-1/6 px-2 flex-row justify-between items-center">
            <FunctionalBtn
              classNameIcon="icon-[ion--arrow-back-outline] text-black"
              classNameBtn="text-xl font-semibold w-1/4 md:h-[50%]"
            />
            <FunctionalBtn
              classNameIcon=" icon-[ion--arrow-forward] text-black"
              classNameBtn="text-xl font-semibold w-1/4 md:h-[50%]"
            />
          </div>
        </div>
        <div className="py-2 w-screen h-1/6 md:hidden flex flex-col items-center justify-between">
          <SkeletonButtons
            classNameIcon="icon-[mdi--email-arrow-right] text-black"
            icon="mdi--email-arrow-right"
            className="text-black"
          />
          <SkeletonButtons
            className="text-black"
            classNameIcon="icon-[ic--twotone-picture-as-pdf] text-black"
          />
          <SkeletonButtons
            classNameIcon="icon-[icon-park-twotone--back] text-semantic_green_light"
            className="text-black bg-accent_color_light"
          />
        </div>
        <div className="hidden h-1/6 w-full  md:flex flex-col justify-center items-center gap-3">
          <SkeletonButtons
            classNameIcon="icon-[mdi--email-arrow-right] text-black"
            icon="mdi--email-arrow-right"
            className="text-black"
          />
          <SkeletonButtons
            className="text-black"
            classNameIcon="icon-[ic--twotone-picture-as-pdf] text-black"
          />
        </div>
      </div>
    </>
  );
}
