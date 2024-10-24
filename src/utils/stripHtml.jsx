// Function to remove HTML tags from content
const stripHtml = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regular expression to remove HTML tags
};

export default stripHtml;
