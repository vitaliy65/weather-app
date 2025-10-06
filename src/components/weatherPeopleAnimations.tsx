import React from "react";
import Lottie from "lottie-react";

const conditionToGif: Record<string, string> = {
  rain: "/videos/rain.json",
  rainy: "/videos/rain.json",
  drizzle: "/videos/drizzle.json",
  thunderstorm: "/videos/thunderstorm.json",
  storm: "/videos/thunderstorm.json",
  snow: "/videos/snow.json",
  snowy: "/videos/snow.json",
  mist: "/videos/mist.json",
  fog: "/videos/fog.json",
  haze: "/videos/haze.json",
  clouds: "/videos/clouds.json",
  cloudy: "/videos/clouds.json",
  clear: "/videos/clear.json",
  sunny: "/videos/clear.json",
};

export default function WeatherPeopleAnimations({
  condition,
}: {
  condition: string;
}) {
  const key = condition.toLowerCase();
  const gifSrc = conditionToGif[key];

  if (!gifSrc) {
    // Если не найдено подходящей анимации — ничего не показываем или показываем заглушку
    return null;
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <Lottie animationData={gifSrc} loop={true} />
    </div>
  );
}
