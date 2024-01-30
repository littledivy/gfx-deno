import {
  createWindow,
  DwmWindow as _DwmWindow,
  mainloop,
} from "https://deno.land/x/dwm@0.3.6/mod.ts";
import type { NativeWindow, NativeWindowOptions } from "../mod.ts";

export class DwmWindow implements NativeWindow {
  #win: _DwmWindow;
  surface: Deno.UnsafeWindowSurface | null = null;

  constructor(title: string, options?: NativeWindowOptions) {
    this.#win = createWindow({
      title,
      width: options?.width ?? 640,
      height: options?.height ?? 480,
    });
    this.surface = this.#win.windowSurface();
  }

  getContext(): GPUCanvasContext {
    return this.surface!.getContext("webgpu");
  }

  // deno-lint-ignore no-explicit-any
  async draw(callback: any): Promise<void> {
    await mainloop(() => {
      callback();
    });
  }
}
