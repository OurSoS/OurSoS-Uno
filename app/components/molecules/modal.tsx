import { useState } from 'react';
import { Image, Modal, View, Button, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

export default function CustomModal({ heading, link, subtext, open }: { heading: string, link: string, subtext: string, open: boolean }) {
        const windowHeight = Dimensions.get('window').height;

        // This state would determine if the drawer sheet is visible or not
        const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

        // Function to open the bottom sheet 
        // const handleOpenBottomSheet = () => {
        useEffect(() => {
                setIsBottomSheetOpen(open);
        }, [])
        // };

        // Function to close the bottom sheet
        const handleCloseBottomSheet = () => {
                setIsBottomSheetOpen(false);
        };
        return (
                <Modal
                        animationType="slide"
                        transparent={true}
                        // We use the state here to toggle visibility of Bottom Sheet 
                        visible={isBottomSheetOpen}
                        // We pass our function as default function to close the Modal
                        onRequestClose={handleCloseBottomSheet} >
                        <View style={{ height: windowHeight * 0.6 }}>
                                <TouchableOpacity onPress={handleCloseBottomSheet}>
                                        <Text>X</Text>
                                        {/* <Image source={require('assets/icons/close.png')} /> */}
                                </TouchableOpacity>
                                <View>
                                        <Text>
                                                {heading}
                                        </Text>
                                        <Text>
                                                {link}
                                        </Text>
                                        <Text>
                                                {subtext}
                                        </Text>
                                </View>

                        </View>
                </Modal>

        )

}