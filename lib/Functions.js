'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleZoom = exports.handleMarkerZoom = exports.countEqual = exports.getProvinceName = exports.calculateRange = exports.makeZeroLastNumber = exports.isOdd = exports.label_Vector_Tiles = exports.setProvinceCircleSize = exports.getProvinceCircleSize = exports.getMarkerColor = exports.choroplethColorArray = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _gradstop = require('gradstop');

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
//# sourceMappingURL=Functions.js.map