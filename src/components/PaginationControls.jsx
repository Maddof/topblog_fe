const PaginationButtons = ({ page, totalPages, onPageChange }) => {
  return (
    <div>
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span style={{ marginInline: "10px" }}>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
