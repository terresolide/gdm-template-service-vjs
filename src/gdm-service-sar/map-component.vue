<template>
	<div class="map-container" style="position:relative;" :style="{height: mapHeight + 'px'}">
      <div id="map"  >

        <v-map style="height: 100%" ref="map" :zoom="zoom" :center="center" :cursor="true" :options="{scrollWheelZoom: false}" @click="addUnwMarker">
          <v-marker ref="unwmarker" v-if="unwMarker" :lat-lng="unwMarker" :draggable="true" @dragstart="unwMarkerDragstart" @dragend="unwMarkerDragend">
              <v-popup>
               <div>{{$t('unwrapping_point')}}</div>
                <span class="button" @click="removeUnwMarker" >{{$t('remove')}}</span>
              </v-popup>
          </v-marker>
            <l-feature-group ref="bbox" :visible="true" layer-type="overlay" name="bbox" @add="layerGroupChange('bbox', $event)" @remove="layerGroupChange('bbox', $event)">
           </l-feature-group>
          <l-feature-group ref="images" :visible=" true" layer-type="overlay" name="image" @add="layerGroupChange('image', $event)" @remove="layerGroupChange('image', $event)">
         
            <v-geojson-layer v-if="groups.length === 0"  v-for="item in displayedImages" :key="item.id" :geojson="item"></v-geojson-layer>
            <v-geojson-layer v-if="groups.length > 0 && shownImages.indexOf(item.id) >= 0"  v-for="item in displayedImages" :key="item.id" :geojson="item" 
            :visible="true" :options="{color: '#3388ff', fillColor: '#3388ff'}">
            </v-geojson-layer>
             <v-geojson-layer v-if="showRemovedGeometry && removedImages[currentRemovedImage]"   :geojson="removedImages[currentRemovedImage]" 
            :visible="true" :options="{color: '#804ea3', fillColor: '#804ea3'}">
            </v-geojson-layer>
          </l-feature-group>
        <l-feature-group ref="displayedgroup" :visible="true"  layer-type="overlay" name="orbit" @add="layerGroupChange('orbit', $event)" @remove="layerGroupChange('orbit', $event)">
         
           <v-geojson-layer v-for="(feature, index) in displayedGroups" :geojson="feature" :key="index" :options="{color: 'orange', fillColor: 'orange', fillOpacity: 0.2}"></v-geojson-layer>
        <!--   <v-rectangle v-for="item in rectangles" :key="item.id" :bounds="item.bounds" :color="item.color" :fillColor="item.color"></v-rectangle> -->
        </l-feature-group>
         <l-feature-group ref="intersection" :visible="true"  layer-type="overlay" name="intersection" @add="layerGroupChange('intersection', $event)" @remove="layerGroupChange('intersection', $event)">
           <v-geojson-layer ref="intersection" v-if="displayedIntersection" :geojson="displayedIntersection"
            :options="{color: 'green', fillColor: 'green'}" >
           </v-geojson-layer>
         </l-feature-group>
          
            <!--<v-tooltip :content='TOOLTIP'></v-tooltip>-->
        </v-map>
      <div class="gdm-mouseposition" >{{mouseposition}}</div>
    </div>
  </div>
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
	name: 'MapComponent',
	props: {
    displayedImages: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 500
    },
    removedImages: {
      type: Array,
      default: () => []
    }
  },
	components: {
     'v-map': LMap,
      'v-geojson-layer': LGeoJson,
      'v-marker': LMarker,
      'v-popup': LPopup,
      'v-polygon': LPolygon,
      LFeatureGroup

  },
  data () {
    return {
      drawControl: null,
      drawnBbox: null,
      layerControl: null,
      mapHeight: 500,
      mapObject: null,
      mousePosition: null,
      unwMarker: null,
      unwMarkerStart: null,
        

    }
  },
  mounted () {
    this.mapObject = this.$refs.map.mapObject
    this.mapObject.scrollWheelZoom.enable()
    this.$nextTick(() => {
      this.initLeafletDraw()
      // this.layerControl.addOverlay(this.drawnBbox, this.$i18n.t('bbox'))
      // this.layerControl.addOverlay(this.$refs.images.mapObject, this.$i18n.t('image_footprint'))
      // this.layerControl.addOverlay(this.$refs.displayedgroup.mapObject, this.$i18n.t('orbit_footprints'))
      // this.layerControl.addOverlay(this.$refs.intersection.mapObject, this.$i18n.t('final_footprint'))

    })

  },
  methods: {
    initLeafletDraw () {
       this.drawnBbox = this.$refs.bbox.mapObject
        // this.mapObject.addLayer(this.drawnBbox)
        this.drawControl = new L.Control.Draw({
          draw: {
            rectangle: {
              shapeOptions: {
                color: 'red',
                opacity: 1,
                weight: 2
              }
            },
            circlemarker: false,
            circle: false,
            marker: false,
            polygon: false,
            polyline: false
          },
          edit: {
            featureGroup: this.drawnBbox
          }
        })
        if (this.$i18n.locale === 'fr') {
          L.drawLocal = require('formater-commons-components-vjs/src/leaflet/leaflet.draw.fr.js')
        }
        this.mapObject.addControl(this.drawControl)
        let _this = this // SM
        this.layerControl = new TilesControl(null, null, {position: 'topright'})
        this.layerControl.tiles.arcgisTopo.layer.addTo(this.mapObject)
        this.layerControl.addTo(this.mapObject)
        this.mapObject.on('mousemove', function (e) {
          var lat = Math.round(e.latlng.lat * 10000) / 10000
          var lng = Math.round(e.latlng.lng * 10000) / 10000
          _this.mouseposition = 'Latlng(' + lat + ', ' + lng + ')'
        })
        this.mapObject.on('mouseout', function (e) {
          _this.mouseposition = null
        })
   
        this.mapObject.on(L.Draw.Event.CREATED, function (e) {
          let layer = e.layer
          let bounds = e.layer.getBounds()
          bounds = L.checkBounds(bounds)
          layer.setBounds(bounds)
          let newArea = {'bounds': [[bounds.getNorth(), bounds.getEast()], [bounds.getSouth(), bounds.getWest()]], 'color': 'red'}
          this.rectangle = newArea
          var bbox = {
              north: bounds.getNorth(),
              south: bounds.getSouth(),
              east: bounds.getEast(),
              west: bounds.getWest()
            }
         //  e.layer.bindPopup('Zone de sélection')
          var event = new CustomEvent('fmt:selectAreaChange', {detail: bbox})
          Usgs.setParams({bbox: bbox})
          document.dispatchEvent(event)
          var event2 = new CustomEvent('bboxChange', {detail: {
            minlat: bounds.getSouth(),
            minlon: bounds.getWest(),
            maxlat: bounds.getNorth(),
            maxlon: bounds.getEast()
          }})
          document.dispatchEvent(event2)
          _this.drawnBbox.clearLayers()
          _this.drawnBbox.addLayer(layer)
          _this.bbox = layer
          _this.featureFilter = null
          _this.removedImages = []
          this.fitBounds(bounds, {padding: [100, 100], maxZoom: 7})
          _this.clearMap()
          _this.getImages('bbox') // Relance automatique des images avec les critères généraux de recherche
        })
        this.mapObject.on(L.Draw.Event.EDITED, function (e) {
          let bounds
          e.layers.eachLayer(function (layer) {
            bounds = layer.getBounds()
            bounds = L.checkBounds(bounds)
            layer.setBounds(bounds)
            _this.bbox = layer
          })
          _this.featureFilter = null
          _this.removedImages = []
          let newArea = {'bounds': [[bounds.getNorth(), bounds.getEast()], [bounds.getSouth(), bounds.getWest()]], 'color': 'red'}
          this.rectangle = newArea
          var bbox = {
              north: bounds.getNorth(),
              south: bounds.getSouth(),
              east: bounds.getEast(),
              west: bounds.getWest()
            }
          var event = new CustomEvent('fmt:selectAreaChange', {detail: bbox})
          document.dispatchEvent(event)
          // Usgs.setParams({bbox: bbox})
          var event2 = new CustomEvent('bboxChange', {detail: {
            minlat: bounds.getSouth(),
            minlon: bounds.getWest(),
            maxlat: bounds.getNorth(),
            maxlon: bounds.getEast()
          }})
          document.dispatchEvent(event2)
          this.fitBounds(bounds, {padding: [100, 100], maxZoom: 7})
          _this.clearMap()
          _this.getImages('bbox') // Relance automatique des images avec les critères généraux de recherche
        })
        
        this.mapObject.on(L.Draw.Event.DELETESTART, function (event) {
          // this.cursor.disable()
          _this.drawnBbox.eachLayer(function (layer) {
            layer.bringToFront()
          })
        })

        this.mapObject.on(L.Draw.Event.EDITSTART, function (e) {
          _this.drawnBbox.eachLayer(function (layer) {
            layer.bringToFront()
          })
        })
        this.mapObject.on(L.Draw.Event.DELETED, function (e) {
          let bounds
          e.layers.eachLayer(function (layer) {
           //  console.log(layer.getBounds())
            bounds = layer.getBounds()
          })
          _this.featureFilter = null
          _this.removedImages = []
//           let newArea = {'bounds': [[bounds.getNorth(), bounds.getEast()], [bounds.getSouth(), bounds.getWest()]], 'color': 'red'}
//           this.rectangle = newArea
          _this.bbox = null
          _this.clearMap()
          // _this.mapObject.rectangle.remove()  // commentaire car le permet plus de supprimer le polygone
          _this.mapObject.rectangle = undefined
          var event = new CustomEvent('bboxChange', {detail: {
            minlat: '',
            minlon: '',
            maxlat: '',
            maxlon: ''
          }})
          Usgs.setParams({bbox: null})
          document.dispatchEvent(event)
          var event2 = new CustomEvent('aerisResetEvent')
          document.dispatchEvent(event2)
        })
        // this.getQuota()

    }
  }
}
</script>
<style src="leaflet/dist/leaflet.css"></style>
<style src="leaflet-draw/dist/leaflet.draw.css"></style>
<style scoped>
   #map {
    position: absolute;
    height:100%;
    width:100%;
    z-index:0;
  }

  .gdm-mouseposition {
     position:absolute;
     bottom:0px;
     left:3px;
     font-size:11px;
     padding: 0 5px;
     color: #333;
     z-index:1;
     background: rgba(255, 255, 255, 0.7);
   }

</style>