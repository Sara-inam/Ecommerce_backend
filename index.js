import express from "express";
import cors from "cors";
import config from "./config.js";
import connectdb from "./src/db/db.js";
import logger from "./src/config/logger.js";
import app from './src/app.js';

const server = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5176",
  "http://localhost:5173",
  "https://your-frontend.vercel.app"
];

server.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // Postman or curl
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

server.use(express.json());

// ✅ Simple homepage to avoid 404
server.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ API routes
server.use('/api', app);

const startServer = async () => {
  await connectdb();
  const PORT = config.PORT;
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
