import { defineStore } from 'pinia';
import { ref } from 'vue';
import { keycloak } from "../utils/keycloak";

export const sharedReload = ref(false);
export const useMainStore = defineStore('main', () => {
  const area = {
    areaId: ref(null),
    name: ref(null),
    initials: ref(null),
    active: ref(null),
  };

  function setAreaId(id) {
    area.areaId.value = id;
  }

  const itinerary = {
    itineraryId: ref(1),
    name: ref(null),
    active: ref(null),
  };

  function setItineraryId(id) {
    itinerary.itineraryId.value = id;
  }

  function getKeycloakRole(keycloakData) {
    if(keycloakData) {
      return keycloakData.realm_access.roles.includes('admin') ? 'admin' : 'user';
    }else {
      return '';
    }
  }

  function getUserInfo() {
    const keycloakData = keycloak.tokenParsed;
      return {
        'username': keycloakData ? keycloakData.preferred_username : '',
        'role': keycloakData ? getKeycloakRole(keycloakData) : '',
        'email': keycloakData ? keycloakData.email : '',
        'emailIsVerified': keycloakData ? keycloakData.email_verified: ''
      }
  }

  return {
    area,
    setAreaId,
    itinerary,
    setItineraryId,
    getUserInfo
  };
});
