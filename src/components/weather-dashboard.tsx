"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WeatherDisplayData } from "@/types/apiTypes";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import ConditionSelect from "./ConditionList";
import { ConditionList } from "@/types/conditionList";

// Динамический импорт компонентов с fallback skeleton
const CurrentWeather = dynamic(
  () => import("./current-weather").then((m) => m.CurrentWeather),
  {
    loading: () => <Skeleton className="h-80 w-full" />,
    ssr: false,
  }
);
const HourlyForecast = dynamic(
  () => import("./hourly-forecast").then((m) => m.HourlyForecast),
  {
    loading: () => <Skeleton className="h-48 w-full" />,
    ssr: false,
  }
);
const DailyForecast = dynamic(
  () => import("./daily-forecast").then((m) => m.DailyForecast),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  }
);
const WeatherDetails = dynamic(
  () => import("./weather-details").then((m) => m.WeatherDetails),
  {
    loading: () => <Skeleton className="h-80 w-full" />,
    ssr: false,
  }
);
const SeasonIndicator = dynamic(
  () => import("./season-indicator").then((m) => m.SeasonIndicator),
  {
    loading: () => <Skeleton className="h-8 w-8 rounded-full" />,
    ssr: false,
  }
);
const WeatherBackground = dynamic(
  () => import("./weather-background").then((m) => m.WeatherBackground),
  {
    loading: () => null,
    ssr: false,
  }
);
const AnimationsToggle = dynamic(
  () => import("./AnimationsToggle").then((m) => m.default),
  {
    loading: () => <Skeleton className="h-10 w-32" />,
    ssr: false,
  }
);
const WeatherGraph = dynamic(
  () => import("./Weather-Graph").then((m) => m.WeatherGraph),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  }
);

interface WeatherDashboardProps {
  data: WeatherDisplayData;
  loading: boolean;
}

export function WeatherDashboard({ data, loading }: WeatherDashboardProps) {
  const [season, setSeason] = useState(data.season);
  const active = useAppSelector((s) => s.animations.active);
  const { activeCondition } = useAppSelector((s) => s.animations);
  const [condition, setCondition] = useState(
    data.current.condition.toLowerCase()
  );

  useEffect(() => {
    setSeason(data.season);

    if (activeCondition != ConditionList.none) {
      setCondition(activeCondition);
    } else {
      setCondition(data.current.condition.toLowerCase());
    }
  }, [data.season, activeCondition]);

  if (loading) {
    return null;
  }

  return (
    <div className={`${!active && "weather-no-animations"}`}>
      <div
        className={` min-h-screen weather-bg weather-bg-${condition} season-${season} transition-all duration-1000`}
      >
        <WeatherBackground condition={condition} />

        <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8"
          >
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-2 flex-wrap justify-center md:justify-start">
                <p>
                  {data.location.city}, {data.location.country}
                </p>
                <SeasonIndicator />
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <AnimationsToggle />
              <ConditionSelect />
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Current Weather - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <CurrentWeather data={data.current} />
            </div>

            {/* Weather Details */}
            <div>
              <WeatherDetails data={data} />
            </div>
          </div>
          {/* weather graph for 24h */}
          <div>
            <WeatherGraph
              condition={data.current?.condition}
              hourly={data.hourly}
            />
          </div>

          {/* Hourly Forecast */}
          <div className="mb-6">
            <HourlyForecast
              condition={data.current?.condition}
              hourly={data.hourly}
              daily={data.daily}
            />
          </div>
          {/* Daily Forecast */}
          <div>
            <DailyForecast
              condition={data.current?.condition}
              daily={data.daily}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
