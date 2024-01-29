// require("exports-loader?!./l.min.js")

import Vue from 'vue';

import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

//pour la traduction 
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

//pour les requêtes
import VueResource from 'vue-resource';
Vue.use(VueResource);

// en particulier pour les fonctions sur les couleurs
 import {VueTools} from 'formater-commons-components-vjs'
 Vue.use(VueTools)

// lazy loading des composants

Vue.customElement('gdm-service-sar', () => new Promise((resolve) => {
    require(['./gdm-service-sar.vue'], (GdmServiceSar) => resolve(GdmServiceSar.default))
}))
Vue.customElement('gdm-service-default', () => new Promise((resolve) => {
    require(['./gdm-service-default.vue'], (GdmServiceDefault) => resolve(GdmServiceDefault.default))
}))  
 
    	  
