module.exports = {
  rewrite: [
    {
      from: '/api/(.*)',
      to: 'http://localhost:3001/api/$1',
    },
    {
      from: '/(.*)',
      to: 'http://localhost:3000/$1',
    },
  ],
};
