import path from 'node:path'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const zodConverterShim = {
  name: 'zod-converter-shim',
  enforce: 'pre',
  load(id: string) {
    if (id === 'virtual:zod-converter-shim') {
      return `
export function convertZodToJsonSchema(schema) {
  if (!schema) {
    return undefined;
  }
  if (typeof schema === "object") {
    return { type: "object" };
  }
  return undefined;
}
export default { convertZodToJsonSchema };
      `;
    }
    return undefined;
  },
  resolveId(source: string) {
    if (source.endsWith('/tools/zod-converter.js')) {
      return 'virtual:zod-converter-shim'
    }
    return undefined
  },
}

const enableDevtools = process.env.TANSTACK_DEVTOOLS !== '0'

const config = defineConfig({
  resolve: {
    alias: {
      '@tanstack/ai/dist/esm/tools/zod-converter.js': path.resolve(
        __dirname,
        'src/lib/zod-converter-shim.ts',
      ),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'alias-zod-converter',
          setup(build) {
            build.onResolve(
              { filter: /@tanstack\/ai\/dist\/esm\/tools\/zod-converter\.js$/ },
              () => ({ path: 'virtual:zod-converter-shim' }),
            )
            build.onLoad({ filter: /^virtual:zod-converter-shim$/ }, () => ({
              contents: `
export function convertZodToJsonSchema(schema) {
  if (!schema) {
    return undefined;
  }
  if (typeof schema === "object") {
    return { type: "object" };
  }
  return undefined;
}
export default { convertZodToJsonSchema };
              `,
              loader: 'js',
            }))
          },
        },
      ],
    },
  },
  plugins: [
    zodConverterShim,
    ...(enableDevtools ? [devtools()] : []),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
