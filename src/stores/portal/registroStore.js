import { defineStore } from 'pinia'
import AxiosAM from '@/services/AxiosAM.js'

export const useUserDataStore =defineStore('userDataStore',()=>{

  async function saveUserData(userData) {
    try {
      const { status, data } = await AxiosAM.post('/admissions/candidates',userData);
      if(status===201){
        console.log('save user data');
      }
    } catch (error) {
      console.log('error save user data');
    }
  }

  return { saveUserData}
})