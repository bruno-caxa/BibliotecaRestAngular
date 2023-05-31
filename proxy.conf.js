const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://bibliotecarestspring-production.up.railway.app',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;

