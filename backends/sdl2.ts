import {
  EventType,
  Window,
  WindowBuilder,
} from "https://deno.land/x/sdl2@0.7.0/mod.ts";
import type { NativeWindow, NativeWindowOptions } from "../mod.ts";

export class SDL2Window implements NativeWindow {
  #win: Window;
  surface: Deno.UnsafeWindowSurface | null = null;

  constructor(title: string, options?: NativeWindowOptions) {
    this.#win = new WindowBuilder(
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
    ] = this.#win.rawHandle();
    this.surface = new Deno.UnsafeWindowSurface(
      system as ("cocoa" | "win32" | "x11"),
      windowHandle!,
      displayHandle === null ? null : displayHandle!,
    );
    return this.surface.getContext("webgpu");
  }

  // deno-lint-ignore no-explicit-any require-await
  async draw(callback: any): Promise<void> {
    setInterval(() => {
      const { value } = this.#win.events().next();
      if (value?.type === EventType.Quit) {
        Deno.exit(0);
      }

      callback();
    }, 0);
  }
}
