import React, { useState } from 'react';
import { Alert, ScrollView, Text, View, StyleSheet, Platform, Dimensions } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { CacheeImage } from "cachee";
import { ThemeProvider, Button as MbbButton, Typo, QuickActions } from "mbb-ui-kit";

import assets from "../assets";
const { width, height } = Dimensions.get('window');
export const ParallaxExample = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [isChildReachToBottom, setIsChildReachToBottom] = useState(false);
  const [isChildScrollable, setIsChildScrollable] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

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

  
  const handleParentScroll = (event) => {
    const { contentSize, contentOffset, layoutMeasurement } = event.nativeEvent;
    const contentHeight = contentSize.height;
    const scrollOffsetY = contentOffset.y;
    const layoutHeight = layoutMeasurement.height;

    if (scrollOffsetY <= 0) {
      setIsChildReachToBottom(false);
      setShowHeader(true);
    }
    if (Math.trunc(scrollOffsetY + layoutHeight) >= Math.trunc(contentHeight)) {
      setShowHeader(false);
      setIsChildScrollable(true);
    }
  };

  const handleChildScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollOffsetY = contentOffset.y;
    const contentHeight = contentSize.height;
    const layoutHeight = layoutMeasurement.height;

    if (scrollOffsetY + layoutHeight >= contentHeight) {
      setIsChildReachToBottom(true);
    }

    if (scrollOffsetY <= 0 && isChildReachToBottom) {
      setIsChildScrollable(false);
    }
  };

  return (
	<ThemeProvider>
    <View style={styles.container}>
      <Animated.ScrollView
	    bounces={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleParentScroll}
        scrollEventThrottle={10}
        ref={scrollRef}
      >
		<View style={{marginBottom: 10}}>
			<CacheeImage
				source={assets.topSection.background}
				resizeMode="cover"
				style={{
					width: width,
					height: width * 0.69066667,

					}}
				/>
			<View style={{position:'absolute', zIndex:10, width, 
				// backgroundColor:"green",
				bottom:0, left: 0, height: (width * 0.69066667) - 100,
				justifyContent: 'center', alignItems:"center"}}>
				
			</View>
		</View>
		
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
        <Animated.View style={styles.parallaxContainer}>
          <View style={styles.parallaxContent}>
            <Text style={styles.parallaxText}>Parallax Section</Text>
          </View>
        </Animated.View>

        <View style={styles.scrollViewContainer}>
          <ScrollView
            style={styles.scrollView}
            onScroll={handleChildScroll}
            scrollEnabled={isChildScrollable}
            nestedScrollEnabled
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={20}
          >
            <View style={styles.scrollContent}>

              <Text style={styles.scrollText}>Scrollable Section</Text>
              <Text style={styles.scrollText}>Scrollable Section</Text>
              <Text style={styles.scrollText}>Scrollable Section</Text>
            </View>
          </ScrollView>
        </View>
      </Animated.ScrollView>

	  	<View style={{position:'absolute', zIndex:5, width, maxHeight: 100, overflow: 'hidden'}}>
			<CacheeImage
				source={assets.topSection.background}
				resizeMode="cover"
				style={{
					width: width,
					height: width * 0.69066667,
					}}
				/>
			<View style={{position:'absolute', zIndex:10, width, 
				top:0, left: 0, height: 100, paddingBottom: 8, paddingHorizontal:24,
				justifyContent: 'space-between', flexDirection:"row", alignItems:"flex-end"}}>
				
			</View>
		</View>
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
});


export default ParallaxExample;