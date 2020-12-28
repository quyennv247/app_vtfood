import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreen from './src/screens/navigation/MainTabScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import { AuthContext } from './src/components/Context';
import LandingScreen from './src/screens/LandingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userAddress, setUserAddress] = React.useState(null);

  const authContext = React.useMemo(() => ({
      setAddress: async (address, long, lat) => {
        await AsyncStorage.setItem('user_address', address);
        await AsyncStorage.setItem('user_long', long.toString());
        await AsyncStorage.setItem('user_lat', lat.toString());

        setUserAddress(address);
        setIsLoading(false);
      },

      setLogin: async (accessToken, userId, username) => {
        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('login_id', userId);
        await AsyncStorage.setItem('user_name', username);
      },

      getLogin: () => {
        setUserAddress('Đống Đa - Hà Nội');
        setIsLoading(false);
      },

      signOut: () => {
        setUserAddress('Đống Đa - Hà Nội');
        setIsLoading(false);
      }
  }));

  React.useEffect(() => {
    setUserAddress('')
  }, []);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          { userAddress !== '' ? (
              <AppStackScreen/>
            )
          :
            <LandingScreen/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
    
  );
}
