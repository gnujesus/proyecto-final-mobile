// implementa getAllServices using this endpoint: https://adamix.net/defensa_civil/def/servicios.php

export const getAllServices = async () => {
  const response = await fetch("adamix.net/defensa_civil/def/servicios.php");
  const data = await response.json();
  console.log("🗃️ Data:", data);
  return data;
};
