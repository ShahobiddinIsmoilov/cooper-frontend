import { makeRequest } from "./makeRequest";

export default function getLinkData(url: string) {
  return makeRequest(`api/post/utils/getLinkData/?link=${url}`);
}
