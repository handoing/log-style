;(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['log'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        global.log = factory();
    }
}(window, function () {
    var objProtoToString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,

        uppercasePattern = /[A-Z]/g,
        msPattern = /^ms-/,

        nameCache = {},
        lines = [],
        type = {
            'string': null,
            'number': null
        };

    var IS_UNITLESS = {
        animationIterationCount: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridRow: true,
        gridColumn: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        stopOpacity: true,
        strokeDashoffset: true,
        strokeOpacity: true,
        strokeWidth: true
    };

    function px(name, value) {
        return typeof value === 'number' && !IS_UNITLESS[name] ? value + 'px' : value;
    }

    function transformStyleName(string) {
        return string in nameCache ? nameCache[string] : nameCache[string] = string
        .replace(uppercasePattern, '-$&')
        .toLowerCase()
        .replace(msPattern, '-ms-');
    }

    function cLog(text, css) {
        var content = "%c{{text}}".replace(/\{\{text\}\}/g, text);
        console.log(content, css);
    }

    var style = function(text, styleOptions) {
        var css = '';
        if (objProtoToString.call(styleOptions) === "[object Object]") {
            for (var prop in styleOptions) {
                if (hasOwn.call(styleOptions, prop)) {
                    lines.push(transformStyleName(prop) + ': ' + px(prop, styleOptions[prop]) + ';');
                }
            }
            css = lines.join('');
            cLog(text, css);
        }
    };

    var log = {};

    log.style = function(text, styleOptions) {
        if (arguments.length === 0) {
            return;
        }

        typeof text in type ? style(text, styleOptions) : console.log(text);
    };

    return log;
}));

