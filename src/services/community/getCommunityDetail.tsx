import { makeRequest } from "../makeRequest";

function getCommunityDetail(url: string) {
  return makeRequest(url);
}

export default getCommunityDetail;
