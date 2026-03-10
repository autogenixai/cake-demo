/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'sn-bg':        '#FFFFFF',
        'sn-darkest':   '#401C13',
        'sn-primary':   '#673E34',
        'sn-secondary': '#6F4940',
        'sn-muted':     '#7D6F6B',
        'sn-black':     '#101010',
        'sn-grey':      '#474747',
        'sn-light':     '#E0E0E0',
        'sn-deep':      '#281612',
        'sn-cream':     '#FDF6F0',
      },
      fontFamily: {
        display:  ['"Abril Fatface"', 'serif'],
        romul:    ['"Romul"', 'serif'],
        body:     ['"Lato"', 'sans-serif'],
      },
      fontSize: {
        'hero':   ['clamp(64px, 12vw, 160px)', { lineHeight: '0.9' }],
        'h1':     ['50px', { lineHeight: '1.1' }],
        'h2':     ['40px', { lineHeight: '1.15' }],
        'h3':     ['30px', { lineHeight: '1.2' }],
        'h4':     ['25px', { lineHeight: '1.3' }],
        'h5':     ['20px', { lineHeight: '1.4' }],
        'body-l': ['20px', { lineHeight: '1.6' }],
        'body-m': ['18px', { lineHeight: '1.6' }],
        'body-s': ['16px', { lineHeight: '1.6' }],
        'caption':['12px', { lineHeight: '1.5' }],
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
        'gutter': '135px',
        'gutter-sm': '40px',
      },
      borderRadius: {
        'pill': '999px',
        'card': '2px',
      },
    },
  },
  plugins: [],
}
