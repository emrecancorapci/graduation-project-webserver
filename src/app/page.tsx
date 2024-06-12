"use client";

import useSWR from "swr";
import {
  type SensorShort,
  useChartControllerStore,
} from "@/stores/chart-controller";
import { fetcher } from "@/lib/utils";
import Chart from "@/components/chart";

interface SensorData {
  id: number;
  time: string;
  tp: number;
  hd: number;
  ph: number;
  gh: number;
  aq: number;
  lt: number;
}

interface Sensor {
  id: number;
  name: string;
  short: SensorShort;
  unit: string;
}

export default function ChartPage() {
  const { data, error, isLoading } = useSWR<SensorData[], { message: string }>(
    `/api/data?min=0`,
    fetcher,
  );
  const {
    data: sensors,
    error: sensorsError,
    isLoading: sensorsLoading,
  } = useSWR<Sensor[], { message: string }>(`/api/sensor`, fetcher);
  const visibleValues = useChartControllerStore((state) => state.visibleValues);

  if (error) return <div>Error: {error.message}</div>;
  if (sensorsError) return <div>Error: {sensorsError.message}</div>;
  if (isLoading || sensorsLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  if (!sensors) return <div>No sensors</div>;

  const formattedData = data
    .map((data) => ({
      ...data,
      time: new Date(data.time).toUTCString(),
      timeAxis: new Date(data.time).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }))
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <>
      <Chart
        data={formattedData}
        sensors={sensors}
        visibleValues={visibleValues}
      />
    </>
  );
}
