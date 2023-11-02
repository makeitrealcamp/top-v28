import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 4,
    resizeMode: 'contain',
  },
  header: { flexDirection: 'row', marginBottom: 4 },
  name: { fontWeight: 'bold', marginRight: 8 },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingRight: 24,
  },
});

export default styles;
