export const config = {
  http: {
    port: 3000,
  },

  production: process.env.NODE_ENV === 'production',
};
