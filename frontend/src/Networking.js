export async function getIngredients(name) {
  const response = await fetch(`http://localhost:8080/ingredients/${name}`);
  const data = await response.json();
  return data;
}
