import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { registerMember } from "../../services/Registro";

export default function Register() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [shouldRegister, setShouldRegister] = useState(false);

  useEffect(() => {
    // Este useEffect se ejecuta cuando shouldRegister cambia a true
    const registerUser = async () => {
      console.log("Llamando a la API para registrar usuario..."); // Aquí cuando llama a la API

      if (!id || !name || !lastName || !password || !email || !phone) {
        Alert.alert("Error", "Por favor completa todos los campos.");
        setShouldRegister(false);
        return;
      }

      const user: User = { id, name, lastName, password, email, phone };

      setLoading(true);
      try {
        const res = await registerMember(user);
        if (res.exito) {
          Alert.alert("Éxito", "Te has registrado exitosamente.");
          // Limpiar campos
          clearForm();
        } else {
          Alert.alert(
            "Error",
            res.mensaje || "Hubo un problema al registrarte."
          );
        }
      } catch (error) {
        console.error("Error registrando:", error);
        Alert.alert("Error", "No se pudo registrar.");
      } finally {
        setLoading(false);
        setShouldRegister(false); // Reiniciar la bandera
      }
    };

    if (shouldRegister) {
      registerUser();
    }
  }, [shouldRegister]);

  useEffect(() => {
    // Limpiar campos cuando la pantalla carga
    clearForm();
  }, []);

  const clearForm = () => {
    setId("");
    setName("");
    setLastName("");
    setPassword("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = () => {
    console.log("Botón de registro presionado"); // Aquí cuando presionas el botón
    setShouldRegister(true);
  };

  return (
    <BaseLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Text style={styles.header}>Registro</Text>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: 20 }}
              />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Cédula"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={id}
                  onChangeText={setId}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Apellido"
                  placeholderTextColor="#999"
                  value={lastName}
                  onChangeText={setLastName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />

                <Button title="Registrarse" onPress={handleSubmit} />
              </ScrollView>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
});
