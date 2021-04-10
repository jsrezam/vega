export const environment = {
  production: true,
  auth: {
    domain: "vegadevproject.us.auth0.com",
    clientId: "mC6erxViF3nbbQAV5l3Go9Rn5pzn25j1",
    redirectUri: window.location.origin,
    audience: "https://api.vega.dev.project"
  },
  dev: {
    rolesClaim: "https://vega.dev.com/roles",
    apiUrl: "https://vegademo.azurewebsites.net"
  }
};
