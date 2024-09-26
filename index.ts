import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export default function txtIntegration() {
  return {
    name: "@astrojs/php",
    hooks: {
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: "vite-plugin-php", // Name your plugin
                transform(src: string, id: string) {
                  if (id.endsWith(".php")) {
                    const contents = execSync(`php -f ${id}`, {
                      encoding: "utf-8",
                    })
                      .replaceAll(/[\r\n]+/g, " ")
                      .trim();
                    return {
                      code: `export default function Component(props) { return "${contents}"; }`,
                      map: null, // No need for source maps in this case
                    };
                  }
                },
              },
            ],
            resolve: {
              extensions: [".php"],
            },
          },
        });
        addRenderer({
          name: "@astrojs/php",
          contentType: "text/plain",
          clientEntrypoint: null,
          serverEntrypoint: "@astrojs/php/server.ts",
        });
      },
    },
  };
}
