import React from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeBottomTabScreenProps } from '@bottom-tabs/react-navigation';
import {
  Avatar,
  Card,
  Button,
  Divider,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';
import { TabsParamList } from '../navigation/TabsNavigator';
import { HomeStackParamList } from '../navigation/HomeNavigator';
import upcomingBookings from '../data/upcomingBookings.json';
import newProducts from '../data/newProducts.json';
import recentNews from '../data/recentNews.json';
import recentArticles from '../data/recentArticles.json';
// import { ThemeProvider, Button as MbbButton, Typo, QuickActions } from "mbb-ui-kit/src";

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList>,
  NativeBottomTabScreenProps<TabsParamList, 'HomeNavigator'>
>;

const renderUpcoming = ({ item }: any) => (
  <Card mode="contained">
    <Card.Title
      titleVariant="titleMedium"
      subtitleVariant="bodyMedium"
      title={`${item.title} • ${item.provider}`}
      subtitle={`${item.date} ${item.time}`}
      left={props => <Avatar.Icon {...props} icon="calendar" />}
    />
    <Card.Actions>
      <Button mode="text" onPress={() => { }}>
        Cancel
      </Button>
      <Button mode="contained" onPress={() => { }}>
        Reschedule
      </Button>
    </Card.Actions>
  </Card>
);

const renderProduct: ListRenderItem<any> = ({ item, index }) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{ uri: `${item.image}?${index}` }} />
    <Card.Content>
      <Title>{`${item.name} • $${item.price}`}</Title>
      <Paragraph numberOfLines={1}>{item.description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={() => { }}>To Wishlist</Button>
      <Button onPress={() => { }}>Buy</Button>
    </Card.Actions>
  </Card>
);

const renderArticle: ListRenderItem<any> = ({ item, index }) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{ uri: `${item.image}?${index}` }} />
    <Card.Content>
      <Title>{item.title}</Title>
      <Paragraph numberOfLines={3}>{item.content}</Paragraph>
    </Card.Content>
  </Card>
);

const renderDivider = () => <Divider style={styles.divider} />;

