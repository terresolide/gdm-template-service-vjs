<i18n>{
   "fr": {
	   "acquisition_period": "Période d'acquisition",
	   "ascending_upper": "ASCENDANT",
	   "band_upper": "BANDE",
	   "choose_area_instructions": "Dessiner sur la carte ou saisir une zone géographique en évitant si possible les surfaces aquatiques et la végétation.",
	   "descending_upper": "DESCENDANT",
	   "direction_of_orbit_upper": "SENS DE L'ORBITE",
	   "geographic_area": "Emprise territoriale",
	   "platform_type_upper": "TYPE DE PLATEFORME",
	   "polarization_upper": "POLARISATION",
	   "product_type_upper": "TYPE DE PRODUIT",
	   "satellite_settings": "Paramètres du satellite",
	   "sensor_mode_upper": "MODE DU CAPTEUR",
	   "treatment_level_upper": "NIVEAU DE TRAITEMENT"
   },
   "en": {
	   "acquisition_period": "Acquisition period",
	   "ascending_upper": "ASCENDING",
	   "band_upper": "BAND",
	   "choose_area_instructions": "Draw on the map or enter a geographical area avoid, if possible, water surfaces and vegetation.",
	   "descending_upper": "DESCENDING",
	   "direction_of_orbit_upper": "DIRECTION OF THE ORBIT",
	   "geographic_area": "Geographic area",
	   "platform_type_upper": "PLATEFORM TYPE",
	   "polarization_upper": "POLARIZATION",
	   "product_type_upper": "PRODUCT TYPE",
	   "satellite_settings": "Sattelite settings",
	   "sensor_mode_upper": "SENSOR MODE",
	   "treatment_level_upper": "TREATMENT LEVEL"
   }	
}
</i18n>
<template>
   <div class="search-images-content">
      <h4 :style="{color: color}">{{$t('geographic_area')}}</h4>
      <span>{{$t('choose_area_instructions')}}</span>
      <gdm-spatial-search  :lang="lang" :color="color"></gdm-spatial-search>  
      <h4 :style="{color:color}">{{$t('acquisition_period')}}</h4>
     <!--   <div class="datepick">
       <div :style="{color:color}" >{{$t('start')}} : </div>
        <datepicker  v-model="start" @closed="getDates()">
        </datepicker> <span v-if="start" class="fa fa-button fa-close" @click="resetDate('start')"></span>
      </div> -->
      <div style="width:250px;">
       <formater-temporal-search name="temporal" :lang="lang"  daymin="2014-06-14" :color="color"
       :defaultFrom="defaultTemporal.start" :defaultTo="defaultTemporal.end"@change="dateChange"></formater-temporal-search>
       </div>
      
      <h4 :style="{color:color}" >{{$t('satellite_settings')}}</h4>
      
      <div class="gdm-select">
        <select v-model="satellite"  :style="{backgroundColor:shadeColor}">
           <option disabled value="">SATELLITE</option>
           <option >SENTINEL-1</option>
        </select>
      </div>
      <div class="gdm-select">
        <select v-model="instrument" :style="{backgroundColor:shadeColor}">
           <option disabled value="">INSTRUMENT</option>
           <option value="SAR-C%20SAR" selected="true">SAR {{$t('band_upper')}} C</option>
        </select>
      </div>
      <div class="gdm-select">
        <select v-model="treatment"  :style="{backgroundColor:shadeColor}">
           <option disabled value="">{{$t('treatment_level_upper')}}</option>
           <option value="LEVEL1" selected="true">LEVEL1</option>
        </select>
      </div>
      <div class="gdm-select">
        <select v-model="product"  :style="{backgroundColor:shadeColor}">
          <option disabled value="">{{$t('product_type_upper')}}</option>
          <option value="SLC" selected="true">SLC</option>
        </select>
      </div>
      <!-- Sandrine -->
      <div class="gdm-select">
        <select v-model="platform" @change="getImages('platform')"  :style="{backgroundColor:shadeColor}">
          <option value=""><i>{{$t('platform_type_upper')}}</i></option>
          <option value="S1A" >S1A</option>
          <option value="S1B">S1B</option>
        </select>
      </div>
      <div class="gdm-select">
        <select v-model="sensorMode" @change="getImages('sensor')"  :style="{backgroundColor:shadeColor}">
          <option disabled value="">{{$t('sensor_mode_upper')}}</option>
          <option value="IW" selected="true">IW</option>
          <option value="SM" disabled selected="false">SM</option>
        </select>
      </div>
      <div v-if="mode === 'serie'" class="gdm-select"  >
        <select v-model="polarizationType"  :style="{backgroundColor:shadeColor}">
          <option disabled value="" selected="false">{{$t('polarization_upper')}}</option>
          <option value="vv" :disabled="polarizations.indexOf('vv') < 0">VV</option>
          <option value="vh" :disabled="polarizations.indexOf('vh') < 0">VH</option>
          <option value="hh" :disabled="polarizations.indexOf('hh') < 0">HH</option>
          <option value="hv" :disabled="polarizations.indexOf('hv') < 0">HV</option>
        </select>
      </div>
      <div class="gdm-select">
        <select v-model="orbitDirection" @change="getImages('orbitDirection')"  :style="{backgroundColor:shadeColor}">
          <option value="">{{$t('direction_of_orbit_upper')}}</option>
          <option value="ascending" >{{$t('ascending_upper')}}</option>
          <option value="descending" >{{$t('descending_upper')}}</option>
        </select>
      </div>
  </div>
