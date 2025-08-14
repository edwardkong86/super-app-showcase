import React, { useState, useRef } from 'react';
import { Alert, ScrollView, Text, View, StyleSheet, Platform, Dimensions } from 'react-native';
import Animated, { useAnimatedRef, useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { CacheeImage } from "cachee";
import { ThemeProvider, Button as MbbButton, Typo, QuickActions } from "@mss-engineering/mbb-ui-kit";

import assets from "../assets";
const { width, height } = Dimensions.get('window');

export const ParallaxExample = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const imageHeight = width * 0.69066667;
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

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
  const carouselImages = [
    assets.topSection.background5,
    assets.topSection.background1,
    assets.topSection.background2,
    assets.topSection.background3,
    assets.topSection.background4,
    assets.topSection.background,
    // Add more images from your assets or use URLs:
    // assets.topSection.background2,
    // assets.topSection.background3,
    // { uri: "https://your-image-url.jpg" },
  ];
  
  return (
	<ThemeProvider>
    <View style={styles.container}>
      <Animated.ScrollView
	      bounces={false}
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        // onScroll={handleParentScroll}
        scrollEventThrottle={10}
        ref={scrollRef}
      >
        <Carousel
            ref={ref}
            width={width}
            height={imageHeight}
            data={carouselImages}
            onProgressChange={progress}
            renderItem={({ index }) => (
              <CacheeImage
                    key={index}
                    source={carouselImages[index]}
                    resizeMode="cover"
                    style={{
                      width: width,
                      height: imageHeight,
                    }}
                  />
            
            )}
          />
		
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
        />
      </Animated.ScrollView>
    </View>
	</ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
	paddingBottom: Platform.OS === 'ios' ? 60 : 20,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  parallaxContainer: {
    height: 220,
    backgroundColor: '#87CEEB',
    borderBottomWidth: 1,
    borderBottomColor: '#87CEEB',
  },
  parallaxContent: {
    width: '94%',
    marginLeft: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parallaxText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollViewContainer: {
    height: 750,
    backgroundColor: '#F0F8FF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    margin: 30,
  },
  scrollText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333333',
  },
  // New carousel styles
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});


export default ParallaxExample;