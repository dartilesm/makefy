import { SignUpContainer } from "@/components/pages-containers/sign-up-container";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <SignUpContainer />
    </Suspense>
  );
}
