import React, { Suspense } from "react";
import { ScrollView } from "react-native";
import ContentCard from "./content-card";
import CardLoading from "./card-loading";

export default function Slider({
  data,
  onToggleSnackBar,
}: {
  data: any[];
  onToggleSnackBar: any;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={10}
      style={{ paddingVertical: 10 }}
      contentContainerStyle={{ justifyContent: "center", height: 200 }}
    >
      <Suspense fallback={<CardLoading />}>
        {data.map((item, i) => {

          return (
            <ContentCard
              onToggleSnackBar={onToggleSnackBar}
              key={i}
              data={item}
              imgSrc={item.thumbnail}
              heading={item?.title}
              snippet={item.snippet}
            />
          );
        })}
      </Suspense>
    </ScrollView>
  );
}
