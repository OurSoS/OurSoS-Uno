import { View, Image, Modal, TouchableOpacity, StyleSheet, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import tw from 'twrnc';
import React from 'react';

import { Avatar, Button, Card, Text, Snackbar } from 'react-native-paper';
import { router } from "expo-router";
// const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

export default function ContentCard({ imgSrc, data, heading, snippet, onToggleSnackBar }: { imgSrc: string, data: any, heading: string, snippet: string, onToggleSnackBar: any }) {
        // const [visible, setVisible] = useState(false);

        // const onToggleSnackBar = () => setVisible(!visible);

        // const onDismissSnackBar = () => setVisible(false);
        // // onPress = { onToggleSnackBar } > { visible? 'Hide': 'Show' }
        return (
                <View>
                        <TouchableOpacity
                                onPress={() => onToggleSnackBar(data)}
                        >
                                <Card style={tw.style(`w-[14rem]`, `m-2`, `bg-white`)}>
                                        <Card.Cover style={tw.style(`p-2`, `bg-white`)} source={{ uri: imgSrc }} />
                                        <Card.Title title={heading} />
                                        <Card.Content>
                                                <Text>{snippet}</Text>
                                        </Card.Content>
                                </Card>
                        </TouchableOpacity>

                </View>
        )
}
