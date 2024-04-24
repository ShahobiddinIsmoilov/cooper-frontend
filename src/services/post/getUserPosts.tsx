import { makeRequest } from "../makeRequest";

export default function getPosts(url: string) {
  return makeRequest(url);
}
