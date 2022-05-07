import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default function CustomModal(props) {
    const {modalVisible, setModalVisible} = props;
    const {modalText, setModalText} = props;

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Ok</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        </View>
        );
    };

const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            paddingVertical: 20,
            paddingHorizontal: 5,
            alignItems: "center",
            shadowColor: "#000",
            width: '60%',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
        },
        buttonOpen: {
            backgroundColor: "#F194FF",
        },
        buttonClose: {
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center",
            fontSize: 17
        }
}
);