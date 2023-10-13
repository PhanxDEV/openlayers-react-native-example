import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';

import geoJsonData from './geo.json';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

const geoJsonSource = new VectorSource({
    features: new GeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
    }).readFeatures(JSON.stringify(geoJsonData)),
});

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new VectorLayer({
            source: geoJsonSource,
            style: new Style({
                stroke: new Stroke({
                    color: 'red',
                }),
                fill: new Fill({
                    color: 'rgba(255,0,0, 0.15)',
                }),
            }),
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:3857',
    }),
});

window.zoomToGeoJSON = () => {
    map.getView().fit(geoJsonSource.getExtent(), {
        duration: 500,
    });
};

map.on('click', (e) => {
    console.log(`lon: ${e.coordinate[0]}, lat: ${e.coordinate[1]}`);
    window.ReactNativeWebView?.postMessage(JSON.stringify(e.coordinate));
});
