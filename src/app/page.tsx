"use client";
import { ErrorMessage } from "@/components/error-message";
import { WeatherDashboard } from "@/components/weather-dashboard";
import { useGeolocation } from "@/hooks/useGeolocation";
import { motion } from "motion/react";

export default function Home() {
  const { weather, loading, error } = useGeolocation();

  if (error && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
        <ErrorMessage
          message="Unable to detect your location. Please search for a city manually."
          onRetry={undefined}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-gradient-to-br 
      from-blue-200 via-cyan-200 to-indigo-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
      >
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-16 w-16 text-blue-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
          >
            <circle
              className="opacity-25"
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="8"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M60 32c0-15.464-12.536-28-28-28v8c11.046 0 20 8.954 20 20h8z"
            />
          </svg>
          <span className="text-xl font-semibold text-blue-700 dark:text-blue-200 animate-pulse">
            Загружаем погоду для вашего местоположения...
          </span>
        </div>
      </div>
    );
  }

  // Показываем дашборд, когда данные доступны
  if (!weather) {
    // Если данных нет, ничего не показываем (или можно добавить заглушку)
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <WeatherDashboard data={weather} loading={loading} />
    </motion.div>
  );
}
