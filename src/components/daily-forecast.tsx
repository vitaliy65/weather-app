"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { WeatherDaily } from "@/types/apiTypes";

interface DailyForecastProps {
  daily: WeatherDaily[];
  condition: string;
}

export function DailyForecast({ daily, condition }: DailyForecastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className={`p-6 card-bg card-bg-${condition.toLowerCase()}`}>
        <h3 className="text-xl font-semibold  mb-6">7-Day Forecast</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {daily.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <p className="text-sm font-medium ">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <Image
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.condition}
                width={60}
                height={60}
              />
              <div className="text-center">
                <p className="text-lg font-semibold ">{day.tempMax}°</p>
                <p className="text-sm">{day.tempMin}°</p>
              </div>
              <div className="text-xs text-center space-y-1">
                <p>{day.humidity}% humidity</p>
                <p>{Math.round(day.windSpeed * 3.6)} km/h wind</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
