/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Calculator.ts":
/*!***************************!*\
  !*** ./src/Calculator.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calculator: () => (/* binding */ Calculator),
/* harmony export */   Op: () => (/* binding */ Op)
/* harmony export */ });
/**
 * The binary operations supported by the calculator.
 */
var Op;
(function (Op) {
    /**
     * Addition.
     */
    Op[Op["Add"] = 0] = "Add";
    /**
     * Subtraction.
     */
    Op[Op["Sub"] = 1] = "Sub";
    /**
     * Multiplication.
     */
    Op[Op["Mul"] = 2] = "Mul";
    /**
     * Division.
     */
    Op[Op["Div"] = 3] = "Div";
    /**
     * Module
     */
    Op[Op["Mod"] = 4] = "Mod";
})(Op || (Op = {}));
/**
 * A basic four-function calculator. UI logic is handled separately in
 * {@link CalculatorUI}.
 */
var Calculator = /** @class */ (function () {
    /**
     * In its initial state, the calculator's screen shows `0`, there is no
     * previous result or operation, and overwrite mode is enabled.
     */
    function Calculator() {
        this.lcd = '0';
        this.arg = null;
        this.lastOp = null;
        this.overwrite = true;
        this.repeat = false;
    }
    /**
     * Input a single digit.
     * @param x a single digit, 0-9
     */
    Calculator.prototype.digit = function (x) {
        if (this.overwrite) {
            this.lcd = x.toString();
            this.overwrite = false;
        }
        else {
            this.lcd += x;
        }
    };
    /**
     * Input a decimal point.
     */
    Calculator.prototype.decimal = function () {
        if (this.overwrite) {
            this.lcd = '0.';
            this.overwrite = false;
        }
        else if (this.lcd.indexOf('.') === -1) { // don't allow more than one '.'
            this.lcd += '.';
        }
    };
    Calculator.prototype.negate = function () {
        if (this.overwrite) {
            this.lcd = '0';
            this.overwrite = false;
        }
        else if (this.lcd !== '0') { // don't negate '0'
            if (this.lcd.charAt(0) === '-')
                this.lcd = this.lcd.substring(1);
            else
                this.lcd = '-' + this.lcd;
        }
    };
    Calculator.prototype.sqrt = function () {
        if (this.overwrite) {
            this.lcd = '0';
            this.overwrite = false;
        }
        else if (this.lcd !== '0') { // do not 
            // if (this.lcd.charAt(0) !== '-')
            this.lcd = Math.sqrt(parseFloat(this.lcd)).toString();
        }
    };
    /**
     * Input a binary operator. If there is a pending operation whose result has
     * not yet been displayed, update the screen to display that result. For
     * example, when a user inputs 2 + 4 + 8, the screen is updated to display 6
     * on the second + input.
     */
    Calculator.prototype.op = function (o) {
        this.overwrite = true;
        if (this.arg === null || this.repeat) { // if this is the first argument
            this.lastOp = o;
            this.arg = parseFloat(this.lcd);
        }
        else { // if this is the second argument
            switch (this.lastOp) {
                case Op.Add:
                    this.lcd = (this.arg + parseFloat(this.lcd)).toString();
                    break;
                case Op.Mod:
                    this.lcd = (this.arg % parseFloat(this.lcd)).toString();
                    break;
                case Op.Sub:
                    this.lcd = (this.arg - parseFloat(this.lcd)).toString();
                    break;
                case Op.Mul:
                    this.lcd = (this.arg * parseFloat(this.lcd)).toString();
                    break;
                case Op.Div:
                    this.lcd = (this.arg / parseFloat(this.lcd)).toString();
                    break;
            }
            this.lastOp = o;
            this.arg = parseFloat(this.lcd);
        }
        this.repeat = false;
    };
    /**
     * If the calculator is not in repeat mode, compute the result of the pending
     * expression if there is one. If the calculator is in repeat mode,
     * re-execute the previous operation.
     *
     * @see {@link repeat}
     */
    Calculator.prototype.equals = function () {
        // If `repeat` is disabled, this press of = will enable it. In that case,
        // the value currently on screen is the second argument, the one that's used
        // when repeating the operation.
        var oldLcd = parseFloat(this.lcd);
        // If `repeat` is disabled, then `this.arg` is the first argument to the
        // operation; if `repeat` is enabled, then it's the second argument.
        // This doesn't matter in the + and * cases because the result is the same
        // either way.
        switch (this.lastOp) {
            case Op.Add:
                this.lcd = (this.arg + parseFloat(this.lcd)).toString();
                break;
            case Op.Sub:
                if (this.repeat)
                    this.lcd = (parseFloat(this.lcd) - this.arg).toString();
                else
                    this.lcd = (this.arg - parseFloat(this.lcd)).toString();
                break;
            case Op.Mul:
                this.lcd = (this.arg * parseFloat(this.lcd)).toString();
                break;
            case Op.Div:
                if (this.repeat)
                    this.lcd = (parseFloat(this.lcd) / this.arg).toString();
                else
                    this.lcd = (this.arg / parseFloat(this.lcd)).toString();
                break;
            case Op.Mod:
                this.lcd = (parseFloat(this.lcd) % this.arg).toString();
                break;
        }
        // If `repeat` is disabled, we need to save the previous value of the screen
        // to use it as the second argument when repeating the operation.
        if (!this.repeat)
            this.arg = oldLcd;
        this.repeat = true;
        this.overwrite = true;
    };
    /**
     * Clear the screen, resetting it to 0. If in overwrite mode, reset the
     * entire calculator to its initial state.
     */
    Calculator.prototype.clear = function () {
        if (this.overwrite) {
            this.arg = null;
            this.lastOp = null;
            this.repeat = false;
        }
        this.lcd = '0';
        this.overwrite = true;
    };
    return Calculator;
}());



