import { SDL2Window } from "./sdl2.ts";

export interface NativeWindowOptions {
  width: number;
  height: number;
}

export interface NativeWindow {
  constructor(title: string, options?: NativeWindowOptions): void;

  getContext(): GPUCanvasContext;

  draw(
    callback: () => void,
  ): void;
}

export default SDL2Window;
