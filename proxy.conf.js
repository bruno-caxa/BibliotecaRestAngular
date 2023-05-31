const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://bibliotecarestspring-production.up.railway.app/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;

