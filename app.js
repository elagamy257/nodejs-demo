const express = require("express");
const logger = require("./middlewares/logger");
const { errorHandel, errorHandler, notFound } = require("./middlewares/errors");
require("dotenv").config();
const connectToDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// init app
const app = express();
const port = process.env.PORT || 5000;

// connect to database
connectToDB();

// security middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compression());

// middleware parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// static folder
app.use(express.static(path.join(__dirname, "images")));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "Node.js Bookstore API Documentation",
    },
    servers: [
      {
        url: "/",
        description: "Server URL",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
    },
  },
  apis: ["./routes/*.js", path.join(__dirname, "routes/*.js")],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Swagger UI routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/author"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));

// error handling middleware
app.use(notFound);
app.use(errorHandler || errorHandel);

// run server locally
if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV || "development"} mode on port ${port}`,
    );
  });

  // handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    server.close(() => {
      process.exit(1);
    });
  });
}

module.exports = app;