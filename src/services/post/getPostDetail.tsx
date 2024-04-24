import { makeRequest } from "../makeRequest";

function getPostDetail(post_id: string) {
  return makeRequest(`/api/post/detail/${post_id}`);
}

export default getPostDetail;
