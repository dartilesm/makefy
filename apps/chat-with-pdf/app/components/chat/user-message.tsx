import { Alert, AlertDescription, AlertTitle } from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { Message } from "ai";

type UserMessageProps = {
  className?: string;
  message: Message;
};

export function UserMessage({ className, message }: UserMessageProps) {
  const messageData = message.data as Record<string, unknown>;

  return (
    <div
      className={cn("flex flex-col", className, {
        "px-1 py-1": messageData?.quotedText,
      })}
    >
      {(messageData?.quotedText as string) && (
        <Alert className="flex max-h-24 flex-col justify-between gap-2 rounded-md border-none bg-[#1f50bb] text-[#cdcdcd]">
          <AlertTitle>
            Quoted text from page {messageData?.page as string}
          </AlertTitle>
          <AlertDescription
            className="line-clamp-2 text-ellipsis"
            title={messageData?.quotedText as string}
          >
            {messageData?.quotedText as string}
          </AlertDescription>
        </Alert>
      )}
      <p
        className={cn({
          "px-3 py-2": messageData?.quotedText,
          "px-4 py-3": !messageData?.quotedText,
        })}
      >
        {message.content}
      </p>
    </div>
  );
}
