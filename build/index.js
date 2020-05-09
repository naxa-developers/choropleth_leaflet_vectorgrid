module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\xampp\\htdocs\\test\\node_modules\\react-leaflet\\es\\index.js'");

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleZoom = exports.handleMarkerZoom = exports.countEqual = exports.getProvinceName = exports.calculateRange = exports.makeZeroLastNumber = exports.isOdd = exports.label_Vector_Tiles = exports.setProvinceCircleSize = exports.getProvinceCircleSize = exports.getMarkerColor = exports.choroplethColorArray = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _gradstop = __webpack_require__(29);

var _gradstop2 = _interopRequireDefault(_gradstop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var choroplethColorArray = exports.choroplethColorArray = function choroplethColorArray(stops, color) {
    // console.log(color, "color func")
    var gradient = (0, _gradstop2.default)({
        stops: stops,
        inputFormat: 'hex',
        colorArray: ['#ffffff', color]
    });
    return gradient;
};

var getMarkerColor = exports.getMarkerColor = function getMarkerColor(value, type, colors) {
    var color = "";
    type.map(function (data, i) {
        if (value && value.toLowerCase().trim().replace(/\s/g, '') == data.toLowerCase().trim().replace(/\s/g, '')) {
            color = colors[i];
        }
    });
    return color;
};

var getProvinceCircleSize = exports.getProvinceCircleSize = function getProvinceCircleSize(count, max, min) {
    var sizes = [20, 25, 30, 35, 40];
    var size = 20;
    var range = calculateRange(min, max, (max - min) / 4);
    range.map(function (data, i) {
        if (i < 4 ? count >= range[i] && count < range[i + 1] : count == range[i]) {
            // console.log(sizes[i], "size");
            size = sizes[i];
        }
    });
    return size;
};

var setProvinceCircleSize = exports.setProvinceCircleSize = function setProvinceCircleSize(counts) {
    var min = Math.min.apply(Math, _toConsumableArray(counts));
    var max = Math.max.apply(Math, _toConsumableArray(counts));
    counts.map(function (data, i) {
        var size = getProvinceCircleSize(data, max, min);
        return [data, size];
    });
};

var label_Vector_Tiles = exports.label_Vector_Tiles = function label_Vector_Tiles(feature, vt_label_province, labelcount, provinceCounts) {
    var name = "";
    // console.log(provinceCounts, "functions")
    var lat = feature.properties.Centroid_Y;
    var long = feature.properties.Centroid_X;
    if (feature.properties.hasOwnProperty('PROV_NAME')) {
        var min = Math.min.apply(Math, _toConsumableArray(provinceCounts));
        var max = Math.max.apply(Math, _toConsumableArray(provinceCounts));
        var size = getProvinceCircleSize(provinceCounts[feature.properties.id], max, min);
        name = getProvinceName(feature.properties.id + 1);
        var marginLeft = size >= 35 ? -(size / 5) + "px" : -(size / 15) + "px";
        // console.log(name, "functions name")
        var divIconP = L.divIcon({
            // html: "<div align='center' class='circle' id = 'circle"+feature.properties.id+"' style='width:"+size+"px !important; height:"+size+"px !important; margin-left:"+marginLeft+"'><span id= 'provinceCount"+feature.properties.id+"' class='text_circle' style ='margin-left:-2px; line-height:"+size+"px;'>"+provinceCounts[feature.properties.id]+"</span></div><text class='fed_labelText' style='color:#383838; font-size: 10px; margin-left: -10px;'>" + name + "</text>",
            html: "<text class='fed_labelText' style='color:#383838; font-size: 10px; margin-left: -10px;'>" + name + "</text>",
            iconAnchor: [12, 0]
        });

        var vt_label_marker_P = L.marker([lat, long], {
            icon: divIconP
        });

        // vt_label_marker_P.bindTooltip("<div>Number of Health Facilities</div>")
        // vt_label_marker_P.on("mouseover", ()=>{
        //     vt_label_marker_P.openPopup();
        //   })

        //   vt_label_marker_P.on('mouseout', () => {
        //     vt_label_marker_P.closePopup();
        // });

        if (countEqual(vt_label_province._layers, vt_label_marker_P, labelcount) > 0) {
            //do nothing
        } else {
            vt_label_marker_P.addTo(vt_label_province);
        }
    }
};

// dynamic range calculation start
var isOdd = exports.isOdd = function isOdd(num) {
    return num % 2;
};
var makeZeroLastNumber = exports.makeZeroLastNumber = function makeZeroLastNumber(num) {
    return parseInt(num.toString().replace(/.$/, "0")) > 12 ? parseInt(num.toString().replace(/.$/, "0")) : 12; //replace last digit by zero
};

var calculateRange = exports.calculateRange = function calculateRange(start, end1, step) {
    var end = end1; //makeZeroLastNumber(end1);
    var range = [];
    var typeofStart = typeof start === 'undefined' ? 'undefined' : _typeof(start);
    var typeofEnd = typeof end === 'undefined' ? 'undefined' : _typeof(end);

    if (step === 0) {
        console.log("Step cannot be zero.");
        // throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {
        // console.log("start is number", end)
        while (step > 0 ? end >= start : end <= start) {
            if (end <= 10) {
                range.push(start.toFixed(2));
            } else {
                // console.log("start math round", start)
                range.push(Math.round(start));
            }

            start += step;
        }
        if (isOdd(Math.round(end))) {
            if (end <= 10) {
                range[range.length - 1] = end.toFixed(2);
            } else {
                range[range.length - 1] = Math.round(end);
            }
        }
    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }
    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;
};

var getProvinceName = exports.getProvinceName = function getProvinceName(id, language) {
    language == null ? language = 'en' : language;
    var ProvinceName;
    if (id === 3) {
        ProvinceName = language == 'en' ? "Bagmati" : "बाग्मती प्रदेश";
    } else if (id === 4) {
        ProvinceName = language == 'en' ? "Gandaki" : "गण्डकी प्रदेश";
    } else if (id === 6) {
        ProvinceName = language == 'en' ? "Karnali" : "कर्णाली प्रदेश";
    } else if (id === 7) {
        ProvinceName = language == 'en' ? "Sudurpashchim" : "सुदूरपश्चिम प्रदेश";
    } else if (id === 1) {
        ProvinceName = language == 'en' ? "Province1" : "प्रदेश नं १";
    } else if (id === 2) {
        ProvinceName = language == 'en' ? "Province2" : "प्रदेश नं २";
    } else if (id === 5) {
        ProvinceName = language == 'en' ? "Province5" : "प्रदेश नं ५";
    }
    return ProvinceName;
};

var countEqual = exports.countEqual = function countEqual(oo, pp, labelcount) {
    // console.log(oo, "oo")
    var singleloopend = 0;
    Object.keys(oo).map(function (key) {
        // console.log(oo[key], "data i")
        if (singleloopend == 0) {
            labelcount = 0;
        }
        if (oo[key]._latlng.lat == pp._latlng.lat && oo[key]._latlng.lng == pp._latlng.lng) {
            labelcount++;
        }

        singleloopend++;
    });
    // console.log(labelcount, "labelcount")
    return labelcount;
};

var handleMarkerZoom = exports.handleMarkerZoom = function handleMarkerZoom(map, layers) {
    var zoom = map.getZoom();
    console.log(map.getBounds(), "bounds");
    layers.length > 0 ? layers.map(function (layer) {
        if ((zoom <= 5 || zoom > 7.5) && window[layer]) {
            // console.log("zoom <=5 or zoom>7")
            map.addLayer(window[layer]);
        } else {
            map.removeLayer(window[layer]);
        }
    }) : (zoom <= 5 || zoom > 7.5) && layers ? map.addLayer(layers) : map.removeLayer(layers);
};

var handleZoom = exports.handleZoom = function handleZoom(map, province, vt_label_province) {
    var zoom = map.getZoom();
    // console.log(map.getBounds(), "bounds")
    if (zoom <= 5 || zoom > 7.5) {
        map.removeLayer(vt_label_province);
    } else if (zoom <= 7.5 && map.hasLayer(province)) {
        map.addLayer(vt_label_province);
    }
};

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\xampp\\htdocs\\test\\node_modules\\react-leaflet-vectorgrid\\dist\\react-leaflet-vectorgrid.min.js'");

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = __webpack_require__(17);

var _reactLeafletVectorgrid = __webpack_require__(25);

var _reactLeafletVectorgrid2 = _interopRequireDefault(_reactLeafletVectorgrid);

var _Functions = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './js/Components/App';

// ReactDOM.render(<App />, document.getElementById('root'));

// import ScrollTab from './ScrollTab';
var VectorGrid = (0, _reactLeaflet.withLeaflet)(_reactLeafletVectorgrid2.default);

// import './Developers_css/vectorgrid.css';

var map = {};
var vt_label_province = L.featureGroup();
var labelcount = 0;
var province;
var circleLoad = true;

var defaultData = {
    choroplethData: [{ id: 1, count: 1 }, { id: 2, count: 2 }, { id: 3, count: 3 }, { id: 4, count: 4 }, { id: 5, count: 5 }, { id: 6, count: 6 }, { id: 7, count: 7 }]
};
var provinceDefaultStyle = {
    fillColor: "white",
    fillOpacity: 0,
    weight: 1.5,
    opacity: 1,
    color: "#a3b7e3",
    fill: true
};

var VectorGridComponent = function (_Component) {
    _inherits(VectorGridComponent, _Component);

    function VectorGridComponent(props) {
        _classCallCheck(this, VectorGridComponent);

        var _this = _possibleConstructorReturn(this, (VectorGridComponent.__proto__ || Object.getPrototypeOf(VectorGridComponent)).call(this, props));

        _this.state = {
            provinceCounts: [],
            provinceCenters: [[27.176469131898898, 87.220458984375], [27.01998400798257, 85.6494140625], [27.712710260887476, 85.36376953125001], [28.362401735238237, 84.03442382812501], [28.04289477256162, 82.78198242187501], [29.15216128331894, 82.22167968750001], [29.36302703778376, 80.97148437500001]],
            choroplethTitle: "dataCategory1",
            grade: [],
            legendColors: []
        };
        _this.vectorGridRef = _react2.default.createRef();
        _this.infoDivRef = _react2.default.createRef();

        getLegendColor = function getLegendColor(value) {
            var colorArray = _this.props.colorArray;
            var legendColor = colorArray != null && colorArray.length > 0 ? colorArray : _this.state.legendColors;
            var color = "#f4f4f2";
            // console.log(colorArray, "colorArray inside")
            _this.state.grade.map(function (grade, j) {
                if (value > grade) {
                    color = legendColor[j];
                }
            });
            return color;
        };

        changeGrades = function changeGrades() {
            var range = [];
            var data = [];

            var colorArrayLength = _this.props.colorArray && _this.props.colorArray.length;
            var gradeCount = _this.props.legendDivisions != null && typeof _this.props.legendDivisions == "number" && _this.props.legendDivisions <= 20 && _this.props.legendDivisions >= colorArrayLength ? _this.props.legendDivisions : 7; //set default gradecount

            var fullRange = _this.props.divisions && _this.props.divisions.length > 0 ? _this.props.divisions : [];
            var fullData = _this.props.choroplethData != null && _this.props.choroplethData.length > 0 ? _this.props.choroplethData : defaultData.choroplethData;

            _this.props.choroplethData != null && _this.props.choroplethData.length > 0 ? _this.props.choroplethData.map(function (data1) {
                data.push(data1.count);
            }) : defaultData.choroplethData.map(function (data1) {
                data.push(data1.count); //if no dat passed take from default data
            });

            // console.log(data, "data new")
            var max = Math.max.apply(null, Object.values(data));
            var min = 0; //Math.min(...data);
            // console.log(max, "max")
            // console.log(min, "min")
            range = (max - min) / (gradeCount - 1) < 1 ? [0, 2, 4, 6, 8, 10, 12] : (0, _Functions.calculateRange)(min, max, (max - min) / (gradeCount - 1));
            // console.log(range, "range")
            _this.setState({ grade: fullRange.length > 0 ? fullRange : range }); //add grade provided from props if available

            setTimeout(function () {
                _this.ChangeLegendColors();
                _this.setChoroplethStyle(province, fullData);
            }, 200);
        };
        ChangeLegendColors = function ChangeLegendColors() {
            var choroplethColor = _this.props.color;
            var color = choroplethColor != undefined && choroplethColor.length > 0 ? choroplethColor : "#ff0000";
            var data = _this.state.grade;
            var choroplethColors = (0, _Functions.choroplethColorArray)(data.length, color);
            // console.log(choroplethColors, "legendcolors")
            _this.setState({ legendColors: choroplethColors });
        };

        setChoroplethStyle = function setChoroplethStyle(layer, values) {
            values.map(function (value) {
                var color = _this.getLegendColor(value.count);
                var newStyle = {};
                var newStyle1 = _this.props.style && _this.props.style != null ? _this.props.style : provinceDefaultStyle;
                Object.assign(newStyle, newStyle1);
                newStyle.fillColor = color;
                newStyle.fillOpacity = 0.7;
                // console.log(color, "color")
                // console.log(newStyle, "newStyle")
                setTimeout(function () {
                    layer.setFeatureStyle(value.id, newStyle);
                }, 100);
            });
        };

        getShortNumbers = function getShortNumbers(n, d) {
            var x = ('' + n).length;
            var p = Math.pow;
            d = p(10, d);
            x -= x % 3;
            return Math.round(n * d / p(10, x)) / d + " kMGTPE"[x / 3];
        };

        label = function label() {
            province = _this.vectorGridRef.current.leafletElement;
            map = _this.props.mapRef.current.leafletElement;
            if (circleLoad == true) {
                var feature = { properties: {} };
                _this.state.provinceCenters.map(function (data, i) {
                    feature.properties.id = i;
                    feature.properties.Centroid_X = data[1];
                    feature.properties.Centroid_Y = data[0];
                    feature.properties.PROV_NAME = null;
                    if (_this.props.label && _this.props.label == true) {
                        (0, _Functions.label_Vector_Tiles)(feature, vt_label_province, labelcount, _this.props.provinceCounts);
                    }
                });
            }
            map.on("zoomend", function (e) {
                if (_this.props.label && _this.props.label == true) {
                    (0, _Functions.handleZoom)(map, province, vt_label_province);
                }
            });
            circleLoad = false;
        };

        addMouseoverLayer = function addMouseoverLayer() {
            province = _this.vectorGridRef.current.leafletElement;
            var infoDiv = _this.infoDivRef.current;
            map = _this.props.mapRef.current.leafletElement;
            province.on("mouseover", function (e) {
                // console.log(e, "ee")
                infoDiv.style.display = "block";
                var provName = "";
                // console.log(provName, "provName")
                var level = "";
                if (e.layer.properties.FIRST_PROV != undefined && e.layer.properties.FIRST_PROV != null) {
                    level = "province";
                    provName = (0, _Functions.getProvinceName)(e.layer.properties.id, "en");
                } else if (e.layer.properties.FIRST_DISTRICT != undefined && e.layer.properties.FIRST_DISTRICT != null) {
                    level = "district";
                    provName = (0, _Functions.getProvinceName)(e.layer.properties.provinceId, "en");
                } else {
                    level = "municipality";
                    provName = (0, _Functions.getProvinceName)(e.layer.properties.provinceId, "en");
                }
                var html = '<div style="background: white;padding: 10px;"><span><b>' + (level == "province" ? provName : level == "district" ? e.layer.properties.FIRST_DISTRICT : e.layer.properties.Name) + '</b></span>';
                html += level != "province" ? ',</br><span style="    text-transform: capitalize;">' + (level == "district" ? provName : e.layer.properties.District.toLowerCase()) : "";
                html += level != "province" && level != "district" ? ', ' + provName + '</span></div>' : "";
                infoDiv.innerHTML = html;
            });

            province.on("mouseout", function (e) {
                infoDiv.style.display = "none";
                infoDiv.innerHTML = "";
            });
        };
        return _this;
    }

    _createClass(VectorGridComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            map = this.props.mapRef.current.leafletElement;
            province = this.vectorGridRef.current.leafletElement;
            // console.log(province, "refrefref")
            map.addLayer(vt_label_province);
            this.changeGrades();
            this.label();
            this.addMouseoverLayer();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var provinceUrl = this.props.vectorGridUrl && this.props.vectorGridUrl != "" && typeof this.props.vectorGridUrl == "string" ? this.props.vectorGridUrl : "https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
            // console.log(provinceUrl,"provinceUrl")
            var style = this.props.style && this.props.style != null ? this.props.style : provinceDefaultStyle;
            // console.log(this.props.style && this.props.style != null?this.props.style:provinceDefaultStyle, "defaultstyle")
            var options = {
                type: 'protobuf',
                // tooltip: (feature) =>{
                //     console.log(feature, "feature  ")
                // },
                getFeatureId: function getFeatureId(feature) {
                    //console.log(feature, "feature  ")
                    return feature.properties.id;
                },
                url: provinceUrl,
                vectorTileLayerStyles: { Province: style },
                subdomains: 'abcd',
                key: 'abcdefghi01234567890'
            };

            var title = _react2.default.createElement('h1', {}, 'My First React Code');
            // return title;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(VectorGrid, _extends({}, options, { ref: this.vectorGridRef })),
                _react2.default.createElement(
                    'div',
                    { style: { position: "absolute", display: "flex", flexDirection: "column", zIndex: 1999, background: "white", padding: 5, bottom: 0, margin: 5 } },
                    _react2.default.createElement(
                        'div',
                        null,
                        this.props.choroplethTitle ? this.props.choroplethTitle : "Legend"
                    ),
                    _react2.default.createElement(
                        'div',
                        { 'class': 'map-legend' },
                        _react2.default.createElement(
                            'ul',
                            { 'class': 'color-legend' },
                            this.state.grade && this.state.grade.map(function (grade, i) {
                                var hideLastdiv = false;
                                hideLastdiv = i == _this2.state.grade.length - 1 ? true : false;
                                var grade1 = grade < 1000 ? grade.toString() : _this2.getShortNumbers(grade, 1);
                                // uncomment this to add vertical legend
                                // return <div><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block"}}></div> <span>{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                                // uncomment this to add horizontal legend
                                // return <div style={{display:"inline-block"}}><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block", marginLeft:"5px"}}></div> <span >{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                                // uncomment this to add nice horizontal legend
                                return _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement('div', { style: { backgroundColor: hideLastdiv ? "transparent" : _this2.getLegendColor(grade + 1) }, 'class': 'color color1' }),
                                    _react2.default.createElement(
                                        'span',
                                        { style: { marginLeft: grade1.trim().length == 1 ? -2 : grade1.trim().length == 2 ? -8 : -12 } },
                                        grade1
                                    )
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement('div', { ref: this.infoDivRef, 'class': 'infoDiv', style: { display: "none" } })
            );
        }
    }]);

    return VectorGridComponent;
}(_react.Component);

exports.default = VectorGridComponent;

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\xampp\\htdocs\\test\\node_modules\\gradstop\\index.js'");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });