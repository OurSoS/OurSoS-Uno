import { View, Image, Text, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import tw from 'twrnc';
import ContentCard from "./content-card";

export default function Slider({ data, translatedData, onToggleSnackBar }: { data: any[], translatedData: any, onToggleSnackBar: any }) {
        useEffect(() => {
                // console.log(translatedData);
        }, [])
        return (
                <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={10}
                        pagingEnabled
                        style={{ padding: 10 }}
                        contentContainerStyle={{ justifyContent: 'center' }}
                >
                        {
                                data.map((data, i) => {
                                        return (
                                                <ContentCard onToggleSnackBar={onToggleSnackBar} key={i} data={data} imgSrc={data.thumbnail} heading={data?.title} snippet={data.snippet} />
                                        )
                                })
                        }
                </ScrollView>
        )
}