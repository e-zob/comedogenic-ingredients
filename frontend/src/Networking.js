export async function getIngredients(name) {
  const response = await fetch(`http://localhost:8080/ingredients/${name}`);
  const data = await response.json();
  return data;
}

export async function addIngredient(ingredient, comedogenicity, irritancy) {
  const details = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredient: ingredient, comedogenicity: comedogenicity, irritancy: irritancy }),
  };
  await fetch(`http://localhost:8080/ingredients/add`, details);
}

export async function updateIngredient(id, column, value) {
  const details = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, column: column, value: value }),
  };
  await fetch(`http://localhost:8080/ingredients/update`, details);
}

export async function deleteIngredient(id) {
  const details = {
    method: "DELETE",
  };
  await fetch(`http://localhost:8080/ingredients/delete/${id}`, details);
}
