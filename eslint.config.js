import config from "@christopherjbaker/eslint-config/react-strict";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  globalIgnores(["dist/", "web-build/", "babel.config.cjs"]),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  config,
  {
    // configs overrides, if need
  },
);
