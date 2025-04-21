import React from "react";
import { View, Text, ScrollView } from "react-native";
import BaseLayout from "../../components/BaseLayout";
import {WebView} from "react-native-webview"
const directors = [
  { nombre: "Ing. Carlos D´ Franco", inicio: "17-07-1966", fin: "11-06-1971" },
  { nombre: "Dr. Mariano Ariza Hernández", inicio: "11-06-1971", fin: "26-08-1974" },
  { nombre: "Dr. Pedro Justiniano Polanco", inicio: "26-08-1974", fin: "15-01-1982" },
  { nombre: "Dr. Domingo Porfirio Rojas", inicio: "15-01-1982", fin: "16-01-1985" },
  { nombre: "Lic. Alfonso Julia Mera", inicio: "16-01-1985", fin: "28-08-1986" },
  { nombre: "Dr. Eugenio Cabral Martínez", inicio: "28-08-1986", fin: "01-09-1998" },
  { nombre: "Lic. Manuel Elpidio Báez", inicio: "01-09-1998", fin: "27-02-1999" },
  { nombre: "José Antonio De los Santos", inicio: "27-02-1999", fin: "17-08-2000" },
  { nombre: "Radhames Lora Salcedo", inicio: "17-08-2000", fin: "01-09-2004" },
  { nombre: "Lic. Luis Antonio Luna Paulino", inicio: "01-09-2004", fin: "10-10-2014" },
  { nombre: "Rafael Emilio De Luna Pichirilo", inicio: "10-10-2014", fin: "01-02-2017" },
  { nombre: "Rafael Antonio Carrasco Paulino", inicio: "01-02-2017", fin: "05-05-2021" },
  { nombre: "Lic. Juan Cesario Salas Rosario", inicio: "05-05-2021", fin: "Actual" },
];

export default function DefensaCivil() {
  return (
    <BaseLayout className="px-5 py-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold text-white text-center mb-4">
          Historia de la Defensa Civil
        </Text>
        <Text className="text-white text-base mb-4">
        Antes del año 1966, cuando llegaba la temporada de huracanes, un grupo de radioaficionados se reunía en la Cruz Roja para estar atentos por si surgía algún tipo de emergencia, inmediatamente ponerse a disposición y ayudar en todo lo posible, inclusive, usando sus propios equipos de comunicación para así tener contacto con el exterior en caso de que las redes telefónicas resultaran afectadas.
        {`\n\n`}
Al surgir el triunvirato fue designado el Dr. Rafael Cantizano Arias, como presidente de la Cruz Roja y al mismo tiempo nombraron al Ing. Carlos D´ Franco como director de la Defensa Civil, quien con un grupo compuesto por seis personas, se instaló en la calle Francia esquina Galván, siendo esa la primera oficina de la Defensa Civil.
{`\n\n`}
Al surgir el Gobierno Provisional, presidido por el Dr. Héctor García Godoy, a los diecisiete días del mes de junio de 1966, fue promulgada la Ley 257, mediante la cual fue creada la Defensa Civil, institución dependiente de la Secretaría Administrativa de la Presidencia (ahora Ministerio de la Presidencia) y quien en la actualidad preside la Comisión Nacional de Emergencias.
{`\n\n`}

Más adelante, el local fue trasladado a la calle Dr. Delgado No. 164 y luego en la gestión del Contralmirante Radhamés Lora Salcedo se reubicó a la Plaza de la Salud, donde aún permanece.
        
        </Text>

        <Text className="text-xl font-bold text-white mb-2">
          Lista de Directores de la Defensa Civil
        </Text>

        <View className="bg-white rounded-lg shadow-md p-4 mb-6">
          {directors.map((dir, index) => (
            <View key={index} className="border-b border-gray-200 py-2">
              <Text className="text-gray-800 font-semibold">{dir.nombre}</Text>
              <Text className="text-gray-600 text-sm">
                Gestión: {dir.inicio} - {dir.fin}
              </Text>
            </View>
          ))}
        </View>

        <Text className="text-xl font-bold text-white mb-3">
          Video Informativo
        </Text>

        <View className="h-64 rounded-lg overflow-hidden mb-10">
        <WebView
            source={{ uri: "https://www.youtube.com/embed/UenHxG_089g?si=VvudVFcA0llUjnd8" }}
            allowsFullscreenVideo
            javaScriptEnabled
          />
        </View>     
      </ScrollView>
    </BaseLayout>
  );
}
