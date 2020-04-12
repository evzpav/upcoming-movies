const config = {
    apiUrl: process.env.NODE_ENV === "production" ? window.location.origin : "http://localhost:4000",
};

export default config;