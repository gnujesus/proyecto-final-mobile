import { View, FlatList, useWindowDimensions } from "react-native";
import React, { useState, useMemo } from "react";
import FineCard from "./FineCard";
import SearchBar from "./SearchBar";

interface Props {
  data: New[];
}

export default function FineGrid({ data }: Props) {
  const [query, setQuery] = useState("");

  // Memoized filtered data
  const filteredData = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter((item) =>
      `${item.titulo} ${item.fecha}`.toLowerCase().includes(q)
    );
  }, [query, data]);

  return (
    <>
      <SearchBar
        placeholder="Buscar una noticia..."
        className="mt-5 flex-1"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <FineCard fine={item} grid />}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        columnWrapperStyle={{ gap: 20 }}
        contentContainerStyle={{ paddingTop: 30, gap: 30 }}
      />
    </>
  );
}
