export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/algamoney-api',

  tokenAllowedDomains: [ /localhost:8080/ ],
  tokenDisallowedDomains: [ /\/oauth\/token/ ]
};
