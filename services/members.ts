export async function getMembers() {
    const response = await fetch(
      "https://adamix.net/defensa_civil/def/miembros.php"
    );
    const data = await response.json();
    return data;
  }
  