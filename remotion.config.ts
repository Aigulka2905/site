import { Config } from "@remotion/cli/config";

// Studio/render config. The page itself embeds the composition live via
// @remotion/player, so rendering is optional (handy for an mp4 fallback).
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("./src/remotion/index.ts");
