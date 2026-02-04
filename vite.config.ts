import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    root: '.',
    build: {
      outDir: 'dist/client',
      emptyOutDir: true,
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
          pure_funcs: isProduction ? ['console.log', 'console.debug'] : [],
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            three: ['three'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    // Production optimizations
    ...(isProduction && {
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }),
  }
})
