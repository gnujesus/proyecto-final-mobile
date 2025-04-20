export const getAllShelters = async () => {
  const response = await fetch(
    "https://adamix.net/defensa_civil/def/albergues.php"
  );
  const data = await response.json();
  return data;
};
