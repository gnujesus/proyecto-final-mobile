export async function login(cedula: string, clave: string): Promise<any> {
	const formData = new FormData();
	formData.append("cedula", cedula);
	formData.append("clave", clave);

	try {
		const response = await fetch("https://adamix.net/defensa_civil/def/iniciar_sesion.php", {

			method: "POST",
			body: formData,
			headers: {
				// Note: DO NOT set Content-Type manually for FormData in fetch, it breaks the boundary auto-generation.
				Accept: "application/json",
			},
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Login failed");
		}

		return data;
	} catch (error: any) {
		console.error("LoginService Error:", error.message);

		throw error;
	}
}