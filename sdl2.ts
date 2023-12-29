import {
  EventType,
  WindowBuilder,
} from "https://deno.land/x/sdl2@0.7.0/mod.ts";
import type { NativeWindow, NativeWindowOptions } from "./window.ts";

export class SDL2Window implements NativeWindow {
  private window: WindowBuilder;

  constructor(title: string, options?: NativeWindowOptions) {
    this.window = new WindowBuilder(
      title,
      options?.width ?? 640,
      options?.height ?? 480,
    ).build();
  }

  getContext(): GPUCanvasContext {
    const [
      system,
      windowHandle,
      displayHandle,
    ] = this.window.rawHandle();

    return createWindowSurface(system, windowHandle, displayHandle);
  }

  draw(callback): void {
    setInterval(() => {
      const { value } = this.window.events().next();
      if (value?.type === EventType.Quit) {
        Deno.exit(0);
      }

      callback();
    }, 0);
  }
}
