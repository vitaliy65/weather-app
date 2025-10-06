"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { WeatherCurrent } from "@/types/apiTypes";
import Image from "next/image";

export function CurrentWeather({ data }: { data: WeatherCurrent }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card
        className={`flex flex-col justify-start items-start p-6 card-bg card-bg-${data.condition.toLowerCase()} h-full`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
          {/* Температура и иконка */}
          <div className="flex items-center gap-6">
            <Image
              src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
              alt={data.description}
              width={160}
              height={160}
              className="drop-shadow-2xl max-md:hidden"
            />
            <div className="max-md:justify-between">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="md:text-8xl text-5xl font-bold"
                >
                  {data.temperature}°
                </motion.div>
                <p className="md:text-2xl text-xl capitalize mt-2">
                  {data.description}
                </p>
              </div>
              <p className="md:text-lg text-md max-md:font-light md:mt-1 max-md:mt-8">
                Feels like {data.feelsLike}°
              </p>
            </div>
          </div>

          {/* Быстрая статистика */}
          <div className="grid grid-cols-2 gap-6 text-center md:text-left max-md:hidden">
            <div>
              <p className="text-sm">Humidity</p>
              <p className="text-2xl font-semibold">{data.humidity}%</p>
            </div>
            <div>
              <p className="text-sm">Wind Speed</p>
              <p className="text-2xl font-semibold">{data.windSpeed} km/h</p>
            </div>
            <div>
              <p className="text-sm">Pressure</p>
              <p className="text-2xl font-semibold">{data.pressure} hPa</p>
            </div>
            <div>
              <p className="text-sm">Visibility</p>
              <p className="text-2xl font-semibold">{data.visibility} km</p>
            </div>
          </div>
        </div>
        {/* <WeatherPeopleAnimations condition={data.condition} /> */}
      </Card>
    </motion.div>
  );
}
