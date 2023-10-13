import { useAssets } from 'expo-asset';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

type Props = {
    onInitialized: (zoomToGeoJSONFunc: () => void) => void;
    onMapPress: (coordinates: [number, number]) => void;
};

const Map = (props: Props) => {
    const { onInitialized, onMapPress } = props;

    const [assets] = useAssets([require('../assets/index.html')]);
    const [htmlString, setHtmlString] = useState<string>();

    const dimensions = useWindowDimensions();

    const webViewRef = useRef<WebView | null>();

    const zoomToGeoJSON = () => {
        webViewRef.current?.injectJavaScript('window.zoomToGeoJSON(); true');
    };

    useEffect(() => {
        if (assets) {
            fetch(assets[0].localUri || '')
                .then((res) => res.text())
                .then((html) => {
                    setHtmlString(html);
                    onInitialized(zoomToGeoJSON);
                });
        }
    }, [assets]);

    const messageHandler = (e: WebViewMessageEvent) => {
        const coords = JSON.parse(e.nativeEvent.data) as [number, number];
        onMapPress(coords);
    };

    if (!htmlString) {
        return <></>;
    }

    return (
        <WebView
            ref={(r) => (webViewRef.current = r)}
            injectedJavaScript=''
            source={{
                html: htmlString,
            }}
            javaScriptEnabled
            style={{
                width: dimensions.width,
                height: dimensions.height,
            }}
            scrollEnabled={false}
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scalesPageToFit={false}
            containerStyle={{ flex: 1 }}
            onMessage={messageHandler}
        />
    );
};

export default Map;
