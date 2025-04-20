export async function getAllNews() {
  const response = await fetch(
    "https://adamix.net/defensa_civil/def/noticias.php"
  );
  const data = await response.json();
  return data;
}
