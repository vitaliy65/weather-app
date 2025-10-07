export function getWeatherKey(condition: string): string {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return "rain";
  if (lower.includes("storm")) return "rain";
  if (lower.includes("snow")) return "snow";
  if (lower.includes("cloud")) return "cloud";
  // Добавляйте свои условия для новых погод
  return "default";
}