const HomeScreen = ({ navigation }: Props) => {
  const quickActions = [
    {
      "id": "s2u",
      "positionIndex": 1,
      "fixed": true,
      "enabled": true,
      "isHighlighted": false,
      "title": "Secure2u",
      "iconFile": "secure2u.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "DashboardStack",
        "screen": "Dashboard",
        "params": {
          "screen": "SecureTAC"
        }
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/secure2u.png"
      }
    },
    {
      "id": "carInsurance",
      "positionIndex": 2,
      "fixed": true,
      "title": "Car Insurance",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "carInsurance.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "More",
        "screen": "Apply",
        "params": {
          "index": 4,
          "title": "Insurance",
          "category": "Car"
        }
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/carInsurance.png"
      }
    },
    {
      "id": "payBill",
      "positionIndex": 3,
      "title": "Pay Bills",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "payBill.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "payBillsModule",
        "screen": "PayBillsLandingScreen"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/payBill.png"
      }
    },
    {
      "id": "transfer",
      "positionIndex": 4,
      "title": "Transfer",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "transfer.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "fundTransferModule",
        "screen": "TransferTabScreen",
        "params": {
          "screenDate": {
            "routeFrom": "Dashboard"
          }
        }
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/transfer.png"
      }
    },
    {
      "id": "tapTrackWin",
      "positionIndex": 5,
      "fixed": true,
      "title": "Get Cashback",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "tapTrackWin.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "GameStack",
        "screen": "TapTrackWin"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/tapTrackWin.png"
      }
    },
    {
      "id": "samaSamaLokalCampaign",
      "positionIndex": 6,
      "fixed": true,
      "title": "Specialty Coffee!",
      "enabled": true,
      "badge": "NEW",
      "isHighlighted": false,
      "iconFile": "specialtyCoffee.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "SSLStack",
        "screen": "SSLStart"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/specialtyCoffee.png"
      }
    },
    {
      "id": "splitBills",
      "positionIndex": 7,
      "title": "Split Bill",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "splitBill.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "BankingV2Module",
        "screen": "SBDashboard",
        "params": {
          "routeFrom": "DASHBOARD",
          "refId": null,
          "activeTabIndex": 1
        }
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/splitBill.png"
      }
    },
    {
      "id": "movie",
      "positionIndex": 8,
      "title": "Movies & Leisure",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "movieTicket.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "TicketStack",
        "screen": "WetixInAppBrowser",
        "params": {
          "routeFrom": "Dashboard"
        }
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/movieTicket.png"
      }
    },
    {
      "id": "reload",
      "positionIndex": 9,
      "title": "Reload",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "reload.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "mobileReloadModule",
        "screen": "ReloadSelectTelco"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/reload.png"
      }
    },
    {
      "id": "payCard",
      "positionIndex": 10,
      "title": "Pay Card",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "payCard.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "payCardsModule",
        "screen": "PayCardsAdd"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/payCard.png"
      }
    },
    {
      "id": "sendRequest",
      "positionIndex": 11,
      "title": "Send & Request",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "sendRequestMoney.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "sendRequestMoneyStack",
        "screen": "SendRequestMoneyDashboard"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/sendRequestMoney.png"
      }
    },
    {
      "id": "motorcycleInsurance",
      "positionIndex": 12,
      "title": "Motorcycle Insurance",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "motorInsurance.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "More",
        "screen": "Apply",
        "params": {
          "index": 4,
          "title": "Insurance",
          "category": "Motorcycle"
        }
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/motorInsurance.png"
      }
    },
    {
      "id": "erl",
      "positionIndex": 13,
      "title": "KLIA Ekspres",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "kliaEkspres.png",
      "requireOnboard": true,
      "navigateTo": {
        "module": "KliaEkspressStack",
        "screen": "KliaEkspressDashboard"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/kliaEkspres.png"
      }
    },
    {
      "id": "home2u",
      "positionIndex": 14,
      "title": "Home²u",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "home2u.png",
      "requireOnboard": false,
      "navigateTo": {
        "module": "BankingV2Module",
        "screen": "PropertyDashboard"
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/home2u.png"
      }
    },
    {
      "id": "articles",
      "positionIndex": 15,
      "title": "Articles",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "articles.png",
      "requireOnboard": false,
      "navigateTo": {
        "module": "promosModule",
        "screen": "PromotionsDashboardScreen",
        "params": {
          "article": true
        }
      },
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/articles.png"
      }
    },
    {
      "id": "customise",
      "positionIndex": 16,
      "fixed": true,
      "title": "Customise",
      "enabled": true,
      "isHighlighted": false,
      "iconFile": "customise.png",
      "requireOnboard": true,
      "icon": {
        "uri": "https://campaigns-nonprod.maybanksandbox.com/contentConfig/MY/uat/v0.9.38/AppIcons/assets/customise.png"
      }
    }
  ].map(i=> ({...i, onPress: ()=> Alert.alert(i.title)}));

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic">
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
        {/* <Typo type="p2" weight="500" align="center">
          Centered semibold text
        </Typo>
        <MbbButton label="Press Me" onPress={() => Alert.alert("Pressed!")} />
        <QuickActions
          isLoading={false}
          header={{
            cells: [
              { title: "Quick Actions" },
              {
                title: "See All",
                onPress: () => Alert.alert("See All tapped"),
                textStyle: { color: "#007AFF" },
              },
            ],
          }}
          quickActions={quickActions}
        /> */}
      </View>
      {/* <ThemeProvider theme={{ primary: "#6200ee", text: "#fff" }}>

      </ThemeProvider> */}
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Upcoming Appointments
        </Text>
        <Button
          compact
          mode="contained-tonal"
          onPress={() => navigation.navigate('Upcoming')}
          style={styles.button}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={upcomingBookings.data}
        renderItem={renderUpcoming}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          New Products
        </Text>
        <Button
          compact
          mode="contained-tonal"
          onPress={() => { }}
          style={styles.button}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={newProducts.data}
        renderItem={renderProduct}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Recent News
        </Text>
        <Button
          compact
          mode="contained-tonal"
          onPress={() => { }}
          style={styles.button}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentNews.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Recent Articles
        </Text>
        <Button
          compact
          mode="contained-tonal"
          onPress={() => { }}
          style={styles.button}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentArticles.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: 'transparent',
    width: 16,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  cardWidth: {
    width: 270,
  },
});

export default HomeScreen;
