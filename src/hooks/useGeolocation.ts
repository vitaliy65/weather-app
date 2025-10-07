"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherDisplayData, WeatherForecast } from "@/types/apiTypes";
import { config } from "@/config/appConfig";
import { httpClient } from "@/lib/httpClient";
import { convertData } from "@/lib/weatherDataConvertor";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const getLocationByIP = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setState({
          latitude: data.latitude,
          longitude: data.longitude,
          error: null,
          loading: false,
        });
      } catch (err) {
        setState({
          latitude: null,
          longitude: null,
          error: "Unable to determine location",
          loading: false,
        });
      }
    };

    getLocationByIP();
  }, []);

  const { data, isPending, error } = useQuery<WeatherDisplayData>({
    queryKey: ["weather", state.latitude, state.longitude],
    queryFn: async () => {
      const { latitude, longitude } = state;
      const res = await httpClient<WeatherForecast>(
        `${config.data_url}forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${config.api_key}`
      );
      return convertData(res);
    },
    enabled: !!state.latitude && !!state.longitude,
  });

  return {
    ...state,
    weather: data,
    weatherLoading: isPending,
    weatherError: error,
  };
}
