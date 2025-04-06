import { useApiQuery } from "@/hooks/useQuery";
import { getDateRange } from "@/lib/utils";

interface UseUserActivityProps {
  startDate?: Date;
  endDate?: Date;
}

export const useUserActivity = ({
  startDate,
  endDate,
}: UseUserActivityProps = {}) => {
  const { start_date, end_date } =
    startDate && endDate
      ? {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        }
      : getDateRange();

  return useApiQuery({
    url: "/users/activity",
    params: {
      start_date,
      end_date,
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
