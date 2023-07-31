![banner](https://tiddi.kunalsin9h.com/fBxabYU)

### neo4j + Express

Running **neo4j** database with credential

```bash
docker run \
    -d  \
    --name neo4j \
    -p 7474:7474 \
    -p 7687:7687 \
    -v $HOME/neo4j/data:/data \
    --env NEO4J_AUTH=neo4j/password \
    neo4j:latest
```

> Here NEO4J_AUTH = username/password

This will start the `neo4j BROWSER Client` on the port **:7474**

To exec into the container

```bash
docker exec -it neo4j cypher-shell -u neo4j -p password
```

And the **API** on the port **:7687:7687**

#### Dependencies

1. Express
2. neo4j-driver
