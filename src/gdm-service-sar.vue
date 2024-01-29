<i18n>{
  "en": {
     "bottom_page": "Go to bottom",
     "compute_parameters": "Compute parameters",
     "search_images": "Image search",
     "top_images": "Go to images view",
     "top_page": "Go to top"
  },
  "fr": {
     "bottom_page": "Bas de page",
     "compute_parameters": "Paramètres de calcul",
     "search_images": "Recherche des images",
     "top_images": "Vers les images",
     "top_page": "Vers le haut de page"
  }
}
</i18n>
<template>
<div class="gdm-service-sar">
  <!-- LES ELEMENTS "FIXED" -->
  <!-- les boutons/flêches pour remonter en haut -->
    <div v-show="dimensions.isScrolled" class="gdm-top fa fa-angle-double-up" @click="goToTop" :title="$t('top_page')"></div>
    <div v-show="!dimensions.isMaxScrolled" class="gdm-top-down fa fa-angle-double-down" @click="scrollTopImages"
     :title="displayedImages.length > 0 ? $t('top_images') : $t('bottom_page')"></div>
    
    <!-- Les messages à afficher -->
    <gdm-messages></gdm-messages>
    
    <!-- LE CONTENU -->
    <div id="content">
    <div class="column-left">
      <h2 :style="{color: $shadeColor(color, 0.8), background: color}">{{ service.s_name }}</h2>
      <!-- le formulaire de recherche d'images -->
      <formater-search-box header-icon-class="fa fa-picture-o"  :color="color"
             open-icon-class="fa fa-caret-right" :title="$t('search_images')" :deployed="true" type="empty" >
        <images-search ref="search" :color="color" :lang="lang"></images-search>
      </formater-search-box>
      <!-- les paramètres du job -->
      <formater-search-box  header-icon-class="fa fa-cogs" :color="color"
               open-icon-class="fa fa-caret-right" :title="$t('compute_parameters')" :deployed="true" type="empty" >
            LES PARAMÈTRES DE CALCULS
            </formater-search-box>
    </div>
    <div class="column-right">
      <!-- la carte -->
      <map-component ref="map"></map-component>
      <!-- les actions à exécuter -->
      <actions-component></actions-component>
      <!-- la liste des images -->
      <images-list></images-list>
      
    </div>
  </div>
</div>
</template>
<script>
import { FormaterSearchBox} from 'formater-commons-components-vjs'
import ImagesSearch from './gdm-service-sar/images-search.vue'
import MapComponent from './gdm-service-sar/map-component.vue'
export default {
  name: 'GdmServiceSar',
  components: {
    FormaterSearchBox,
    ImagesSearch,
    MapComponent
    },
  props: {
    color: {
      type: String,
      default: '#191970'
    },
    lang: {
      type: String,
      default: 'fr'
    },
    process: {
      type: Object,
      default: null
    },
    service: {
      type: Object,
      default: () => {
          return { 
            s_name: 'SAR Service'
          }
       }
     }
  },
  data() {
    return {
      // les dimensions des parties
      dimensions: {
        windowHeight: 0,
        defaultMapHeight: 500,
        minMapHeight: 200,
        maxMapHeight: 1000,
        mapHeight: 500,
        imagesHeight: 500,
        isScrolled: false,
        isMaxScrolled: false,
        isImagesScrolled: false
       },
       displayedImages: []
    }
  },
  created () {
    // initialise la langue
    console.log(this.service)
    this.$i18n.locale = this.lang
  },
  methods: {
    goToTop() {
      
    },
    scrollTopImages () {
      
    }
  }
  
}
</script>

<style scoped>
h2 {
  text-transform: uppercase;
  background-color: #191970;
  border-bottom: 1px solid grey;
  -webkit-box-shadow: 0 1px 5px #888;
  box-shadow: 0 1px 5px #888;
  color: #fff;
  margin: 0;
  padding: 20px 0 20px 10px;
}
.column-left .formater-search-box {
  margin: 1px;
  width: 358px;
 }
.column-left {
  background-color: #f8f8f8;
  display: block;
  float: left;
  font-size: 14px;
  height: 100%;
  letter-spacing: .01em;
  line-height: 1;
  margin-left: 3px;
  min-width: 360px;
  overflow: hidden;
  padding: 0;
  width: 20%;
  width: 360px;
}
.column-right {
   display:block;
   height: 100%;
   box-sizing: border-box;
   margin-left: 365px;
   width: calc(100% - 365px);
}
.gdm-top {
  position:fixed;
  left:345px;
  bottom:50px;
  font-size: 1.5rem;
  line-height: 1rem;
}
.gdm-top-down {
  position:fixed;
  left:345px;
  bottom:5px;
  font-size: 1.5rem;
  line-height: 1rem;
}
.gdm-images-top {
   position: fixed;
   right: 20px;
   bottom: 0px;
 }
.gdm-top,
.gdm-images-top,
.gdm-top-down{
   width: 40px;
   height:30px;
   padding-top:10px;
   text-align:center;
   border-radius: 50%;
   background: grey;
   color: white;
   opacity: 0.7;
   cursor: pointer;
   box-sizing:content-box;
   z-index: 1000;
}
.gdm-top:hover,
.gdm-images-top:hover {
   opacity: 1;
}


</style>