interface NativeWindowOptions {
  width: number;
  height: number;
}

interface NativeWindow {
  constructor(title: string, options?: NativeWindowOptions): void;

  getContext(): GPUCanvasContext;

  draw(): void;
}
