const ErrorPlaceholder = ({ fetchError }) => {
  return (
    <p style={{ marginTop: "2rem", color: "red" }}>{`Error: ${fetchError}`}</p>
  );
};

export default ErrorPlaceholder;
