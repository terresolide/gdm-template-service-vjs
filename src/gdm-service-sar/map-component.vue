<template>
	<div>Map component</div>
</template>
<script>
import {LMap, LMarker, LPolygon, LGeoJson, LPopup, LFeatureGroup} from 'vue2-leaflet'

import L from 'leaflet'
require('leaflet-draw')
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import TilesControl from '../leaflet/leaflet.tiles.js'

export default {
	name: 'MapComponent'
}
</script>
<style>
</style>