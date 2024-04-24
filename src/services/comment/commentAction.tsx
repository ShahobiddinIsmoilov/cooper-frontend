import { makeRequest } from "../makeRequest";

export default function likePost(id: number, action: string) {
  return makeRequest(`/api/comment/action/${id}/?action=${action}`);
}
