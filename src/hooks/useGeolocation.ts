"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherDisplayData, WeatherForecast } from "@/types/apiTypes";
import { config } from "@/lib/config";
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
    if (!navigator.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser",
        loading: false,
      });
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setState({
        latitude: null,
        longitude: null,
        error: error.message,
        loading: false,
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  const { data, isPending, error } = useQuery<WeatherDisplayData>({
    queryKey: ["weather", state.latitude, state.longitude],
    queryFn: async () => {
      const coordinates = { lat: state.latitude, lon: state.longitude };
      return await httpClient<WeatherForecast>(
        `${config.data_url}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${config.api_key}`
      ).then((res) => convertData(res));
    },
    enabled: state.latitude !== null && state.longitude !== null,
  });

  return {
    ...state,
    weather: data,
    weatherLoading: isPending,
    weatherError: error,
  };
}
