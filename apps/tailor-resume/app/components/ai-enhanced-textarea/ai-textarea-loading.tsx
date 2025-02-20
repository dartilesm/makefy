import { cn } from "@makefy/ui/lib/utils";
import { Skeleton } from "@makefy/ui";

interface AITextareaLoadingProps {
  loading: boolean;
}

export function AITextareaLoading({ loading }: AITextareaLoadingProps) {
  return (
    <div
      className={cn([
        "group h-full w-full transition-all delay-700 duration-300 ease-in-out",
        "pointer-events-none opacity-0",
        { "opacity-100 delay-0": loading },
      ])}
      data-loading={loading}
    >
      <div className="flex h-full w-full flex-col gap-2 p-2">
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-[500ms] [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-2.75rem)]" />
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-[400ms] [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1.5rem)]" />
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-300 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1rem)]" />
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-200 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-2.75rem)]" />
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-200 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-2.75rem)]" />
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-100 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1rem)]" />
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-300 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-3rem)]" />
        <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-100 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1.25rem)]" />
      </div>
    </div>
  );
}