</template>
<script>
export default {
	name: 'ImagesSearch',
	props: {
	  color: {
        type: String,
        default: '#191970'
    },
    lang: {
	    type: String,
      default: 'fr'
    }
	},
	computed: {
		shadeColor () {
		   return this.$shadeColor(this.color, 0.8)
		}
	},
	data () {
		return {
			start: '',
	        startDate: null,
	        end: '',
	        endDate: null,
	        defaultTemporal: {start: null, end: null},
	        satellite: 'SENTINEL-1',
	        instrument: 'SAR-C%20SAR',
	        treatment: 'LEVEL1',
	        orbite: 'Ascendant',
	        polarisation: 'Ascendant',
	        product: 'SLC',
	        platform: '',
	        sensorMode: 'IW',
	        polarizationType: 'vv',
	        polarizations: ['vv'],
	        orbitDirection: '',
	        // orbiteRelative: '',
	        startIndex: 1
		}
	},
	created () {
		this.$i18n.locale = this.lang
	},
	methods: {
    dateChange () {
      
    }
  }
	
}
</script>
<style scoped>
.gdm-select {
  position:relative;
  display: inline-block;
  vertical-align: top;
  width:304px;
 }
.gdm-select select {
  border: 0;
  border-radius: 1px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: rgba(172, 220, 238, 0.3);
  width:calc(100% - 7px);
}
.gdm-select::before, .gdm-select::after {
  content: "";
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
}
.gdm-select::after{
  content: "\25BC";
  height: 1em;
  font-size: .625em;
  line-height: 1;
  right: 1.2em;
  top: 50%;
  margin-top: -.5em;
}
.gdm-select::before {
  width: 2em;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 0 3px 3px 0;
}
.gdm-select option{
  white-space: initial;
  -ms-line-break:auto;
  line-break: auto;
  word-wrap: break-word;      
  height: auto;
  padding: .1em 0;
  max-width:calc(100% - 30px);
}
.gdm-select.disable {
  pointer-events: none;
  opacity:0.8;
}

.gdm-select select {
  font-size: inherit; 
  padding: .3em 0 .3em .5em; 
  margin: 0 0 2px 0; 
  width: 304px;
}

.gdm-select select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: rgba(172,220,238,.3);
  border: 0;
  border-radius: 1px;
  width: calc(100% - 7px);
}
</style>