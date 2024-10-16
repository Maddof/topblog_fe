// Function to format the publishedAt date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Intl.DateTimeFormat("sv-SE", options).format(new Date(dateString));
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  let timeAgo;

  switch (true) {
    case diffInYears > 0:
      timeAgo = `${diffInYears}y ago`;
      break;
    case diffInMonths > 0:
      timeAgo = `${diffInMonths}mo ago`;
      break;
    case diffInDays > 0:
      timeAgo = `${diffInDays}d ago`;
      break;
    case diffInHours > 0:
      timeAgo = `${diffInHours}h ago`;
      break;
    case diffInMinutes > 0:
      timeAgo = `${diffInMinutes}m ago`;
      break;
    default:
      timeAgo = `${diffInSeconds}s ago`;
  }

  return timeAgo;
};

export { formatDate, formatTimeAgo };
