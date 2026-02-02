const corsConfig = {
  origin: [
    "http://localhost:5173",
    "https://skill-forge-dsa.web.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export default corsConfig;
