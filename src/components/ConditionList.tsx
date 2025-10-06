import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ConditionList } from "@/types/conditionList";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveBG } from "@/store/slices/animationsSlice";

export default function ConditionSelect() {
  const dispatch = useAppDispatch();
  const activeCondition = useAppSelector((s) => s.animations.activeCondition);

  const handleChange = (value: string) => {
    dispatch(setActiveBG(value as ConditionList));
  };

  return (
    <Select value={activeCondition} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] bg-black/20 border-gray-700">
        <SelectValue placeholder="выберите условие" className="text-gray-700" />
      </SelectTrigger>
      <SelectContent className="bg-gray-700/90 text-white border-white/20">
        {Object.entries(ConditionList).map(([key, value]) => (
          <SelectItem key={value} value={value}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
