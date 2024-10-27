import { Button } from "@makify/ui";

export default function NavBar() {
  return (
    <div
      className={`fixed top-0 z-30 flex w-full justify-center transition-all`}
    >
      <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
        <div className="flex flex-row gap-8"></div>
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    </div>
  );
}
