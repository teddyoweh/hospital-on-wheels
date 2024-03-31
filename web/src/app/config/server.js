import axios from "axios";

export const serverip = 'http://localhost:9990'

export const wrapEndpoint = (endpoint) => {
  return `${serverip}/${endpoint}`

  
}

export const endpoints = {
   login: wrapEndpoint('auth/login'),
    register: wrapEndpoint('auth/register'),
    verifyAuth: wrapEndpoint('auth/verify'),
    getNurses: wrapEndpoint('nurses/get'),
    chatBase: wrapEndpoint('base/chat'),
}

export const api = axios.create({
    baseURL: serverip,
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Accept':"*/*",
    //     'Access-Control-Allow-Origin': '*',
    // }
   
});

export const headers =   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept':"*/*",
    'Access-Control-Allow-Origin': '*',
   }