import { parseArgs } from "https://deno.land/std@0.207.0/cli/mod.ts";

const flags = parseArgs(Deno.args, {
  default: {
    width: 640,
    height: 480,
  },
});

export default flags;
