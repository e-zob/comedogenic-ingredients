import { Application } from "https://deno.land/x/abc/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";

const db = new DB("./ingredients.db");
const app = new Application();
const PORT = 8080;

app
  .use(
    abcCors({
      origin: /^.+localhost:(3000|1234)$/,
      allowedHeaders: ["Authorization", "Content-Type", "Accept", "Origin", "User-Agent"],
      credentials: true,
    })
  )
  .get("/ingredients/:name", getIngredient);

app.start({ port: PORT });
console.log(`Server running on http://localhost:${PORT}`);

async function getIngredient(server) {
  const { name } = server.params;
  const query = "SELECT * FROM ingredients WHERE ingredient LIKE ?";
  const rawResult = db.query(query, [`%${name.replaceAll("%20", "")}%`]);
  const result = formatData(rawResult);
  return server.json(result, 200);
}

function formatData(array) {
  return array.map((ingredient) => {
    return { id: ingredient[0], ingredient: ingredient[1], comedogenicity: ingredient[2], irritancy: ingredient[3] };
  });
}

// denon run --allow-read --allow-write --allow-net server.js
