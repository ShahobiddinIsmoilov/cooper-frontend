import { makeRequest } from "./makeRequest";

export default function getUserActivity(url: string) {
  return makeRequest(url);
}
