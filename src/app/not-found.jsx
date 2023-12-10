import React from "react";
// This is the page for the 405 error
function error405() {
  return (
    <div>
      <div>
        <h1>Error: 405</h1>
        <h2>Method Not Allowed</h2>
        <p>
          The request method is not supported by the server and cannot be
          handled.
        </p>
      </div>
    </div>
  );
}

export default error405;
