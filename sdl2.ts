import {
  EventType,
  Window,
  WindowBuilder,
} from "https://deno.land/x/sdl2@0.7.0/mod.ts";
import type { NativeWindow, NativeWindowOptions } from "./window.ts";

export class SDL2Window implements NativeWindow {
  #window: Window;
  surface: Deno.UnsafeWindowSurface | null = null;

  constructor(title: string, options?: NativeWindowOptions) {
    this.#window = new WindowBuilder(
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
    ] = this.#window.rawHandle();
    this.surface = new Deno.UnsafeWindowSurface(
      system as ("cocoa" | "win32" | "x11"),
      new Deno.UnsafePointerView(windowHandle!),
      displayHandle === null
        ? null
        : new Deno.UnsafePointerView(displayHandle!),
    );
    return this.surface.getContext("webgpu");
  }

  // deno-lint-ignore no-explicit-any
  draw(callback: any): void {
    setInterval(() => {
      const { value } = this.#window.events().next();
      if (value?.type === EventType.Quit) {
        Deno.exit(0);
      }

      callback();
    }, 0);
  }
}
