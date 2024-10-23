import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axiosConfig"; // Import the axios instance with baseURL
import useDocumentTitle from "../../utils/documentTitle";
import { formatDate } from "../../utils/formatDate";
import styles from "./PostPage.module.css";
import Comment from "./PostComment";
import CommentForm from "./CommentForm";
// Safely rendering HTML content in React
import DOMPurify from "dompurify";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`);
        setPost(response.data.post);
        setPostContent(response.data.post.content);
        console.log(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // Use the custom hook to set the document title based on the post title
  useDocumentTitle(post ? `${post.title}` : "Loading...");

  const sanitizedHtml = DOMPurify.sanitize(postContent);

  // Callback function to handle comment addition
  const handleCommentAdded = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [newComment, ...prevPost.comments],
    }));
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className={`${styles.postHeadline}`}>{post.title}</h2>
      <p className={`${styles.postDetails}`}>
        <b>Author</b>: {post.author.username}, <b>Published</b>:{" "}
        {formatDate(post.publishedAt)}, <b>Comments</b>: {post.comments.length}
      </p>
      <p>{post.content}</p>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

      <div>
        <h2>Comments </h2>
        <ul className={`${styles.commentWrapper}`}>
          {post.comments.map((comment) => (
            <li key={comment.id} className={`${styles.commentItem}`}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostPage;
