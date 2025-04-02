
"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CheckCircle, Info, TriangleAlert, Loader2, BellOff } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { getNofications } from "@/actions/notification";
import { Notifications } from "@workspace/db";

export function NotificationCard() {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { hasMore, data } = await getNofications(pageCount);
      setNotifications((prev) => [...prev, ...data]);
      setHasMore(hasMore);
      setLoading(false);
    };
    getData();
  }, [pageCount]);

  const notificationIcon: Record<Notifications["category"], LucideIcon> = {
    IMPORTANT: TriangleAlert,
    SUCCESS: CheckCircle,
    GENERAL: Info,
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      {loading && notifications.length === 0 ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 border-l-4 rounded-lg shadow-lg bg-card w-full"
            >
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex flex-col space-y-2 w-full">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-muted-foreground text-center py-10">
          <BellOff className="w-16 h-16 mb-3" />
          <p className="text-lg font-medium">No notifications yet.</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={notifications.length}
          next={() => setPageCount((prev) => prev + 1)}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-6">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          }
          endMessage={<p className="text-center text-muted-foreground py-6">No more notifications</p>}
        >
          <div className="space-y-6">
            {notifications.map((ele) => {
              const Icon = notificationIcon[ele.category];
              return (
                <div
                  key={ele.id.toLocaleString()}
                  className="flex items-center gap-5 p-5 border-l-4 rounded-lg shadow-lg bg-card w-full"
                >
                  <Icon className="shrink-0 text-primary w-7 h-7" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground text-lg">{ele.title}</h3>
                    <p className="text-sm text-muted-foreground">{ele.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
