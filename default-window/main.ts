// Creates a default window.

import NativeWindow from "../window.ts";
import flags from "../flags.ts";

const win = new NativeWindow("Hello World", {
  width: flags.width,
  height: flags.height,
});

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const context = win.getContext();
context.configure({
  device,
  width: flags.width,
  height: flags.height,
  format: "bgra8unorm",
});

function frame() {
  // ...
}

win.draw(frame);
