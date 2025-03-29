import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <SignUp />
    </div>
  );
}
