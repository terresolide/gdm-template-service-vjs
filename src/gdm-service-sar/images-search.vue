<i18n>{
   "fr": {
	   "acquisition_period": "Période d'acquisition",
	   "band_upper": "BANDE",
	   "choose_area_instructions": "Dessiner sur la carte ou saisir une zone géographique en évitant si possible les surfaces aquatiques et la végétation.",
	   "geographic_area": "Emprise territoriale",
	   "satellite_settings": "Paramètres du satellite",
	   "treatment_level_upper": "NIVEAU DE TRAITEMENT"
   },
   "en": {
	   
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
                <select v-model="satellite" v-if="service && service.imageProviders"  :style="{backgroundColor:shadeColor}">
                   <option disabled value="">SATELLITE</option>
                   <option v-for="(imageProvider, key) in service.imageProviders" :value="key" >{{imageProvider.satellite}}</option>
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
	data () {
		return {
			start: '',
	        startDate: null,
	        end: '',
	        endDate: null,
	        defaultTemporal: {start: null, end: null},
	        email: '',
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
	        startIndex: 1,

		}
	}
	
}
</script>