import { makeRequest } from "../makeRequest";

export function getComments(url: string) {
  return makeRequest(url);
}
