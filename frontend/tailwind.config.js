module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        'input:focus': {
          outline: 'none',
          boxShadow: 'none',
        },
        'button:focus': {
          outline: 'none',
          boxShadow: 'none',
        },
        // Add more elements if necessary (select, textarea, etc.)
      });
    },
  ],
}
