import { makeRequest } from "../makeRequest";

function getCommunities(url: string) {
  return makeRequest(url);
}

export default getCommunities;
