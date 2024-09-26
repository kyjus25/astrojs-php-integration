import type { NamedSSRLoadedRendererValue } from "astro";

const renderer: NamedSSRLoadedRendererValue = {
  name: "@astrojs/preact",
  check: async () => true,
  renderToStaticMarkup: async (component) => {
    return {
      attrs: {},
      html: component(),
    };
  },
  supportsAstroStaticSlot: false,
};

export default renderer;
