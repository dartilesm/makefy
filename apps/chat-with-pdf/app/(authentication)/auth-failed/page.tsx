import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function AuthFailed() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[400px] flex-col items-center space-y-6 text-center">
        <div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full">
          <svg
            className="text-destructive h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Authentication Failed
        </h1>
        <p className="text-muted-foreground">
          There was a problem authenticating your account. Please try signing in
          again.
        </p>
        <Link
          href="/login"
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex inline-flex h-10 items-center justify-center gap-2 rounded-md px-8 text-sm font-medium transition-colors"
        >
          Return to Login <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
