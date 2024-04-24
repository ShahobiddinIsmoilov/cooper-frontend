import { makeRequest } from "../makeRequest";

export default function postAction(id: number, action: string) {
  return makeRequest(`/api/post/action/${id}/?action=${action}`);
}
