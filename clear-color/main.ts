// Clears the screen to a solid color changing every frame.

import NativeWindow from "../window.ts";
import flags from "../flags.ts";

const win = new NativeWindow("Hello World", {
  width: flags.width,
  height: flags.height,
});

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter!.requestDevice();

const context = win.getContext();
context.configure({
  device,
  // width: flags.width,
  // height: flags.height,
  format: "bgra8unorm",
});

let r = 0.0;
let g = 0.0;
let b = 0.0;

function frame() {
  const textureView = context.getCurrentTexture().createView();

  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r, g, b, a: 1.0 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  };

  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);

  win.surface!.present();

  r = (Math.sin(Date.now() / 1000) + 1) / 2;
  g = (Math.sin(Date.now() / 1000 + 2) + 1) / 2;
  b = (Math.sin(Date.now() / 1000 + 4) + 1) / 2;
}

win.draw(frame);
