import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApiQuery } from "@/hooks/useQuery";
import { useState } from "react";
import { useUserActivity } from "../_api/query";

const WeeklyActivity = () => {
  const activityData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 0.9 },
    { day: "Fri", hours: 2.1 },
    { day: "Sat", hours: 4.5 },
    { day: "Sun", hours: 1.2 },
  ];
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);
    return { startDate: start, endDate: end };
  });

  const { data: activities, isLoading } = useUserActivity({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });
  console.log("🚀 ~ WeeklyActivity ~ activities:", activities?.activity);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>
          Your learning hours over the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <div className="relative h-full w-full">
            <div className="flex h-full items-end justify-between">
              {
                //ts-ignore
                // [...activityData].map(
                (activities?.activity?.length
                  ? [...activities?.activity]
                  : [...activityData]
                ).map((item, i) => (
                  <div key={i} className="flex flex-col items-center w-full">
                    <div
                      className="w-full max-w-[30px] bg-blue-100 dark:bg-blue-900/30 rounded-t-sm relative group"
                      style={{
                        height: `${(item.hours / 5) * 150}px`,
                        transition: "height 1s ease-out",
                      }}
                    >
                      <div className="absolute inset-0 bg-blue-600 opacity-50 dark:opacity-30 rounded-t-sm"></div>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all duration-1000"
                        style={{
                          height: `${(item.hours / 5) * 150}px`,
                        }}
                      ></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.hours} hours
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {item.day}
                    </span>
                  </div>
                ))
              }
            </div>

            {/* Y-axis labels */}
            <div className="absolute inset-y-0 -left-3 flex flex-col justify-between pointer-events-none">
              {[5, 4, 3, 2, 1, 0].map((hour) => (
                <div
                  key={hour}
                  className="text-xs text-slate-400 -translate-y-1/2"
                >
                  {hour}h
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyActivity;
