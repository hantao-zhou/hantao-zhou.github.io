import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace','SFMono-Regular','Menlo','monospace']
      }
    }
  },
  plugins: []
}
export default config
