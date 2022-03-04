import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Card} from 'react-native-paper';
import COLORS from '../consts/Colors';
import NewLand from '../components/NewLand';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {WorkSchema, LandSchema} from '../database/Realm';
import Realm from 'realm';
import dateFormat from '../consts/DateFormat';

const ListScreen = ({}) => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );
  const navigation = useNavigation();
  const [land, setLand] = useState(null);

  let currentYear = new Date().getFullYear();
  let previousYear = currentYear - 1;
  //Real database
  let realm = new Realm({
    schema: [WorkSchema, LandSchema],
    path: 'FarmerNote.realm',
    schemaVersion: 2,
  });

  const getLand = useCallback(async () => {
    let year = selectedYear
      ? // eslint-disable-next-line radix
        parseInt(selectedYear)
      : // eslint-disable-next-line radix
        parseInt(new Date().getFullYear());
    let landData = realm.objects('Lands');
    let landByYear = landData.filtered('created_year =' + year);
    setLand(landByYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  // delete land from db
  const deleteLand = id => {
    id &&
      realm.write(() => {
        realm.delete(realm.objects('Lands').filtered('id =' + id));
      });
    getLand();
    Alert.alert('Success!', '‌အောင်မြင်စွာ ဖယ်ရှားပြီးပါပီ။');
  };

  useEffect(() => {
    getLand(selectedYear);
  }, [selectedYear, getLand]);

  const renderLand = ({item}) => {
    return (
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <Image
            source={require('../images/leaf1.png')}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDate}>
          {dateFormat(item.created_date, 'MM-dd-yyyy')}
        </Text>
        <View style={styles.iconContainer}>
          {/* <TouchableOpacity>
            <Icon
              name="lead-pencil"
              size={18}
              color={COLORS.green}
              style={[
                {
                  borderColor: COLORS.green,
                },
                styles.icon,
              ]}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => deleteLand(item.id)}>
            <Icon
              name="delete"
              size={18}
              color={COLORS.red}
              style={[
                {
                  borderColor: COLORS.red,
                },
                styles.icon,
              ]}
            />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>သီးနှံစိုက်ခင်းများ</Text>

        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}>
          <Picker.Item
            label={previousYear.toString()}
            value={previousYear.toString()}
          />
          <Picker.Item
            label={currentYear.toString()}
            value={currentYear.toString()}
          />
        </Picker>
      </View>
      {land == '' ? (
        <View style={styles.emptyBox}>
          <Text style={{color: COLORS.red}}>စိုက်ခင်း မရှိသေးပါ</Text>
        </View>
      ) : (
        <FlatList
          data={land}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderLand}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <NewLand getLand={getLand} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 18,
    color: COLORS.green,
  },
  picker: {
    width: 120,
    // backgroundColor: COLORS.forg_green,
    color: COLORS.green,
    borderRadius: 5,
  },
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    width: '100%',
    height: 70,
    marginTop: 30,
    resizeMode: 'contain',
  },

  cardTitle: {
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    color: COLORS.green,
  },

  cardDate: {
    color: COLORS.white,
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
    borderBottomLeftRadius: 7,
    textAlign: 'center',
    backgroundColor: COLORS.green,
  },

  emptyBox: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  icon: {
    padding: 5,
  },
});

export default ListScreen;
