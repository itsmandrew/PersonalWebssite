// vite.config.js
export default {
    build: {
      rollupOptions: {
        input: {
          main: 'src/main.js',
          otherPage: 'src/otherPage.html',
        },
      },
    },
  };