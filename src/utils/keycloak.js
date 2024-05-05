import Keycloak from 'keycloak-js';

const { KEYCLOAK_HOST, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID } = import.meta.env;

const keycloak = new Keycloak({
  url: KEYCLOAK_HOST,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID
});

const keycloakInit = async(mandatoryLogin) => {
  if(keycloak.authenticated){
    return keycloak;
  }else{
    try{
      await keycloak.init({ 
        onLoad: mandatoryLogin ? 'login-required' : 'check-sso' 
      });
      console.info('Keycloak initialized');
      return keycloak;
    }catch(err) {
      console.error('Keycloak initialization failed', err);
    }
  }
}

export {
  keycloak,
  keycloakInit
};