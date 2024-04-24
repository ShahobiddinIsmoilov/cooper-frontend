import { makeRequest } from "../makeRequest";

export default function communityAction(id: number, action: string) {
  return makeRequest(`/api/community/action/${id}/?action=${action}`);
}
