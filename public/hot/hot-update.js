webpackHotUpdate("main",{

/***/ "./src/components/container/EditMapContainer.js":
/*!******************************************************!*\
  !*** ./src/components/container/EditMapContainer.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet */ \"./node_modules/leaflet/dist/leaflet-src.js\");\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var leaflet_draw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet-draw */ \"./node_modules/leaflet-draw/dist/leaflet.draw.js\");\n/* harmony import */ var leaflet_draw__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet_draw__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! constants */ \"./node_modules/constants-browserify/constants.json\");\nvar constants__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! constants */ \"./node_modules/constants-browserify/constants.json\", 1);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n//bingmap token: AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0 \n//mapbox token: pk.eyJ1IjoicHRyYW44MTYiLCJhIjoiY2p1dTI3YTNnMDJveDN5bXFjMDd1MG92bCJ9.jSeVTjBT1A_wgh63ETE9Lg\n\n\n\n\n\n\nvar EditMapContainer =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(EditMapContainer, _Component);\n\n  function EditMapContainer() {\n    _classCallCheck(this, EditMapContainer);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(EditMapContainer).apply(this, arguments));\n  }\n\n  _createClass(EditMapContainer, [{\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      var prevCoord = prevProps.streetview;\n      var currCoord = this.props.streetview; //check if any change in coordinate\n\n      if (currCoord[0] !== prevCoord[0] || currCoord[1] !== prevCoord[1]) {\n        this.sv_marker.setLatLng(currCoord);\n      }\n    }\n  }, {\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this = this;\n\n      // create map\n      this.map = leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.map('editMap', {\n        minZoom: 15,\n        maxZoom: 20 // less than or equal 18, cannot be greater than 18\n\n      }).setView(this.props.streetview, 20); // create base map layers and add them to map\n      // reference: https://leafletjs.com/examples/layers-control/\n\n      var streets = leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: 'Data © <a href=\"http://osm.org/copyright\">OpenStreetMap</a>'\n      });\n      var satellite = leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHRyYW44MTYiLCJhIjoiY2p1dTI3YTNnMDJveDN5bXFjMDd1MG92bCJ9.jSeVTjBT1A_wgh63ETE9Lg');\n      var baseMaps = {\n        \"Streets\": streets,\n        \"Satellite\": satellite\n      }; // add base maps, overlays is null\n\n      leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.control.layers(baseMaps, null, {\n        collapsed: false\n      }).addTo(this.map);\n      var editableLayer = this.props.layers;\n      this.map.addLayer(this.props.layers);\n      this.sv_marker = new leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.marker(this.props.streetview, {\n        draggable: true,\n        autoPan: true\n      }).addTo(this.map);\n      var drawPluginOptions = {\n        position: 'topleft',\n        draw: {\n          polyline: true,\n          circle: false,\n          // Turns off this drawing tool\n          rectangle: false,\n          marker: false,\n          polygon: false,\n          circlemarker: false\n        },\n        edit: {\n          featureGroup: editableLayer,\n          //REQUIRED!!\n          remove: true\n        }\n      };\n      this.sv_marker.on(\"drag\", function (e) {\n        var position = _this.sv_marker.getLatLng();\n\n        _this.props.reFocusCallback(position[\"lat\"], position[\"lng\"]);\n      }); // Initialise the draw control and pass it the FeatureGroup of editable layers\n\n      var drawControl = new leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Control.Draw(drawPluginOptions);\n      this.map.addControl(drawControl);\n      this.map.on('draw:created', function (e) {\n        var type = e.layerType,\n            layer = e.layer;\n\n        if (type === 'marker') {\n          layer.bindPopup('A popup!');\n        } // reference for click event: https://github.com/Leaflet/Leaflet.draw/issues/179\n\n\n        layer.on('click', function (e) {\n          // ref: https://stackoverflow.com/questions/29000768/change-polyline-options-leaflet\n          // reference to this https://github.com/Leaflet/Leaflet.draw/blob/master/src/draw/handler/Draw.Polyline.js#L20\n          // to know which option of setStyle is available\n          layer.setStyle({\n            color: 'blue'\n          });\n          layer.setStyle({\n            opacity: 1\n          });\n        });\n        layer.type = \"Feature\";\n        layer.properties = layer.properties || {};\n        console.log(layer);\n        editableLayer.addLayer(layer);\n\n        _this.props.updateLayerData(editableLayer);\n\n        console.log(editableLayer);\n      }); // https://leafletjs.com/reference-1.4.0.html#layergroup\n\n      drawPluginOptions.edit.featureGroup;\n      setTimeout(function () {\n        _this.map.invalidateSize(true);\n      }, 100);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"editMap\"\n      });\n    }\n  }]);\n\n  return EditMapContainer;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (EditMapContainer);\n\n//# sourceURL=webpack:///./src/components/container/EditMapContainer.js?");

/***/ })

})