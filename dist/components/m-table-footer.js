"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableFooter = _interopRequireDefault(require("@material-ui/core/TableFooter"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MTableFooter =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableFooter, _React$Component);

  function MTableFooter() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MTableFooter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MTableFooter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getElementSize", function () {
      return _this.props.options.padding === 'default' ? 'medium' : 'small';
    });
    return _this;
  }

  (0, _createClass2["default"])(MTableFooter, [{
    key: "renderColumns",
    value: function renderColumns() {
      var _this2 = this;

      var size = this.getElementSize();
      var mapArr = this.props.columns.filter(function (columnDef) {
        return !columnDef.hidden;
      }).sort(function (a, b) {
        return a.tableData.columnOrder - b.tableData.columnOrder;
      }).map(function (columnDef, index) {
        var value = _this2.props.getFieldValue(_this2.props.data, columnDef);

        return React.createElement(_this2.props.components.Cell, {
          size: size,
          columnDef: columnDef,
          value: value,
          style: _this2.getStyle(),
          key: "footer-cell-" + columnDef.tableData.id,
          rowData: _this2.props.data
        });
      });
      return mapArr;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var style = {
        transition: 'all ease 300ms',
        position: 'sticky',
        bottom: '-1px',
        zIndex: 4,
        backgroundColor: 'whitesmoke'
      };

      if (typeof this.props.options.footerStyle === "function") {
        style = (0, _objectSpread2["default"])({}, style, this.props.options.footerStyle(this.props.data));
      } else if (this.props.options.footerStyle) {
        style = (0, _objectSpread2["default"])({}, style, this.props.options.footerStyle);
      }

      if (this.props.onRowClick) {
        style.cursor = 'pointer';
      }

      return style;
    }
  }, {
    key: "renderActionPlaceholders",
    value: function renderActionPlaceholders() {
      var _this3 = this;

      var size = this.getElementSize();
      var baseIconSize = size === 'medium' ? 42 : 26;
      var actions = this.props.actions.filter(function (a) {
        return !a.isFreeAction && !_this3.props.options.selection;
      });
      return React.createElement(_TableCell["default"], {
        size: size,
        padding: "none",
        key: "footer-actions-column-placeholder",
        style: {
          width: baseIconSize * actions.length,
          padding: '0px 5px'
        }
      });
    }
  }, {
    key: "renderSelectionColumnPlaceholder",
    value: function renderSelectionColumnPlaceholder() {
      var size = this.getElementSize();
      var baseIconSize = size === 'medium' ? 42 : 26;
      return React.createElement(_TableCell["default"], {
        size: this.getElementSize(),
        padding: "none",
        key: "footer-key-selection-column-placeholder",
        style: {
          width: baseIconSize + 9 * (this.props.treeDataMaxLevel - 1)
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var renderColumns = this.renderColumns(); // 
      // Add placeholder columns
      //

      if (this.props.options.selection) {
        renderColumns.splice(0, 0, this.renderSelectionColumnPlaceholder());
      }

      if (this.props.actions && this.props.actions.filter(function (a) {
        return !a.isFreeAction && !_this4.props.options.selection;
      }).length > 0) {
        if (this.props.options.actionsColumnIndex === -1) {
          renderColumns.push(this.renderActionPlaceholders());
        } else if (this.props.options.actionsColumnIndex >= 0) {
          var endPos = 0;

          if (this.props.options.selection) {
            endPos = 1;
          }

          renderColumns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActionPlaceholders());
        }
      }

      if (this.props.isTreeData) {
        renderColumns.splice(0, 0, React.createElement(_TableCell["default"], {
          style: this.getStyle(),
          padding: "none",
          key: "footer-tree-data-placeholder"
        }));
      }

      if (this.props.detailPanel) {
        if (this.props.options.detailPanelColumnAlignment === 'right') {
          renderColumns.push(React.createElement(_TableCell["default"], {
            size: this.getElementSize(),
            padding: "none",
            key: "footer-detail-panel-placeholder",
            style: {
              width: 42,
              textAlign: 'center'
            }
          }));
        } else {
          renderColumns.splice(0, 0, React.createElement(_TableCell["default"], {
            size: this.getElementSize(),
            padding: "none",
            key: "footer-detail-panel-placeholder",
            style: {
              width: 42,
              textAlign: 'center'
            }
          }));
        }
      }

      this.props.columns.filter(function (columnDef) {
        return columnDef.tableData.groupOrder > -1;
      }).forEach(function (columnDef) {
        renderColumns.splice(0, 0, React.createElement(_TableCell["default"], {
          size: _this4.getElementSize(),
          padding: "none",
          key: "key-group-cell-placeholder-" + columnDef.tableData.id
        }));
      }); //
      // End placeholders
      //

      var _this$props = this.props,
          data = _this$props.data,
          treeDataMaxLevel = _this$props.treeDataMaxLevel,
          isTreeData = _this$props.isTreeData,
          columns = _this$props.columns,
          components = _this$props.components,
          getFieldValue = _this$props.getFieldValue,
          onRowClick = _this$props.onRowClick,
          options = _this$props.options,
          rowProps = (0, _objectWithoutProperties2["default"])(_this$props, ["data", "treeDataMaxLevel", "isTreeData", "columns", "components", "getFieldValue", "onRowClick", "options"]);
      return React.createElement(React.Fragment, null, React.createElement(_TableFooter["default"], {
        style: this.getStyle()
      }, React.createElement(_TableRow["default"], (0, _extends2["default"])({}, rowProps, {
        hover: onRowClick ? true : false,
        style: this.getStyle(),
        onClick: function onClick(event) {
          onRowClick && onRowClick(event, _this4.props.data);
        }
      }), renderColumns)));
    }
  }]);
  return MTableFooter;
}(React.Component);

exports["default"] = MTableFooter;
MTableFooter.defaultProps = {
  options: {}
};
MTableFooter.propTypes = {
  options: _propTypes["default"].object.isRequired,
  columns: _propTypes["default"].array,
  components: _propTypes["default"].object,
  onRowClick: _propTypes["default"].func,
  getFieldValue: _propTypes["default"].func.isRequired,
  data: _propTypes["default"].object.isRequired
};