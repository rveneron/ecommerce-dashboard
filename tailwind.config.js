const tailwindConfig = {
  important: true,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // MUI screens
    screens: {
      'sm': '600px',
      // => @media (min-width: 600px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1200px',
      // => @media (min-width: 1200px) { ... }

      'xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '2xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        error: 'var(--error-color)',
        info: 'var(--info-color)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        success: 'var(--success-color)',
        base: 'var(--text-color)',
        'header-color': 'var(--header-color)',
        'footer-color': 'var(--footer-color)'
      },
      textColor: {
        primary: 'var(--primary-color)',
      },
      minWidth: {
        '1/2': '50%',
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem'
      },
      minHeight: {
        '1/2': '50%',
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem'
      }
    }
  }
};

module.exports = tailwindConfig;
