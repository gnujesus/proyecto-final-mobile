// implementa getAllServices using this endpoint: https://adamix.net/defensa_civil/def/servicios.php

export const getAllServices = async () => {
  const response = await fetch(
    "https://adamix.net/defensa_civil/def/servicios.php"
  );
  const data = await response.json();
  return data;
};
