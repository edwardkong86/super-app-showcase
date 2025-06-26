import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Searchbar} from 'react-native-paper';

const SearchScreen = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    searchbar: {
      margin: 16,
    },
  });

  const onChangeSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [],
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        iconColor={colors.primary50}
        style={styles.searchbar}
      />
    </View>
  );
};



export default SearchScreen;
