import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'inject-search-console-verification',
        transformIndexHtml(html) {
          const tags = []

          if (env.VITE_GSC_VERIFICATION) {
            tags.push(
              `<meta name="google-site-verification" content="${env.VITE_GSC_VERIFICATION}" />`,
            )
          }

          if (env.VITE_BING_VERIFICATION) {
            tags.push(
              `<meta name="msvalidate.01" content="${env.VITE_BING_VERIFICATION}" />`,
            )
          }

          if (tags.length === 0) return html

          return html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`)
        },
      },
    ],
    base: '/',
  }
})
