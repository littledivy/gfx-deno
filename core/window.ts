// import { SDL2Window } from "../backends/sdl2.ts";
import { DwmWindow } from "../backends/dwm.ts";

export interface NativeWindowOptions {
  width: number;
  height: number;
}

export interface NativeWindow {
  surface: Deno.UnsafeWindowSurface | null;

  getContext(): GPUCanvasContext;

  draw(
    callback: () => void,
  ): Promise<void>;
}

export default DwmWindow;
