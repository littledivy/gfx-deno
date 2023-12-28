import { EventType, WindowBuilder } from "https://deno.land/x/sdl2/mod.ts";
import type { NativeWindow, NativeWindowOptions } from "./window.ts";

class SDL2Window implements NativeWindow {
  private window: WindowBuilder;

  constructor(title: string, options?: NativeWindowOptions) {
    this.window = new WindowBuilder({
      title,
      width: options?.width ?? 640,
      height: options?.height ?? 480,
    }).build();
  }

  getContext(): GPUCanvasContext {
    const [
      system,
      windowHandle,
      displayHandle,
    ] = this.window.rawHandle();

    return createWindowSurface(system, windowHandle, displayHandle);
  }

  draw(): void {
    // ...
  }
}
