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
