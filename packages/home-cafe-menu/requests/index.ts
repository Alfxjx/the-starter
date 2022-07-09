import { Http } from "./config";

export function getMenu() {
  return Http.get('/menu');
}

export function getBean() {
  return Http.get('/bean');
}

export function doBuy(data: any) {
  return Http.post('/payment', data);
}