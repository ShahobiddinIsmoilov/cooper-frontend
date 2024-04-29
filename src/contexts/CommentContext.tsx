// WARNING: HIGHLY UNSTABLE PIECE OF CODE. DO NOT CHANGE IF YOU DON'T KNOW WHAT YOU'RE DOING!!!

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CommentProps } from "../interfaces/commentProps";
import { getComments } from "../services/comment/getComments";
import { useAuthContext } from "./AuthContext";

export interface CommentContextProps {
  comments: CommentProps[];
  getReplies: (parent: number) => CommentProps[];
  rootComments: {};
  post: number;
  community: number;
}

export function useComments() {
  return useContext(CommentContext) as CommentContextProps;
}

const CommentContext = createContext<CommentContextProps | null>(null);

interface CommentProviderProps {
  children: ReactNode;
  post: number;
  community: number;
}

interface CommentsByParentProps {
  [parent: number]: CommentProps[];
}

export default function CommentProvider({
  children,
  post,
  community,
}: CommentProviderProps) {
  const [comments, setComments] = useState([]);
  const user = useAuthContext().user?.user_id;

  useEffect(() => {
    post &&
      getComments(
        `api/comment/list/?filter=post&post=${post}&user=${user}`
      ).then((response) => {
        setComments(response.data);
      });
  }, []);

  // critical piece of code to get an array of a parent comment
  const commentsByParent = useMemo(() => {
    const group: CommentsByParentProps = {};
    comments.forEach((comment: CommentProps) => {
      group[comment.parent] ||= [];
      group[comment.parent].push(comment);
    });
    return group;
  }, [comments]);

  function getReplies(parent: number) {
    return commentsByParent[parent];
  }

  let contextData = {
    comments: comments,
    getReplies: getReplies,
    rootComments: commentsByParent[0],
    post: post,
    community: community,
  };

  return (
    <CommentContext.Provider value={contextData}>
      {children}
    </CommentContext.Provider>
  );
}
