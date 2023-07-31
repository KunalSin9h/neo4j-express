import express from "express";
import neo4j from "neo4j-driver";

const connectionString = "neo4j://127.0.0.1:7687";

const driver = neo4j.driver(
  connectionString,
  neo4j.auth.basic("neo4j", "password")
);

(async () => {
  const app = express();

  app.get("/search", async (req, res) => {
    const session = driver.session();

    const results = await session.run(
      `
        MATCH path = shortestPath(
            (:Person { name: $person_1})-[*]-(:Person { name: $person_2 })
        ) UNWIND nodes(path) as n
        RETURN coalesce(n.name, n.title) as text;
    `,
      {
        person_1: req.query.person_1,
        person_2: req.query.person_2,
      }
    );

    res
      .json({
        status: "ok",
        path: results.records.map((record) => record.get("text")),
      })
      .end();
  });

  app.use(express.static("./static"));

  const PORT = 3000;
  console.log("Starting server on port:", PORT);
  app.listen(PORT);
})();
