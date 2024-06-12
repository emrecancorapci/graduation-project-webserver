"use client";

import { useCallback } from "react";

import { useChartControllerStore } from "@/stores/chart-controller";

import { Button } from "./ui/button";
import VisibilitySwitch from "./visibility-switch";

export default function ChartSettings() {
  const { visibleValues, toggleVisible, setVisible } =
    useChartControllerStore();
  useChartControllerStore();

  const isHdVisible = visibleValues.has("HD");
  const isTpVisible = visibleValues.has("TP");
  const isPhVisible = visibleValues.has("PH");
  const isGhVisible = visibleValues.has("GH");
  const isAqVisible = visibleValues.has("AQ");
  const isLtVisible = visibleValues.has("LT");

  const toggleHd = useCallback(() => toggleVisible("HD"), [toggleVisible]);
  const toggleTp = useCallback(() => toggleVisible("TP"), [toggleVisible]);
  const togglePh = useCallback(() => toggleVisible("PH"), [toggleVisible]);
  const toggleGh = useCallback(() => toggleVisible("GH"), [toggleVisible]);
  const toggleAq = useCallback(() => toggleVisible("AQ"), [toggleVisible]);
  const toggleLt = useCallback(() => toggleVisible("LT"), [toggleVisible]);

  const setAllVisible = useCallback(() => {
    setVisible("HD", true);
    setVisible("TP", true);
    setVisible("PH", true);
    setVisible("GH", true);
    setVisible("AQ", true);
    setVisible("LT", true);
  }, [setVisible]);

  const isAllVisible =
    isHdVisible &&
    isTpVisible &&
    isPhVisible &&
    isGhVisible &&
    isAqVisible &&
    isLtVisible;

  return (
    <div className="grid grid-cols-1 flex-row gap-8 p-4 font-light">
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-xl font-semibold text-foreground">Visibility</h3>
        <Button
          className="h-6 w-16 border-foreground text-foreground"
          variant={isAllVisible ? "default" : "outline"}
          onClick={setAllVisible}
        >
          All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-primary">
        <VisibilitySwitch
          label="Humidity"
          isVisible={isHdVisible}
          onToggle={toggleHd}
        />
        <VisibilitySwitch
          label="Temperature"
          isVisible={isTpVisible}
          onToggle={toggleTp}
        />
        <VisibilitySwitch
          label="pH"
          isVisible={isPhVisible}
          onToggle={togglePh}
        />
        <VisibilitySwitch
          label="Ground Humidity"
          isVisible={isGhVisible}
          onToggle={toggleGh}
        />
        <VisibilitySwitch
          label="Air Quality"
          isVisible={isAqVisible}
          onToggle={toggleAq}
        />
        <VisibilitySwitch
          label="Light"
          isVisible={isLtVisible}
          onToggle={toggleLt}
        />
      </div>
    </div>
  );
}
