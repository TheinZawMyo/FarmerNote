import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
} from 'react-native';
import {BottomSheet} from 'react-native-elements';
import COLORS from '../consts/Colors';
import {Button, FAB, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {omit} from 'lodash';
import Realm from 'realm';
import {WorkSchema, LandSchema} from '../database/Realm';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const NewLand = ({getLand}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  let realm = new Realm({
    schema: [WorkSchema, LandSchema],
    path: 'FarmerNote.realm',
    schemaVersion: 2,
  }); // realm get schema
  const [values, setValues] = useState({
    plant: '',
    date: null,
    location: '',
  });

  // Realm.open({}).then(real => {
  //   console.log('Realm is located at: ' + real.path);
  // });

  //get input values
  const getTextInput = (text, input) => {
    validateInput(text, input);
    setValues(prevState => ({...prevState, [input]: text}));
  };

  // validation for inputs
  const validateInput = (text, input) => {
    switch (input) {
      case 'plant':
        if (text.length < 2 || text.length === 0) {
          setErrors({
            ...errors,
            plant: 'သီးနှံအမည်မှာ အနည်းဆုံး စကားလုံး ၂ လုံး ပါဝင်ရမည်။',
          });
        } else {
          let newObj = omit(errors, 'plant');
          setErrors(newObj);
        }
        break;
      case 'location':
        if (text.length < 4 || text.length === 0) {
          setErrors({
            ...errors,
            location: 'တည်နေရာမှာ အနည်းဆုံး စကားလုံး ၄ လုံး ပါဝင်ရမည်။',
          });
        } else {
          let newObj = omit(errors, 'location');
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const savePlant = e => {
    e.preventDefault();
    // console.log(values);
    if (
      values.plant == null ||
      values.date == null ||
      values.location == null
    ) {
      Alert.alert('သတိ', 'ပြည့်စုံစွာ ဖြည့်သွင်းပါ။');
    } else {
      if (
        Object.keys(errors).length === 0 &&
        Object.keys(values).length !== 0
      ) {
        try {
          realm.write(() => {
            var ID =
              realm.objects('Lands').sorted('id', true).length > 0
                ? realm.objects('Lands').sorted('id', true)[0].id + 1
                : 1;
            realm.create('Lands', {
              id: ID,
              name: values.plant,
              location: values.location,
              // eslint-disable-next-line radix
              created_year: parseInt(values.date.getFullYear()),
              created_date: values.date,
            });
          });
          Alert.alert('Success!', 'ဖြည့်သွင်းမှု အောင်မြင်ပါသည်။');
          getLand();
          setIsVisible(false);
          setErrors({});
          setValues({});
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert('သတိ', 'ပြည့်စုံစွာ ဖြည့်သွင်းပါ။');
      }
    }

    // let data = realm.objects('Lands');
    // console.log(data);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setValues(prevState => ({...prevState, date: currentDate}));
    // console.log(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showBottomSheet = () => {
    setIsVisible(true);
    setErrors({});
    setValues({});
    setDate('');
  };

  return (
    <SafeAreaProvider>
      <BottomSheet
        modalProps={{}}
        isVisible={isVisible}
        style={styles.bottomSheet}>
        <Text style={styles.sheetHeader}>စိုက်ခင်းထည့်သွင်းရန်</Text>
        <View style={styles.form}>
          <Text style={styles.label}>သီးနှံအမျိုးအစား</Text>
          <TextInput
            mode="outlined"
            label="သီးနှံအမျိုးအစား"
            activeOutlineColor={COLORS.green}
            outlineColor={COLORS.forg_green}
            placeholder="သီးနှံအမျိုးအစား"
            onChangeText={text => getTextInput(text, 'plant')}
          />
          {errors?.plant && (
            <Text style={{color: COLORS.red}}>{errors?.plant}</Text>
          )}

          <Text style={styles.label}>စိုက်ပျိုးချိန်</Text>

          <TextInput
            value={date && date.toDateString()}
            style={styles.inputDate}
            mode="outlined"
            activeOutlineColor={COLORS.green}
            outlineColor={COLORS.forg_green}
            onFocus={showDatepicker}
            placeholder="စိုက်ပျိုးချိန် ရွေးချယ်ပါ"
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date ? date : new Date()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.label}>မြေကွက်တည်နေရာ</Text>
          <TextInput
            mode="outlined"
            label="တည်နေရာ"
            activeOutlineColor={COLORS.green}
            outlineColor={COLORS.forg_green}
            placeholder="တည်နေရာ"
            onChangeText={text => getTextInput(text, 'location')}
          />
          {errors?.location && (
            <Text style={{color: COLORS.red}}>{errors?.location}</Text>
          )}
          <Button
            mode="contained"
            color={COLORS.green}
            style={styles.btn}
            onPress={savePlant}>
            ထည့်သွင်းမည်
          </Button>
          <Button color={COLORS.red} onPress={() => setIsVisible(false)}>
            မလုပ်ဆောင်ပါ
          </Button>
        </View>
      </BottomSheet>
      <FAB style={styles.fab} icon="plus" onPress={showBottomSheet} />
    </SafeAreaProvider>
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
  sheetHeader: {
    fontSize: 16,
    color: COLORS.green,
    textAlign: 'center',
    paddingTop: 20,
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btn: {
    padding: 8,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    marginTop: 5,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    height: Dimensions.get('window').height - 250,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
});

export default NewLand;
