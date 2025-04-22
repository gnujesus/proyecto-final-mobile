import { Text, View, TextInput, Button, Alert, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { login } from "@/services/login";

export default function LoginScreen() {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await login(cedula, clave);
      console.log(response);
      
      if (response.exito) {
        Alert.alert(
          "¡Éxito!",
          response.mensaje || "Inicio de sesión exitoso",
          [
            {
              text: "OK",
              onPress: () => router.push("/(tabs)/home"),
            },
          ],
          { cancelable: false }
        );
      } else {
        throw new Error(response.mensaje || "Credenciales incorrectas");
      }
    } catch (error: any) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Hubo un problema al iniciar sesión");
      } else {
        Alert.alert("Error", "Hubo un problema inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        placeholderTextColor="#999"
        value={cedula}
        onChangeText={setCedula}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Cargando..." : "Iniciar sesión"}
          onPress={handleLogin}
          disabled={loading}
          color="#FF9500" // Naranja para el botón
        />
      </View>
      {/* Link para redirigir */}
      <Pressable
        onPress={() => router.push("/views/registerScreen")} // Ruta a donde quieres redirigir
        style={({ pressed }) => [
          styles.linkContainer,
          pressed && { opacity: 0.6 }, // Efecto al presionar
        ]}
      >
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Fondo negro
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: '#FF9500', // Naranja para el título
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#FF9500', // Borde naranja
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 5,
    color: '#FFF', // Texto blanco
    backgroundColor: '#333', // Fondo oscuro para los inputs
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 5,
    overflow: 'hidden', // Para mantener el borde redondeado en Android
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: '#FF9500',
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "500"
  }
});