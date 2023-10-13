import { StatusBar } from 'expo-status-bar';
import {
    Alert,
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Map from './components/Map';
import { useRef } from 'react';

export default function App() {
    const zoomToGeoJSONFuncRef = useRef<() => void>();

    const mapPressHandler = (coordinates: [number, number]) => {
        Alert.alert(
            'Map press',
            `You pressed at position ${coordinates[0]}/${coordinates[1]}`
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Map
                onInitialized={(zoomToGeoJSON) =>
                    (zoomToGeoJSONFuncRef.current = zoomToGeoJSON)
                }
                onMapPress={mapPressHandler}
            />
            <Button
                title='Zoom to GeoJSON'
                onPress={() => zoomToGeoJSONFuncRef.current?.()}
            />
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
