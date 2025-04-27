import { useRouter } from "nextjs-toploader/app";

export default async function Page() {
  const router = useRouter();
  router.push("https://pck-mgr-landing.vercel.app/");
  return <div className="">{"Please wait"}</div>;
}
