import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import FineGrid from "../../components/FineGrid";
import FineCard from "@/components/FineCard";
import { getAllFines, initializeDatabase } from "@/hooks/useDatabase";
import BaseLayout from "@/components/BaseLayout";
import SearchBar from "@/components/SearchBar";

export default function Search() {
  const [data, setData] = useState<Fine[]>();

  useEffect(() => {
    const run = async () => {
      await initializeDatabase();
      const all = await getAllFines();
      setData(all);
    };
    run();
  }, []);

  return (
    <BaseLayout className="px-5 py-6">
      {data && <FineGrid data={data} />}
    </BaseLayout>
  );
}
