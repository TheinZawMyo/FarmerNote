import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {FAB} from 'react-native-paper';
import COLORS from '../consts/Colors';

const ModalComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      {/* Modal Box */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    backgroundColor: COLORS.green,
    bottom: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 35,
    marginTop: -20,
    alignItems: 'center',
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ModalComponent;
