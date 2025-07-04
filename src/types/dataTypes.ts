import { ReactNode } from "react";

export type UserIdProps = {
  userId: string;
};

export type ErrorGlobalProps = {
  error: Error & { digest?: string }; // Error regular object, it might also have an optional property called digest of type string
  reset: () => void;
};

export type DateProps = {
  dateString: string;
};

export type PostIdProps = {
  postId: number;
};

export type ParamsProfileId = {
  params: Promise<{ profile_id: string }>;
};

export type ParamsPostId = {
  params: Promise<{ postId: string }>;
};

export type PostProps = {
  post: {
    id: number;
    content: string;
  };
};

export type ActiveLinkProps = {
  href: string;
  children: ReactNode; // Any react element, jsx elements
};
