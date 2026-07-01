const corsConfig = {
  origin: [
    "http://localhost:5173",
    "http://localhost:8080",
    "https://skill-forge-dsa.web.app",
    "https://skill-forge-dsa.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export default corsConfig;