/***/ }),

/***/ "./src/CalculatorUI.ts":
/*!*****************************!*\
  !*** ./src/CalculatorUI.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorUI: () => (/* binding */ CalculatorUI)
/* harmony export */ });
/* harmony import */ var _Calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Calculator */ "./src/Calculator.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * The UI logic for the calculator interface, which just updates the HTML
 * element representing the display every time the calculator's state changes.
 * Button actions are bound in {@link Main}.
 */
var CalculatorUI = /** @class */ (function (_super) {
    __extends(CalculatorUI, _super);
    function CalculatorUI(id) {
        var _this = _super.call(this) || this;
        _this.lcdDisplay = document.getElementById(id);
        _this.lcdDisplay.innerHTML = _this.lcd;
        return _this;
    }
    CalculatorUI.prototype.digit = function (x) {
        _super.prototype.digit.call(this, x);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.decimal = function () {
        _super.prototype.decimal.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.negate = function () {
        _super.prototype.negate.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.op = function (o) {
        _super.prototype.op.call(this, o);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.equals = function () {
        _super.prototype.equals.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.sqrt = function () {
        _super.prototype.sqrt.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    return CalculatorUI;
}(_Calculator__WEBPACK_IMPORTED_MODULE_0__.Calculator));



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CalculatorUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalculatorUI */ "./src/CalculatorUI.ts");
/* harmony import */ var _Calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Calculator */ "./src/Calculator.ts");


window.onload = function () {
    var calcUI = new _CalculatorUI__WEBPACK_IMPORTED_MODULE_0__.CalculatorUI('lcd');
    document.getElementById('1').onclick = function () { return calcUI.digit(1); };
    document.getElementById('2').onclick = function () { return calcUI.digit(2); };
    document.getElementById('3').onclick = function () { return calcUI.digit(3); };
    document.getElementById('4').onclick = function () { return calcUI.digit(4); };
    document.getElementById('5').onclick = function () { return calcUI.digit(5); };
    document.getElementById('6').onclick = function () { return calcUI.digit(6); };
    document.getElementById('7').onclick = function () { return calcUI.digit(7); };
    document.getElementById('8').onclick = function () { return calcUI.digit(8); };
    document.getElementById('9').onclick = function () { return calcUI.digit(9); };
    document.getElementById('0').onclick = function () { return calcUI.digit(0); };
    document.getElementById('+-').onclick = function () { return calcUI.negate(); };
    document.getElementById('.').onclick = function () { return calcUI.decimal(); };
    document.getElementById('+').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Add); };
    document.getElementById('-').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Sub); };
    document.getElementById('*').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Mul); };
    document.getElementById('/').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Div); };
    document.getElementById('=').onclick = function () { return calcUI.equals(); };
    document.getElementById('C').onclick = function () { return calcUI.clear(); };
    document.getElementById('sqrt').onclick = function () { return calcUI.sqrt(); };
    document.getElementById('%').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Mod); };
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sRUFBRSxpQ0FBaUM7WUFDeEMsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixLQUFLLEVBQUUsQ0FBQyxHQUFHO29CQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQyxNQUFNO2dCQUM1RSxLQUFLLEVBQUUsQ0FBQyxHQUFHO29CQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQyxNQUFNO2dCQUM1RSxLQUFLLEVBQUUsQ0FBQyxHQUFHO29CQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQyxNQUFNO2dCQUM1RSxLQUFLLEVBQUUsQ0FBQyxHQUFHO29CQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQyxNQUFNO2dCQUM1RSxLQUFLLEVBQUUsQ0FBQyxHQUFHO29CQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQyxNQUFNO2FBQzdFO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENB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Q2FsY3VsYXRvclVJLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRvQmVOdW1iZXIgfSBmcm9tIFwiamVzdC1leHRlbmRlZFwiO1xuXG4vKipcbiAqIFRoZSBiaW5hcnkgb3BlcmF0aW9ucyBzdXBwb3J0ZWQgYnkgdGhlIGNhbGN1bGF0b3IuXG4gKi9cbmV4cG9ydCBlbnVtIE9wIHtcbiAgLyoqXG4gICAqIEFkZGl0aW9uLlxuICAgKi9cbiAgQWRkLFxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdGlvbi5cbiAgICovXG4gIFN1YixcblxuICAvKipcbiAgICogTXVsdGlwbGljYXRpb24uXG4gICAqL1xuICBNdWwsXG5cbiAgLyoqXG4gICAqIERpdmlzaW9uLlxuICAgKi9cbiAgRGl2LFxuXG4gIC8qKlxuICAgKiBNb2R1bGVcbiAgICovXG4gIE1vZFxufVxuXG4vKipcbiAqIEEgYmFzaWMgZm91ci1mdW5jdGlvbiBjYWxjdWxhdG9yLiBVSSBsb2dpYyBpcyBoYW5kbGVkIHNlcGFyYXRlbHkgaW5cbiAqIHtAbGluayBDYWxjdWxhdG9yVUl9LlxuICovXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRvciB7XG4gIC8qKlxuICAgKiBUaGUgY29udGVudHMgb2YgdGhlIGNhbGN1bGF0b3IncyBMQ0QgZGlzcGxheS5cbiAgICovXG4gIGxjZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdWx0IG9mIHRoZSBsYXN0IG9wZXJhdGlvbiBpZiBgcmVwZWF0YCBpcyBgZmFsc2VgLCBvciB0aGUgc2Vjb25kXG4gICAqIGFyZ3VtZW50IG9mIHRoZSBsYXN0IG9wZXJhdGlvbiBpZiBgcmVwZWF0YCBpcyBgdHJ1ZWAuXG4gICAqL1xuICBhcmc6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGxhc3Qgb3BlcmF0aW9uIHRoYXQgdGhlIHVzZXIgZW50ZXJlZC5cbiAgICovXG4gIGxhc3RPcDogT3A7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGNhbGN1bGF0b3IgaXMgaW4gXCJvdmVyd3JpdGUgbW9kZVwiOyBpZiBgZmFsc2VgLCB0aGVcbiAgICogY2FsY3VsYXRvciBpcyBpbiBcImFwcGVuZCBtb2RlXCIuIEluIG92ZXJ3cml0ZSBtb2RlLCB0aGUgbmV4dCBpbnB1dCByZXBsYWNlc1xuICAgKiB0aGUgY3VycmVudCBzY3JlZW4gY29udGVudHM7IGluIGFwcGVuZCBtb2RlLCB0aGUgbmV4dCBpbnB1dCBhcHBlbmRzIHRvIHRoZVxuICAgKiBjdXJyZW50IHNjcmVlbiBjb250ZW50cy5cbiAgICovXG4gIG92ZXJ3cml0ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY2FsY3VsYXRvciBpcyBpbiBcInJlcGVhdCBtb2RlXCIuIEluIHJlcGVhdCBtb2RlLCB3aGVuIHRoZSA9XG4gICAqIGJ1dHRvbiBpcyBwcmVzc2VkLCB0aGUgc2NyZWVuIGlzIHVwZGF0ZWQgYnkgcmUtZXhlY3V0aW5nIHRoZSBwcmV2aW91c1xuICAgKiBvcGVyYXRpb24gd2l0aCB0aGUgc2FtZSByaWdodC1oYW5kIGFyZ3VtZW50IGFzIGxhc3QgdGltZS4gRm9yIGV4YW1wbGUsIGlmXG4gICAqIHRoZSBwcmV2aW91cyBvcGVyYXRpb24gd2FzIDMgKyA1IGFuZCB0aGUgY2FsY3VsYXRvciBpcyBpbiByZXBlYXQgbW9kZSxcbiAgICogcHJlc3NpbmcgPSB3aWxsIHVwZGF0ZSB0aGUgc2NyZWVuIHdpdGggdGhlIG51bWJlciAxMy5cbiAgICovXG4gIHJlcGVhdDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSW4gaXRzIGluaXRpYWwgc3RhdGUsIHRoZSBjYWxjdWxhdG9yJ3Mgc2NyZWVuIHNob3dzIGAwYCwgdGhlcmUgaXMgbm9cbiAgICogcHJldmlvdXMgcmVzdWx0IG9yIG9wZXJhdGlvbiwgYW5kIG92ZXJ3cml0ZSBtb2RlIGlzIGVuYWJsZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxjZCA9ICcwJztcbiAgICB0aGlzLmFyZyA9IG51bGw7XG4gICAgdGhpcy5sYXN0T3AgPSBudWxsO1xuICAgIHRoaXMub3ZlcndyaXRlID0gdHJ1ZTtcbiAgICB0aGlzLnJlcGVhdCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIElucHV0IGEgc2luZ2xlIGRpZ2l0LlxuICAgKiBAcGFyYW0geCBhIHNpbmdsZSBkaWdpdCwgMC05XG4gICAqL1xuICBkaWdpdCh4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVyd3JpdGUpIHtcbiAgICAgIHRoaXMubGNkID0geC50b1N0cmluZygpO1xuICAgICAgdGhpcy5vdmVyd3JpdGUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sY2QgKz0geDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5wdXQgYSBkZWNpbWFsIHBvaW50LlxuICAgKi9cbiAgZGVjaW1hbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVyd3JpdGUpIHtcbiAgICAgIHRoaXMubGNkID0gJzAuJztcbiAgICAgIHRoaXMub3ZlcndyaXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxjZC5pbmRleE9mKCcuJykgPT09IC0xKSB7IC8vIGRvbid0IGFsbG93IG1vcmUgdGhhbiBvbmUgJy4nXG4gICAgICB0aGlzLmxjZCArPSAnLic7XG4gICAgfVxuICB9XG5cbiAgbmVnYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJ3cml0ZSkge1xuICAgICAgdGhpcy5sY2QgPSAnMCc7XG4gICAgICB0aGlzLm92ZXJ3cml0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sY2QgIT09ICcwJykgeyAvLyBkb24ndCBuZWdhdGUgJzAnXG4gICAgICBpZiAodGhpcy5sY2QuY2hhckF0KDApID09PSAnLScpXG4gICAgICAgIHRoaXMubGNkID0gdGhpcy5sY2Quc3Vic3RyaW5nKDEpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLmxjZCA9ICctJyArIHRoaXMubGNkO1xuICAgIH1cbiAgfVxuXG4gIHNxcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcndyaXRlKSB7XG4gICAgICB0aGlzLmxjZCA9ICcwJztcbiAgICAgIHRoaXMub3ZlcndyaXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxjZCAhPT0gJzAnKSB7IC8vIGRvIG5vdCBcbiAgICAgLy8gaWYgKHRoaXMubGNkLmNoYXJBdCgwKSAhPT0gJy0nKVxuICAgICAgICB0aGlzLmxjZCA9IE1hdGguc3FydChwYXJzZUZsb2F0KHRoaXMubGNkKSkudG9TdHJpbmcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5wdXQgYSBiaW5hcnkgb3BlcmF0b3IuIElmIHRoZXJlIGlzIGEgcGVuZGluZyBvcGVyYXRpb24gd2hvc2UgcmVzdWx0IGhhc1xuICAgKiBub3QgeWV0IGJlZW4gZGlzcGxheWVkLCB1cGRhdGUgdGhlIHNjcmVlbiB0byBkaXNwbGF5IHRoYXQgcmVzdWx0LiBGb3JcbiAgICogZXhhbXBsZSwgd2hlbiBhIHVzZXIgaW5wdXRzIDIgKyA0ICsgOCwgdGhlIHNjcmVlbiBpcyB1cGRhdGVkIHRvIGRpc3BsYXkgNlxuICAgKiBvbiB0aGUgc2Vjb25kICsgaW5wdXQuXG4gICAqL1xuICBvcChvOiBPcCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcndyaXRlID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5hcmcgPT09IG51bGwgfHwgdGhpcy5yZXBlYXQpIHsgLy8gaWYgdGhpcyBpcyB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICAgIHRoaXMubGFzdE9wID0gbztcbiAgICAgIHRoaXMuYXJnID0gcGFyc2VGbG9hdCh0aGlzLmxjZCk7XG4gICAgfSBlbHNlIHsgLy8gaWYgdGhpcyBpcyB0aGUgc2Vjb25kIGFyZ3VtZW50XG4gICAgICBzd2l0Y2ggKHRoaXMubGFzdE9wKSB7XG4gICAgICAgIGNhc2UgT3AuQWRkOiB0aGlzLmxjZCA9ICh0aGlzLmFyZyArIHBhcnNlRmxvYXQodGhpcy5sY2QpKS50b1N0cmluZygpOyBicmVhaztcbiAgICAgICAgY2FzZSBPcC5Nb2Q6IHRoaXMubGNkID0gKHRoaXMuYXJnICUgcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgICBjYXNlIE9wLlN1YjogdGhpcy5sY2QgPSAodGhpcy5hcmcgLSBwYXJzZUZsb2F0KHRoaXMubGNkKSkudG9TdHJpbmcoKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgT3AuTXVsOiB0aGlzLmxjZCA9ICh0aGlzLmFyZyAqIHBhcnNlRmxvYXQodGhpcy5sY2QpKS50b1N0cmluZygpOyBicmVhaztcbiAgICAgICAgY2FzZSBPcC5EaXY6IHRoaXMubGNkID0gKHRoaXMuYXJnIC8gcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0T3AgPSBvO1xuICAgICAgdGhpcy5hcmcgPSBwYXJzZUZsb2F0KHRoaXMubGNkKTtcbiAgICB9XG4gICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgY2FsY3VsYXRvciBpcyBub3QgaW4gcmVwZWF0IG1vZGUsIGNvbXB1dGUgdGhlIHJlc3VsdCBvZiB0aGUgcGVuZGluZ1xuICAgKiBleHByZXNzaW9uIGlmIHRoZXJlIGlzIG9uZS4gSWYgdGhlIGNhbGN1bGF0b3IgaXMgaW4gcmVwZWF0IG1vZGUsXG4gICAqIHJlLWV4ZWN1dGUgdGhlIHByZXZpb3VzIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgcmVwZWF0fVxuICAgKi9cbiAgZXF1YWxzKCk6IHZvaWQge1xuICAgIC8vIElmIGByZXBlYXRgIGlzIGRpc2FibGVkLCB0aGlzIHByZXNzIG9mID0gd2lsbCBlbmFibGUgaXQuIEluIHRoYXQgY2FzZSxcbiAgICAvLyB0aGUgdmFsdWUgY3VycmVudGx5IG9uIHNjcmVlbiBpcyB0aGUgc2Vjb25kIGFyZ3VtZW50LCB0aGUgb25lIHRoYXQncyB1c2VkXG4gICAgLy8gd2hlbiByZXBlYXRpbmcgdGhlIG9wZXJhdGlvbi5cbiAgICBjb25zdCBvbGRMY2QgPSBwYXJzZUZsb2F0KHRoaXMubGNkKTtcblxuICAgIC8vIElmIGByZXBlYXRgIGlzIGRpc2FibGVkLCB0aGVuIGB0aGlzLmFyZ2AgaXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgIC8vIG9wZXJhdGlvbjsgaWYgYHJlcGVhdGAgaXMgZW5hYmxlZCwgdGhlbiBpdCdzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgLy8gVGhpcyBkb2Vzbid0IG1hdHRlciBpbiB0aGUgKyBhbmQgKiBjYXNlcyBiZWNhdXNlIHRoZSByZXN1bHQgaXMgdGhlIHNhbWVcbiAgICAvLyBlaXRoZXIgd2F5LlxuICAgIHN3aXRjaCAodGhpcy5sYXN0T3ApIHtcbiAgICAgIGNhc2UgT3AuQWRkOiB0aGlzLmxjZCA9ICh0aGlzLmFyZyArIHBhcnNlRmxvYXQodGhpcy5sY2QpKS50b1N0cmluZygpOyBicmVhaztcbiAgICAgIGNhc2UgT3AuU3ViOlxuICAgICAgICBpZiAodGhpcy5yZXBlYXQpXG4gICAgICAgICAgdGhpcy5sY2QgPSAocGFyc2VGbG9hdCh0aGlzLmxjZCkgLSB0aGlzLmFyZykudG9TdHJpbmcoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMubGNkID0gKHRoaXMuYXJnIC0gcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBPcC5NdWw6IHRoaXMubGNkID0gKHRoaXMuYXJnICogcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgY2FzZSBPcC5EaXY6XG4gICAgICAgIGlmICh0aGlzLnJlcGVhdClcbiAgICAgICAgICB0aGlzLmxjZCA9IChwYXJzZUZsb2F0KHRoaXMubGNkKSAvIHRoaXMuYXJnKS50b1N0cmluZygpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhpcy5sY2QgPSAodGhpcy5hcmcgLyBwYXJzZUZsb2F0KHRoaXMubGNkKSkudG9TdHJpbmcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9wLk1vZDpcbiAgICAgICAgdGhpcy5sY2QgPSAocGFyc2VGbG9hdCh0aGlzLmxjZCkgJSB0aGlzLmFyZykudG9TdHJpbmcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gSWYgYHJlcGVhdGAgaXMgZGlzYWJsZWQsIHdlIG5lZWQgdG8gc2F2ZSB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIHNjcmVlblxuICAgIC8vIHRvIHVzZSBpdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHdoZW4gcmVwZWF0aW5nIHRoZSBvcGVyYXRpb24uXG4gICAgaWYgKCF0aGlzLnJlcGVhdClcbiAgICAgIHRoaXMuYXJnID0gb2xkTGNkO1xuXG4gICAgdGhpcy5yZXBlYXQgPSB0cnVlO1xuICAgIHRoaXMub3ZlcndyaXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgc2NyZWVuLCByZXNldHRpbmcgaXQgdG8gMC4gSWYgaW4gb3ZlcndyaXRlIG1vZGUsIHJlc2V0IHRoZVxuICAgKiBlbnRpcmUgY2FsY3VsYXRvciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJ3cml0ZSkge1xuICAgICAgdGhpcy5hcmcgPSBudWxsO1xuICAgICAgdGhpcy5sYXN0T3AgPSBudWxsO1xuICAgICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5sY2QgPSAnMCc7XG4gICAgdGhpcy5vdmVyd3JpdGUgPSB0cnVlO1xuICB9XG59IiwiaW1wb3J0IHsgQ2FsY3VsYXRvciwgT3AgfSBmcm9tICcuL0NhbGN1bGF0b3InO1xuXG4vKipcbiAqIFRoZSBVSSBsb2dpYyBmb3IgdGhlIGNhbGN1bGF0b3IgaW50ZXJmYWNlLCB3aGljaCBqdXN0IHVwZGF0ZXMgdGhlIEhUTUxcbiAqIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBkaXNwbGF5IGV2ZXJ5IHRpbWUgdGhlIGNhbGN1bGF0b3IncyBzdGF0ZSBjaGFuZ2VzLlxuICogQnV0dG9uIGFjdGlvbnMgYXJlIGJvdW5kIGluIHtAbGluayBNYWlufS5cbiAqL1xuZXhwb3J0IGNsYXNzIENhbGN1bGF0b3JVSSBleHRlbmRzIENhbGN1bGF0b3Ige1xuICAvKipcbiAgICogVGhlIEhUTUwgZWxlbWVudCB0aGF0IHNob3dzIHRoZSBjb250ZW50cyBvZiB0aGUgY2FsY3VsYXRvcidzIGRpc3BsYXkuXG4gICAqL1xuICBsY2REaXNwbGF5OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmxjZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkO1xuICB9XG5cbiAgZGlnaXQoeDogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIuZGlnaXQoeCk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cblxuICBkZWNpbWFsKCk6IHZvaWQge1xuICAgIHN1cGVyLmRlY2ltYWwoKTtcbiAgICB0aGlzLmxjZERpc3BsYXkuaW5uZXJIVE1MID0gdGhpcy5sY2QudG9TdHJpbmcoKTtcbiAgfVxuXG4gIG5lZ2F0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZWdhdGUoKTtcbiAgICB0aGlzLmxjZERpc3BsYXkuaW5uZXJIVE1MID0gdGhpcy5sY2QudG9TdHJpbmcoKTtcbiAgfVxuXG4gIG9wKG86IE9wKTogdm9pZCB7XG4gICAgc3VwZXIub3Aobyk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cblxuICBlcXVhbHMoKTogdm9pZCB7XG4gICAgc3VwZXIuZXF1YWxzKCk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICBzdXBlci5jbGVhcigpO1xuICAgIHRoaXMubGNkRGlzcGxheS5pbm5lckhUTUwgPSB0aGlzLmxjZC50b1N0cmluZygpO1xuICB9XG5cbiAgc3FydCgpOiB2b2lkIHtcbiAgICBzdXBlci5zcXJ0KCk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENhbGN1bGF0b3JVSSB9IGZyb20gJy4vQ2FsY3VsYXRvclVJJztcbmltcG9ydCB7IE9wIH0gZnJvbSAnLi9DYWxjdWxhdG9yJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgY29uc3QgY2FsY1VJID0gbmV3IENhbGN1bGF0b3JVSSgnbGNkJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcxJykub25jbGljayA9ICgpID0+IGNhbGNVSS5kaWdpdCgxKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzInKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmRpZ2l0KDIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnMycpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuZGlnaXQoMyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCc0Jykub25jbGljayA9ICgpID0+IGNhbGNVSS5kaWdpdCg0KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzUnKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmRpZ2l0KDUpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnNicpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuZGlnaXQoNik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCc3Jykub25jbGljayA9ICgpID0+IGNhbGNVSS5kaWdpdCg3KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzgnKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmRpZ2l0KDgpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnOScpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuZGlnaXQoOSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcwJykub25jbGljayA9ICgpID0+IGNhbGNVSS5kaWdpdCgwKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJystJykub25jbGljayA9ICgpID0+IGNhbGNVSS5uZWdhdGUoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJy4nKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmRlY2ltYWwoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJysnKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLm9wKE9wLkFkZCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCctJykub25jbGljayA9ICgpID0+IGNhbGNVSS5vcChPcC5TdWIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnKicpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkub3AoT3AuTXVsKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJy8nKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLm9wKE9wLkRpdik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCc9Jykub25jbGljayA9ICgpID0+IGNhbGNVSS5lcXVhbHMoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0MnKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmNsZWFyKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcXJ0Jykub25jbGljayA9ICgpID0+IGNhbGNVSS5zcXJ0KCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCclJykub25jbGljayA9ICgpID0+IGNhbGNVSS5vcChPcC5Nb2QpO1xufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=