import * as Font from 'expo-font';

export default useFonts = async () =>
await Font.loadAsync({
    Roboto_Medium: require('../../assets/fonts/Roboto-Medium.ttf'),
});

