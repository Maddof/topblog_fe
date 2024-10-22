import useDocumentTitle from "../../utils/documentTitle";
import PostForm from "./PostForm";

const PublishPostPage = () => {
  useDocumentTitle("Publish a post");

  return (
    <>
      <div>
        <p>This is where you can publish a post</p>
        <PostForm />
      </div>
    </>
  );
};

export default PublishPostPage;
