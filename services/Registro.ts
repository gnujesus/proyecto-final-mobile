export async function registerMember(user: User): Promise<any> {
  const formData = new FormData()
  formData.append('cedula', user.id);
  formData.append('nombre', user.name);
  formData.append('apellido', user.lastName);
  formData.append('clave', user.password);
  formData.append('correo', user.email);
  formData.append('telefono', user.phone);

  const response = await fetch("https://adamix.net/defensa_civil/def/registro.php", {
    method: "POST",
    body: formData, // no need for headers, browser sets them automatically for FormData
  });

  const data = await response.json();
  return data;
}