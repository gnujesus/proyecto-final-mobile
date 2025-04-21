import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { getMembers } from "../../services/members"; // Replace with your actual service

type Member = {
  id: string;
  nombre: string;
  apellido: string;
  cargo: string;
  foto: string;
};

export default function Miembros() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await getMembers(); // Should return the JSON object you posted
      if (res.exito) {
        setMembers(res.datos);
      }
      setLoading(false);
    };
    fetchMembers();
  }, []);

  return (
    <BaseLayout className="px-5 py-6">
      <Text className="text-xl font-bold text-white text-center mb-6">
        Miembros del Equipo
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {members.map((member) => (
            <View key={member.id} className="bg-white rounded-xl shadow-md p-4 mb-4">
              <Image
                // If the image is a relative path, prepend the base URL
                source={{uri: member.foto}}
                style={styles.image}
                resizeMode="cover"
              />
              <Text className="text-lg font-bold text-gray-800 mb-1">
                {member.nombre} {member.apellido}
              </Text>
              <Text className="text-gray-700">{member.cargo}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
});
