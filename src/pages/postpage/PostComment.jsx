import { formatTimeAgo } from "../../utils/formatDate";

const Comment = ({ comment }) => {
  return (
    <>
      <p>
        {comment.guestName || "Anonymous"} - {formatTimeAgo(comment.createdAt)}
      </p>
      <p>{comment.content}</p>
    </>
  );
};

export default Comment;
