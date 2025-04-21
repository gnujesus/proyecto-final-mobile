export async function getMesures() {
    const response = await fetch(
      "https://adamix.net/defensa_civil/def/medidas_preventivas.php"
    );
    const data = await response.json();
    return data;
  }
  