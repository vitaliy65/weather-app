import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleAnimations } from "@/store/slices/animationsSlice";

export default function AnimationsToggle() {
  const active = useAppSelector((s) => s.animations.active);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="animations-switch">Background Animations</Label>
      <Switch
        id="animations-switch"
        checked={active}
        onCheckedChange={() => dispatch(toggleAnimations())}
      />
    </div>
  );
}
