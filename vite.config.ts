import { ConfigEnv, UserConfigExport,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { vitePluginSvg } from '@webxrd/vite-plugin-svg'
import { resolve } from 'path'

const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

const alias: Record<string, string> = {
  '@': pathResolve('src')
}

export default ({ command }: ConfigEnv): UserConfigExport => {
  const prodMock = true
  const envMode = (command === 'serve' ? 'development' : 'production')
  const env = loadEnv(envMode, process.cwd())
  const useMock = env.VITE_USE_MOCK === 'true'

  console.log('useMock:',useMock)
  return {
    base: './',
    resolve: { alias },
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/dev': 'https://www.fastmock.site/mock/48cab8545e64d93ff9ba66a87ad04f6b/',
        '/api': {
          target: 'http://127.0.0.1:10001',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            echarts: ['echarts']
          }
        }
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: useMock,
        prodEnabled: false,
        watchFiles: true,
        injectCode: useMock ? `
          import { setupProdMockServer } from '../mockProdServer';
          setupProdMockServer();
        ` : '',
        logger: true
      }),
      vitePluginSvg({
        iconDirs: [resolve(__dirname, 'src/assets/svg')],
        main: resolve(__dirname, 'src/main.js'),
        symbolIdFormat: 'icon-[name]'
      })
    ],
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    }
  }
}
