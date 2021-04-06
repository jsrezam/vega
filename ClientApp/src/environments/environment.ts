// import { domain, clientId } from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain: "vegadevproject.us.auth0.com",
    clientId: "mC6erxViF3nbbQAV5l3Go9Rn5pzn25j1",
    redirectUri: window.location.origin,
    audience: "https://api.vega.dev.project"
  },
  dev: {
    rolesClaim: "http://vega.dev.com/roles",
    apiUrl: "https://localhost:5001"
  }
};
