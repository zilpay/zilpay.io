import { BLOCKS, SLIPPAGE } from "@/config/dex";
import { createDomain } from "effector";

export interface Settings {
  slippage: number;
  blocks: number;
}

const initState: Settings = {
  slippage: SLIPPAGE,
  blocks: BLOCKS
};

const settingsDomain = createDomain();
export const updateSettings = settingsDomain.createEvent<Settings>();
export const resetSettings = settingsDomain.createEvent();
export const $settings = settingsDomain
  .createStore<Settings>(initState)
  .on(updateSettings, (_, payload) => payload)
  .reset(resetSettings);
