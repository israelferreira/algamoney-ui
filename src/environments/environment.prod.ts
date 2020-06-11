export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/algamoney-api',

  tokenWhitelistedDomains: [ /localhost:8080/ ],
  tokenBlacklistedDomains: [ /\/oauth\/token/ ]
};
