import { makeRequest } from "./makeRequest";

function getUserDetail(username: number) {
  return makeRequest(`/api/user/detail/${username}`);
}

export default getUserDetail;
