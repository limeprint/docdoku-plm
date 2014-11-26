/*global _,require,window*/
var App = {
    debug: false,

    setDebug:function(state){
        'use strict';
        App.debug = state;
        if(state){
            $('body').addClass('debug');
        }else{
            $('body').removeClass('debug');
        }
    },

	config:{
		workspaceId: /^#([^/]+)/.exec(window.location.hash)[1] || null,
		productId: window.location.hash.split('/')[1] || null,
		login: '',
		groups: [],
		contextPath: '',
		locale: localStorage.getItem('locale') || 'en'
	},

    WorkerManagedValues: {
        maxInstances: 500,
        maxAngle: Math.PI / 4,
        maxDist: 100000,
        minProjectedSize: 0.000001,//100,
        distanceRating: 0.6,//0.7,
        angleRating: 0.4,//0.6,//0.5,
        volRating: 1.0//0.7
    },

    SceneOptions: {
        grid: false,
        zoomSpeed: 1.2,
        rotateSpeed: 1.0,
        panSpeed: 0.3,
        cameraNear: 1,
        cameraFar: 5E4,
        defaultCameraPosition: {x: -1000, y: 800, z: 1100},
        defaultTargetPosition: {x: 0, y: 0, z: 0},
        ambientLightColor:0x101030,
        cameraLightColor:0xbcbcbc,
        transformControls:true
    }

};

App.log=function(message,colorType){
    'use strict';
    if(App.debug){
        if(colorType){
            switch (colorType) {
                case 'WS' :
                    window.console.log('%c [WS] ' + message, 'background: #222; color: #bada55','background: none; color:inherit');
                    break;
                case 'IM' :
                    window.console.log('%c [InstancesManager] ' + message, 'background: #206963; color: #bada55','background: none; color:inherit');
                    break;
                case 'SM' :
                    window.console.log('%c [SceneManager] ' + message, 'background: #275217; color: #bada55','background: none; color:inherit');
                    break;
                case 'PTV' :
                    window.console.log('%c [PartsTreeView] ' + message, 'background: #3C4C52; color: #bada55','background: none; color:inherit');
                    break;
                default :
                    window.console.log(message, 'background: #888; color: #bada55','background: none; color:inherit');
                    break;
            }
        }else{
            window.console.log(message);
        }
    }
};

require.config({
    baseUrl: '../js/product-structure',
    shim: {
        jqueryUI: { deps: ['jquery'], exports: 'jQuery' },
        effects: { deps: ['jquery'], exports: 'jQuery' },
        bootstrap:{ deps: ['jquery','jqueryUI'], exports: 'jQuery' },
        datatables:{ deps: ['jquery'], exports: 'jQuery' },
        backbone: {deps: ['underscore', 'jquery'],exports: 'Backbone'},
        bootstrapCombobox:{deps:["jquery"],exports:"jQuery"},
        bootstrapSwitch:{deps:['jquery'],exports:'jQuery'},
        pointerlockcontrols:{deps:['threecore'],exports:'THREE'},
        trackballcontrols:{deps:['threecore'],exports:'THREE'},
        orbitcontrols:{deps:['threecore'],exports:'THREE'},
        transformcontrols:{deps:['threecore'],exports:'THREE'},
        binaryloader:{deps:['threecore'],exports:'THREE'},
        colladaloader:{deps:['threecore'],exports:'THREE'},
        stlloader:{deps:['threecore'],exports:'THREE'},
        buffergeometryutils:{deps:['threecore'],exports:'THREE'},
        oculusRiftEffect:{deps:['threecore'],exports:'THREE'}
    },
    paths: {
        jquery: '../../bower_components/jquery/jquery',
        backbone: '../../bower_components/backbone/backbone',
        underscore: '../../bower_components/underscore/underscore',
        mustache: '../../bower_components/mustache/mustache',
        text: '../../bower_components/requirejs-text/text',
        i18n: '../../bower_components/requirejs-i18n/i18n',
        buzz: '../../bower_components/buzz/dist/buzz',
        bootstrap:'../../bower_components/bootstrap/docs/assets/js/bootstrap',
        datatables:'../../bower_components/datatables/media/js/jquery.dataTables',
        threecore:'../../bower_components/threejs/build/three',
        jqueryUI: '../../bower_components/jqueryui/ui/jquery-ui',
        async: '../../bower_components/async/lib/async',
        tween:'../../bower_components/tweenjs/src/Tween',
        bootstrapCombobox:'../../bower_components/bootstrap-combobox/js/bootstrap-combobox',
        bootstrapSwitch:'../../bower_components/bootstrap-switch/static/js/bootstrap-switch',
        date:'../../bower_components/date.format/date.format',
        dat:'../../bower_components/dat.gui/dat.gui',
        localization: '../localization',
        modules: '../modules',
        'common-objects': '../common-objects',
        userPopover:'modules/user-popover-module/app',
        effects:'../lib/effects',
        datatablesOsortExt: '../lib/datatables.oSort.ext',
        stringprototype:'../lib/string.prototype',
        pointerlockcontrols:'dmu/controls/PointerLockControls',
        trackballcontrols:'dmu/controls/TrackballControls',
        orbitcontrols:'dmu/controls/OrbitControls',
        transformcontrols:'dmu/controls/TransformControls',
        binaryloader:'dmu/loaders/BinaryLoader',
        colladaloader:'dmu/loaders/ColladaLoader',
        stlloader:'dmu/loaders/STLLoader',
        buffergeometryutils: 'dmu/utils/BufferGeometryUtils',
        stats:'dmu/utils/Stats',
        oculusRiftEffect:'dmu/utils/OculusRiftEffect'
    },

    deps:[
        'jquery',
        'underscore',
        'date',
        'jqueryUI',
        'bootstrap',
        'effects',
        'datatables',
        'datatablesOsortExt',
        'bootstrapCombobox',
        'bootstrapSwitch',
        'stringprototype',
        'threecore',
        'pointerlockcontrols',
        'trackballcontrols',
        'orbitcontrols',
        'transformcontrols',
        'binaryloader',
        'colladaloader',
        'stlloader',
        'buffergeometryutils',
        'stats',
        'dat',
        'tween',
        'oculusRiftEffect'
    ],
    config: {
        i18n: {
            locale: (function(){
	            'use strict';
                try{
                    return App.config.locale;
                }catch(ex){
                    return 'en';
                }
            })()
        }
    }
});

require(['common-objects/contextResolver','i18n!localization/nls/common','i18n!localization/nls/product-structure'],
    function (ContextResolver,  commonStrings, productStructureStrings) {
	    'use strict';
        App.config.i18n = _.extend(commonStrings,productStructureStrings);
        ContextResolver.resolve(function(){
            require(['backbone','app','router','common-objects/views/header','modules/all'],function(Backbone, AppView, Router,HeaderView,Modules){
                App.appView = new AppView().render();
                App.headerView = new HeaderView().render();
                App.router = Router.getInstance();
                App.coworkersView = new Modules.CoWorkersAccessModuleView().render();
                Backbone.history.start();
            });
        });
    });
