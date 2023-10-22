"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import useIsMounted from "@/hooks/useIsMounted";

interface Props {}

const ToggleTheme = ({}: Props) => {
  const { setTheme, theme } = useTheme();
  const isMounted = useIsMounted();
  const isLightTheme = theme === "light";

  if (!isMounted) return null;
  return (
    <Button
      size={"icon"}
      onClick={() => setTheme(isLightTheme ? "dark" : "light")}
    >
      {isLightTheme ? <Sun /> : <Moon />}
    </Button>
  );
};
export default ToggleTheme;
