"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { WeatherDaily, WeatherHourly } from "@/types/apiTypes";
import React from "react";

// Функция для получения подписи дня недели и даты
function getDayLabel(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

// Вспомогательная функция для получения минут с начала суток из строки "HH:mm"
function getMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function HourlyForecast({
  hourly,
  daily,
  condition,
}: {
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
  condition: string;
}) {
  // Оптимизированная генерация элементов с использованием map и reduce
  const elements: React.ReactNode[] = [];
  let currentDayIndex = 0;

  for (let i = 0; i < hourly.length; i++) {
    // Добавляем заголовок дня для первого элемента и для перехода на новый день
    if (
      i === 0 ||
      (i > 0 && getMinutes(hourly[i - 1].time) > getMinutes(hourly[i].time))
    ) {
      if (daily[currentDayIndex]) {
        elements.push(
          <div
            key={`day-label-${currentDayIndex}`}
            className="flex flex-col items-center min-w-[90px] mr-3"
          >
            <span className="text-xs font-bold text-white/80 mb-2">
              {getDayLabel(daily[currentDayIndex].date)}
            </span>
          </div>
        );
      }
      currentDayIndex++;
    }

    // Сам почасовой прогноз
    elements.push(
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 * i }}
        className="flex flex-col items-center gap-2 min-w-[80px] p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
      >
        <p className="text-sm font-medium">{hourly[i].time}</p>
        <Image
          src={`https://openweathermap.org/img/wn/${hourly[i].icon}@2x.png`}
          alt={hourly[i].condition}
          width={50}
          height={50}
        />
        <p className="text-lg font-semibold">{hourly[i].temperature}°</p>
      </motion.div>
    );

    // Добавляем разделитель, если происходит переход через "00:00"
    if (
      i < hourly.length - 1 &&
      getMinutes(hourly[i].time) > getMinutes(hourly[i + 1].time)
    ) {
      elements.push(
        <div
          key={`divider-${i}`}
          className="w-px h-16 bg-white/20 mx-2 self-center"
        />
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className={`p-6 card-bg card-bg-${condition.toLowerCase()}`}>
        <h3 className="text-xl font-semibold mb-6">Hourly forecast</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {elements}
        </div>
      </Card>
    </motion.div>
  );
}
