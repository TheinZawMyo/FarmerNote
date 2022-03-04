import React from 'react';
import {
  View,
  RefreshControl,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MoneyIcon from 'react-native-vector-icons/FontAwesome';
import ChartComponent from '../components/LineChartComponent';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerText}>တောင်သူမှတ်စု</Text>
          <Text>မှတ်စုများ ရေးသားပါ။</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            name="info-outline"
            size={25}
            color={COLORS.green}
            onPress={() => navigation.navigate('Info')}
          />
        </View>
      </View>
      <ScrollView
        style={styles.scrollViewContainer}
        persistentScrollbar={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.homeContainer}>
          <Card style={styles.card}>
            <ChartComponent />
          </Card>
          <Card style={styles.totalCard}>
            <Text>ယခုနှစ်အတွက်စုစုပေါင်း အမြတ်ငွေ</Text>
            <View style={styles.kyatContainer}>
              <MoneyIcon name="money" size={20} color={COLORS.green} />
              <Text style={styles.profit}>111111 ကျပ်</Text>
            </View>
          </Card>
          <Card style={styles.totalCard}>
            <Text>ယခုနှစ်အတွက်စုစုပေါင်း ကုန်ကျစရိတ်</Text>
            <View style={styles.kyatContainer}>
              <MoneyIcon name="money" size={20} color={COLORS.red} />
              <Text style={styles.cost}>111111 ကျပ်</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},

  headerContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContainer: {
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.green,
  },
  totalCard: {
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
    paddingVertical: 30,
  },
  cost: {
    fontSize: 16,
    color: COLORS.red,
    textAlign: 'right',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  profit: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 10,
    color: COLORS.green,
  },
  kyatContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scrollViewContainer: {
    flex: 1,
    marginBottom: 10,
    paddingBottom: 10,
  },
});

export default HomeScreen;
