import { Text, View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { login } from "@/services/login";  // Asegúrate de importar el servicio login

export default function LoginScreen() {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await login(cedula, clave); // Usamos el servicio de login
      console.log(response);
      
      // Aquí cambiamos `response.success` por `response.exito`
      if (response.exito) {
        Alert.alert(
          "¡Éxito!",
          response.mensaje || "Inicio de sesión exitoso",
          [
            {
              text: "OK",
              onPress: () => router.push("/"), // Solo después de aceptar el alert, navega
            },
          ],
          { cancelable: false }
        );
      } else {
        // Si el login falla, muestra el mensaje de error de la API
        throw new Error(response.mensaje || "Credenciales incorrectas");
      }
    } catch (error: any) {
      // Verificamos si el error es una instancia de Error
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Hubo un problema al iniciar sesión");
      } else {
        // Si el error no es una instancia de Error, mostramos un error genérico
        Alert.alert("Error", "Hubo un problema inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Iniciar sesión</Text>
      
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
      />
      
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
        placeholder="Contraseña"
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />
      
      <Button
        title={loading ? "Cargando..." : "Iniciar sesión"}
        onPress={handleLogin}
        disabled={loading} // Deshabilita el botón mientras se realiza la autenticación
      />
    </View>
  );
}