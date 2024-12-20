// Import the required modules
const http = require("http"); // Provides HTTP server functionality
const fs = require("fs"); // Allows file system operations (reading files)
const path = require("path"); // Provides utilities for working with file and directory paths

// Define the port on which the server will listen
const port = 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Construct the file path to serve
  // If the request is for "/", serve "index.html"; otherwise, serve the requested URL
  const filePath = path.join(
    __dirname, // Current directory
    req.url === "/" ? "index.html" : req.url // Default to "index.html" if the root is requested
  );

  // Determine the file extension from the requested file path
  const extName = String(path.extname(filePath)).toLowerCase();

  // Define MIME types to associate file extensions with content types
  const mineTypes = {
    ".html": "text/html", // HTML files
    ".css": "text/css", // CSS files
    ".js": "text/javascript", // JavaScript files
    ".png": "text/png", // PNG image files
  };

  // Determine the content type based on the file extension
  // Default to "application/octet-stream" for unknown extensions
  const contentType = mineTypes[extName] || "application/octet-stream";

  // Read the requested file from the file system
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Handle errors (e.g., file not found)
      if (err.code === "ENOENT") {
        // If the file does not exist (ENOENT), respond with a 404 error
        res.writeHead(404, { "Content-Type": "text/html" }); // Set the response header
        res.end("404: File not found Dummy"); // Send the response body
      }
    } else {
      // If the file is successfully read, serve it with the appropriate content type
      res.writeHead(200, { "content-type": contentType }); // Set the response header
      res.end(content, "utf-8"); // Send the file content as the response
    }
  });
});

// Start the server and listen for requests on the specified port
server.listen(port, () => {
  // Log a message to the console when the server is running
  console.log(`Server is listening on port ${port}`);
});
