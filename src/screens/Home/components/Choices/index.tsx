import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {ChoicesProps} from './types';
import colors from '../../../../utils/colors';

function Choices({data, text, containerStyles}: ChoicesProps): JSX.Element {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.text}>{text}</Text>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {data.map((element, index) => (
          <TouchableOpacity key={`choice_${index}`} style={styles.content}>
            <Image style={styles.image} source={element.image} />
            <Text style={styles.label}>{element.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
  },
  text: {
    alignSelf: 'center',
    marginBottom: 10,
    color: colors.YELLOW,
    fontSize: 18,
    fontWeight: '500',
  },
  contentContainerStyle: {
    gap: 10,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    gap: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  label: {
    color: colors.WHITE,
    fontWeight: '500',
  },
});

export default Choices;
