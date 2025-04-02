import { NotificationCard } from "./ui/display-card";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto rounded-lg shadow-md bg-card w-full">
      <NotificationCard />
    </div>
  );
}
