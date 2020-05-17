'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var _reactLeafletVectorgrid = require('react-leaflet-vectorgrid');

var _reactLeafletVectorgrid2 = _interopRequireDefault(_reactLeafletVectorgrid);

var _Functions = require('./Functions');

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

        _this.getLegendColor = function (value) {
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
            return title;
            // return (
            //     <div>
            //         <VectorGrid {...options} ref={this.vectorGridRef}></VectorGrid>
            //         <div style={{position: "absolute", display: "flex", flexDirection: "column", zIndex: 1999, background: "white", padding: 5, bottom: 0, margin: 5}}>
            //         <div>{this.props.choroplethTitle?this.props.choroplethTitle:"Legend"}</div>
            //         <div class="map-legend">
            //                     {/* <ScrollTab changetheme={this.props.changetheme}/> */}
            //                     <ul class="color-legend">
            //             {
            //                 this.state.grade && this.state.grade.map((grade,i) => {
            //                     var hideLastdiv = false;
            //                     hideLastdiv= i == (this.state.grade.length-1)?true:false;
            //                     var grade1 = grade<1000?grade.toString():this.getShortNumbers(grade,1);
            //                     // uncomment this to add vertical legend
            //                     // return <div><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block"}}></div> <span>{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
            //                     // uncomment this to add horizontal legend
            //                     // return <div style={{display:"inline-block"}}><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block", marginLeft:"5px"}}></div> <span >{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
            //                     // uncomment this to add nice horizontal legend
            //                     return (
            //                         <li>
            //                             <div style={{backgroundColor: hideLastdiv?"transparent":this.getLegendColor(grade+1)}} class="color color1"></div>
            //                             <span style={{marginLeft: grade1.trim().length==1?-2:grade1.trim().length==2?-8:-12}}>{grade1}</span>
            //                         </li>
            //                     )
            //                 })
            //             }
            //                 </ul>
            //             </div>
            //         </div>
            //         <div ref={this.infoDivRef} class="infoDiv" style={{display:"none"}}></div>
            //     </div>
            // )
        }
    }]);

    return VectorGridComponent;
}(_react.Component);

exports.default = VectorGridComponent;
//# sourceMappingURL=index.js.map