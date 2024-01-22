# `gfx-deno`

Based on the WebGPU external surface proposal:
<https://github.com/denoland/deno/issues/21713>

<!--
Add more examples:

- []
-->

## Contributing

### Adding a new windowing backend

All windowing backends need implement a common TypeScript interface
`NativeWindow`.

See `/sdl2.ts` for reference. Also add your backend as a CLI flag and
conditionally export from `/window.ts`.

### Adding a new example

Create a new directory with a short sensible name.

Add an example by following this boilerplate:

```typescript
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
// ...

function frame() {
  // ...
  context.present();
}

win.draw(frame);
```
