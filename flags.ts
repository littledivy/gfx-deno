import { parse } from "https://deno.land/std@0.207.0/flags/mod.ts";

const flags = parse(Deno.args, {
  default: {
    width: 640,
    height: 480,
  },
});

export default flags;
