import { Skeleton } from "@makefy/ui";

export function PDFLoading() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="border-border flex h-[53px] items-center border-b-[1px] p-2" />
      <div className="flex h-full w-full p-4">
        <Skeleton className="h-full w-full flex-1 " />
      </div>
    </div>
  );
}
