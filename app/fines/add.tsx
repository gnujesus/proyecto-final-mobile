import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { createFine } from "@/hooks/useDatabase";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

export default function Add() {
  const router = useRouter();

  const [fineData, setFineData] = useState<Fine>({
    label_code: "",
    brand: "",
    model: "",
    color: "",
    year: "",
    infraction_type: "",
    date: "",
    time: "",
    description: "",
    image_url: "",
    audio_uri: "",
  });

  // Request permissions
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraStatus.status !== "granted" ||
        mediaStatus.status !== "granted"
      ) {
        Alert.alert(
          "Permission Denied",
          "Camera and Media access are required."
        );
      }
    })();
  }, []);

  const handleFind = async () => {
    if (!fineData.label_code.trim()) {
      Alert.alert("Error", "Please enter a label code first.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.adamix.net/itla.php?m=${fineData.label_code}`
      );
      const data = await res.json();

      if (data.ok !== 1) {
        Alert.alert("Not Found", "No data found for this label code.");
        return;
      }

      // Map API response to state
      setFineData((prev) => ({
        ...prev,
        brand: data.marca,
        model: data.modelo,
        color: data.color,
        year: data.anio,
        label_code: data.codigo,
        description: `Chassis: ${data.chasis}`,
      }));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch vehicle info.");
      console.error("Find error:", error);
    }
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: false,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;

      // Save to library (optional)
      await MediaLibrary.saveToLibraryAsync(uri); // ✅ correct usage

      setFineData((prev) => ({ ...prev, image_url: uri }));
    }
  };

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission required",
          "Audio recording permission is needed."
        );
        return;
      }

      // 🔐 Check if there's already a recording in progress
      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (uri) {
        setFineData((prev) => ({ ...prev, audio_uri: uri }));
        setRecordedUri(uri);
      }

      setRecording(null);
    } catch (err) {
      console.error("Error stopping recording:", err);
    }
  };

  const handleCreateFine = async () => {
    try {
      if (!fineData.image_url) {
        Alert.alert("Missing Photo", "Please take a photo before submitting.");
        return;
      }

      await createFine(fineData);

      setFineData({
        label_code: "",
        brand: "",
        model: "",
        color: "",
        year: "",
        infraction_type: "",
        date: "",
        time: "",
        description: "",
        image_url: "",
      });

      router.push("/");
    } catch (err) {
      Alert.alert("Error", "Could not create the fine.");
      console.error(err);
    }
  };

  const labelStyle = "text-light font-semibold text-lg";
  const inputStyle = "bg-dark2 rounded-md p-2 my-2 text-text";

  return (
    <BaseLayout>
      <ScrollView className="flex-1 px-4 mt-5">
        <View className="gap-5">
          <View>
            <Text className={labelStyle}>Label Code</Text>
            <View className="flex-row gap-2 items-center">
              <TextInput
                className="flex-1 bg-dark2 rounded-md p-2 my-2 text-text"
                placeholder="Enter label code"
                placeholderTextColor="#ccc"
                value={fineData.label_code}
                onChangeText={(text) =>
                  setFineData((prev) => ({ ...prev, label_code: text }))
                }
              />
              <TouchableOpacity
                className="bg-blue-600 p-2 rounded-md h-[45px] justify-center"
                onPress={handleFind}
              >
                <Text className="text-white text-sm">Find</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className={labelStyle}>Brand</Text>
            <TextInput
              className={inputStyle}
              placeholder="Enter brand"
              placeholderTextColor="#ccc"
              value={fineData.brand}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, brand: text }))
              }
            />
          </View>

          <View>
            <Text className={labelStyle}>Model</Text>
            <TextInput
              className={inputStyle}
              placeholder="Enter model"
              placeholderTextColor="#ccc"
              value={fineData.model}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, model: text }))
              }
            />
          </View>

          <View>
            <Text className={labelStyle}>Color</Text>
            <TextInput
              className={inputStyle}
              placeholder="Enter color"
              placeholderTextColor="#ccc"
              value={fineData.color}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, color: text }))
              }
            />
          </View>

          <View>
            <Text className={labelStyle}>Year</Text>
            <TextInput
              className={inputStyle}
              placeholder="Enter year"
              placeholderTextColor="#ccc"
              value={fineData.year}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, year: text }))
              }
            />
          </View>

          <View>
            <Text className={labelStyle}>Infraction Type</Text>
            <TextInput
              className={inputStyle}
              placeholder="Enter infraction type"
              placeholderTextColor="#ccc"
              value={fineData.infraction_type}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, infraction_type: text }))
              }
            />
          </View>

          <View>
            <Text className={labelStyle}>Date</Text>
            <TextInput
              className={inputStyle}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#ccc"
              value={fineData.date}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, date: text }))
              }
            />
          </View>

          <View>
            <Text className={labelStyle}>Time</Text>
            <TextInput
              className={inputStyle}
              placeholder="HH:MM"
              placeholderTextColor="#ccc"
              value={fineData.time}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, time: text }))
              }
            />
          </View>

          <View>
            <Text className={labelStyle}>Description</Text>
            <TextInput
              className={inputStyle}
              placeholder="Describe the infraction"
              placeholderTextColor="#ccc"
              value={fineData.description}
              onChangeText={(text) =>
                setFineData((prev) => ({ ...prev, description: text }))
              }
              multiline
            />
          </View>

          <View>
            <Text className={labelStyle}>Photo</Text>
            <TouchableOpacity
              className="bg-dark2 rounded-md p-3 my-2"
              onPress={handleTakePhoto}
            >
              <Text className="text-text text-center">
                {fineData.image_url ? "Retake Photo" : "Take Photo"}
              </Text>
            </TouchableOpacity>

            {fineData.image_url && (
              <Image
                source={{ uri: fineData.image_url }}
                className="w-full h-48 rounded-md"
                resizeMode="cover"
              />
            )}
          </View>

          <View>
            <Text className={labelStyle}>Audio Note</Text>
            <TouchableOpacity
              className="bg-dark2 rounded-md p-3 my-2"
              onPress={recording ? stopRecording : startRecording}
            >
              <Text className="text-text text-center">
                {recording
                  ? "Stop Recording"
                  : recordedUri
                  ? "Re-record Audio"
                  : "Record Audio"}
              </Text>
            </TouchableOpacity>

            {recordedUri && (
              <Text className="text-text text-sm italic">Audio saved ✔️</Text>
            )}
          </View>

          <TouchableOpacity
            className="bg-blue-500 rounded-md p-3 mt-4"
            onPress={handleCreateFine}
          >
            <Text className="text-white text-center">Create Fine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseLayout>
  );
}
