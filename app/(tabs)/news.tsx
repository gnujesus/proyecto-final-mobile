import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import FineGrid from "../../components/FineGrid";
import FineCard from "@/components/FineCard";
import BaseLayout from "@/components/BaseLayout";
import SearchBar from "@/components/SearchBar";
import { getAllNews } from "@/services/news";
import NewsList from "@/components/NewsList";
import { ScrollView } from "react-native";

export default function Search() {
  const [data, setData] = useState<New[]>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const run = async () => {
      const all = await getAllNews();
      setData(all.datos);
    };
    run();
  }, []);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    const q = query.toLowerCase();
    return (data || []).filter((item) =>
      `${item.titulo} ${item.fecha}`.toLowerCase().includes(q)
    );
  }, [query, data]);

  return (
    <BaseLayout className="py-6 px-5 gap-10">
      <SearchBar
        placeholder="Buscar una noticia..."
        className="mt-5 flex-1"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {data && <NewsList newsList={filteredData} />}
      </ScrollView>
    </BaseLayout>
  );
}
