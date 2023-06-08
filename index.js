import { createServer } from "http";
import { route } from "./route/routes.js";
import "dotenv/config";
const server = createServer(route);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
