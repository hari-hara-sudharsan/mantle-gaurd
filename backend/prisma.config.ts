// prisma.config.js
import "dotenv/config";

/** @type {import('prisma/config').Config} */
const config = {
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

export default config;