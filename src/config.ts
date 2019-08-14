export default {
    PORT: process.env.FMF_PORT || "3000",
    LOG_REQUESTS: process.env.FMF_LOG_REQUESTS || false,
    LOG_LEVEL: process.env.FMF_LOG_LEVEL || "info",
    JWT_PRIVATE_KEY: process.env.FMF_JWT_PRIVATE_KEY || "devJwtKey",
    AUTH_HEADER: process.env.FMF_AUTH_HEADER || "authorization",
    DEFAULT_PROJECT_COLOR_NAME: "projectDefault",
    DEFAULT_PROJECT_COLOR_VALUE: "4183D7"
}
