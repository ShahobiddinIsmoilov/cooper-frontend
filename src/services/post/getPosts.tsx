import { makeRequest } from "../makeRequest";

interface Props {
  filter: "home" | "explore" | "all" | "community" | "user";
  sortOption: string;
  community?: number;
  user?: number;
  username?: string;
}

export default function getPosts({
  filter,
  sortOption,
  user,
  username,
  community,
}: Props) {
  if (filter === "home")
    return makeRequest(
      `/api/post/list/?filter=home&user=${user}&sort=${sortOption}`
    );
  else if (filter === "explore")
    return makeRequest(
      `/api/post/list/?filter=explore&user=${user}&sort=${sortOption}`
    );
  else if (filter === "all")
    return makeRequest(
      `/api/post/list/?filter=all&user=${user}&sort=${sortOption}`
    );
  else if (filter === "community")
    return makeRequest(
      `/api/post/list/?filter=community&user=${user}&community=${community}&sort=${sortOption}`
    );
  else
    return makeRequest(
      `/api/post/list/?filter=user&user=${user}&community=${username}&sort=${sortOption}`
    );
}
