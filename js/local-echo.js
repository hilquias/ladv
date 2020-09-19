var LocalEchoController =
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: HistoryController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_LocalEchoController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/LocalEchoController */ "./lib/LocalEchoController.js");
/* harmony import */ var _lib_HistoryController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/HistoryController */ "./lib/HistoryController.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HistoryController", function() { return _lib_HistoryController__WEBPACK_IMPORTED_MODULE_1__["HistoryController"]; });



/* harmony default export */ __webpack_exports__["default"] = (_lib_LocalEchoController__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./lib/HistoryController.js":
/*!**********************************!*\
  !*** ./lib/HistoryController.js ***!
  \**********************************/
/*! exports provided: HistoryController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryController", function() { return HistoryController; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The history controller provides an ring-buffer
 */
var HistoryController = /*#__PURE__*/function () {
  function HistoryController(size) {
    _classCallCheck(this, HistoryController);

    this.size = size;
    this.entries = [];
    this.cursor = 0;
  }
  /**
   * Push an entry and maintain ring buffer size
   */


  _createClass(HistoryController, [{
    key: "push",
    value: function push(entry) {
      // Skip empty entries
      if (entry.trim() === "") return; // Skip duplicate entries

      var lastEntry = this.entries[this.entries.length - 1];
      if (entry == lastEntry) return; // Keep track of entries

      this.entries.push(entry);

      if (this.entries.length > this.size) {
        this.entries.pop(0);
      }

      this.cursor = this.entries.length;
    }
    /**
     * Rewind history cursor on the last entry
     */

  }, {
    key: "rewind",
    value: function rewind() {
      this.cursor = this.entries.length;
    }
    /**
     * Returns the previous entry
     */

  }, {
    key: "getPrevious",
    value: function getPrevious() {
      var idx = Math.max(0, this.cursor - 1);
      this.cursor = idx;
      return this.entries[idx];
    }
    /**
     * Returns the next entry
     */

  }, {
    key: "getNext",
    value: function getNext() {
      var idx = Math.min(this.entries.length, this.cursor + 1);
      this.cursor = idx;
      return this.entries[idx];
    }
  }]);

  return HistoryController;
}();

/***/ }),

/***/ "./lib/LocalEchoController.js":
/*!************************************!*\
  !*** ./lib/LocalEchoController.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalEchoController; });
/* harmony import */ var _HistoryController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HistoryController */ "./lib/HistoryController.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./lib/Utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * A local terminal controller is responsible for displaying messages
 * and handling local echo for the terminal.
 *
 * Local echo supports most of bash-like input primitives. Namely:
 * - Arrow navigation on the input
 * - Alt-arrow for word-boundary navigation
 * - Alt-backspace for word-boundary deletion
 * - Multi-line input for incomplete commands
 * - Auto-complete hooks
 */

var LocalEchoController = /*#__PURE__*/function () {
  function LocalEchoController() {
    var term = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, LocalEchoController);

    this.term = term;
    this._handleTermData = this.handleTermData.bind(this);
    this._handleTermResize = this.handleTermResize.bind(this);
    this.history = new _HistoryController__WEBPACK_IMPORTED_MODULE_0__["HistoryController"](options.historySize || 10);
    this.maxAutocompleteEntries = options.maxAutocompleteEntries || 100;
    this._autocompleteHandlers = [];
    this._active = false;
    this._input = "";
    this._cursor = 0;
    this._activePrompt = null;
    this._activeCharPrompt = null;
    this._termSize = {
      cols: 0,
      rows: 0
    };
    this._disposables = [];

    if (term) {
      if (term.loadAddon) term.loadAddon(this);else this.attach();
    }
  } // xterm.js new plugin API:


  _createClass(LocalEchoController, [{
    key: "activate",
    value: function activate(term) {
      this.term = term;
      this.attach();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.detach();
    } /////////////////////////////////////////////////////////////////////////////
    // User-Facing API
    /////////////////////////////////////////////////////////////////////////////

    /**
     *  Detach the controller from the terminal
     */

  }, {
    key: "detach",
    value: function detach() {
      if (this.term.off) {
        this.term.off("data", this._handleTermData);
        this.term.off("resize", this._handleTermResize);
      } else {
        this._disposables.forEach(function (d) {
          return d.dispose();
        });

        this._disposables = [];
      }
    }
    /**
     * Attach controller to the terminal, handling events
     */

  }, {
    key: "attach",
    value: function attach() {
      if (this.term.on) {
        this.term.on("data", this._handleTermData);
        this.term.on("resize", this._handleTermResize);
      } else {
        this._disposables.push(this.term.onData(this._handleTermData));

        this._disposables.push(this.term.onResize(this._handleTermResize));
      }

      this._termSize = {
        cols: this.term.cols,
        rows: this.term.rows
      };
    }
    /**
     * Register a handler that will be called to satisfy auto-completion
     */

  }, {
    key: "addAutocompleteHandler",
    value: function addAutocompleteHandler(fn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._autocompleteHandlers.push({
        fn: fn,
        args: args
      });
    }
    /**
     * Remove a previously registered auto-complete handler
     */

  }, {
    key: "removeAutocompleteHandler",
    value: function removeAutocompleteHandler(fn) {
      var idx = this._autocompleteHandlers.findIndex(function (e) {
        return e.fn === fn;
      });

      if (idx === -1) return;

      this._autocompleteHandlers.splice(idx, 1);
    }
    /**
     * Return a promise that will resolve when the user has completed
     * typing a single line
     */

  }, {
    key: "read",
    value: function read(prompt) {
      var _this = this;

      var continuationPrompt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "> ";
      return new Promise(function (resolve, reject) {
        _this.term.write(prompt);

        _this._activePrompt = {
          prompt: prompt,
          continuationPrompt: continuationPrompt,
          resolve: resolve,
          reject: reject
        };
        _this._input = "";
        _this._cursor = 0;
        _this._active = true;
      });
    }
    /**
     * Return a promise that will be resolved when the user types a single
     * character.
     *
     * This can be active in addition to `.read()` and will be resolved in
     * priority before it.
     */

  }, {
    key: "readChar",
    value: function readChar(prompt) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.term.write(prompt);

        _this2._activeCharPrompt = {
          prompt: prompt,
          resolve: resolve,
          reject: reject
        };
      });
    }
    /**
     * Abort a pending read operation
     */

  }, {
    key: "abortRead",
    value: function abortRead() {
      var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "aborted";

      if (this._activePrompt != null || this._activeCharPrompt != null) {
        this.term.write("\r\n");
      }

      if (this._activePrompt != null) {
        this._activePrompt.reject(reason);

        this._activePrompt = null;
      }

      if (this._activeCharPrompt != null) {
        this._activeCharPrompt.reject(reason);

        this._activeCharPrompt = null;
      }

      this._active = false;
    }
    /**
     * Prints a message and changes line
     */

  }, {
    key: "println",
    value: function println(message) {
      this.print(message + "\n");
    }
    /**
     * Prints a message and properly handles new-lines
     */

  }, {
    key: "print",
    value: function print(message) {
      var normInput = message.replace(/[\r\n]+/g, "\n");
      this.term.write(normInput.replace(/\n/g, "\r\n"));
    }
    /**
     * Prints a list of items using a wide-format
     */

  }, {
    key: "printWide",
    value: function printWide(items) {
      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      if (items.length == 0) return println(""); // Compute item sizes and matrix row/cols

      var itemWidth = items.reduce(function (width, item) {
        return Math.max(width, item.length);
      }, 0) + padding;
      var wideCols = Math.floor(this._termSize.cols / itemWidth);
      var wideRows = Math.ceil(items.length / wideCols); // Print matrix

      var i = 0;

      for (var row = 0; row < wideRows; ++row) {
        var rowStr = ""; // Prepare columns

        for (var col = 0; col < wideCols; ++col) {
          if (i < items.length) {
            var item = items[i++];
            item += " ".repeat(itemWidth - item.length);
            rowStr += item;
          }
        }

        this.println(rowStr);
      }
    } /////////////////////////////////////////////////////////////////////////////
    // Internal API
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Apply prompts to the given input
     */

  }, {
    key: "applyPrompts",
    value: function applyPrompts(input) {
      var prompt = (this._activePrompt || {}).prompt || "";
      var continuationPrompt = (this._activePrompt || {}).continuationPrompt || "";
      return prompt + input.replace(/\n/g, "\n" + continuationPrompt);
    }
    /**
     * Advances the `offset` as required in order to accompany the prompt
     * additions to the input.
     */

  }, {
    key: "applyPromptOffset",
    value: function applyPromptOffset(input, offset) {
      var newInput = this.applyPrompts(input.substr(0, offset));
      return newInput.length;
    }
    /**
     * Clears the current prompt
     *
     * This function will erase all the lines that display the current prompt
     * and move the cursor in the beginning of the first line of the prompt.
     */

  }, {
    key: "clearInput",
    value: function clearInput() {
      var currentPrompt = this.applyPrompts(this._input); // Get the overall number of lines to clear

      var allRows = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["countLines"])(currentPrompt, this._termSize.cols); // Get the line we are currently in

      var promptCursor = this.applyPromptOffset(this._input, this._cursor);

      var _offsetToColRow = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["offsetToColRow"])(currentPrompt, promptCursor, this._termSize.cols),
          col = _offsetToColRow.col,
          row = _offsetToColRow.row; // First move on the last line


      var moveRows = allRows - row - 1;

      for (var i = 0; i < moveRows; ++i) {
        this.term.write("\x1B[E");
      } // Clear current input line(s)


      this.term.write("\r\x1B[K");

      for (var i = 1; i < allRows; ++i) {
        this.term.write("\x1B[F\x1B[K");
      }
    }
    /**
     * Replace input with the new input given
     *
     * This function clears all the lines that the current input occupies and
     * then replaces them with the new input.
     */

  }, {
    key: "setInput",
    value: function setInput(newInput) {
      var clearInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // Clear current input
      if (clearInput) this.clearInput(); // Write the new input lines, including the current prompt

      var newPrompt = this.applyPrompts(newInput);
      this.print(newPrompt); // Trim cursor overflow

      if (this._cursor > newInput.length) {
        this._cursor = newInput.length;
      } // Move the cursor to the appropriate row/col


      var newCursor = this.applyPromptOffset(newInput, this._cursor);
      var newLines = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["countLines"])(newPrompt, this._termSize.cols);

      var _offsetToColRow2 = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["offsetToColRow"])(newPrompt, newCursor, this._termSize.cols),
          col = _offsetToColRow2.col,
          row = _offsetToColRow2.row;

      var moveUpRows = newLines - row - 1;
      this.term.write("\r");

      for (var i = 0; i < moveUpRows; ++i) {
        this.term.write("\x1B[F");
      }

      for (var i = 0; i < col; ++i) {
        this.term.write("\x1B[C");
      } // Replace input


      this._input = newInput;
    }
    /**
     * This function completes the current input, calls the given callback
     * and then re-displays the prompt.
     */

  }, {
    key: "printAndRestartPrompt",
    value: function printAndRestartPrompt(callback) {
      var _this3 = this;

      var cursor = this._cursor; // Complete input

      this.setCursor(this._input.length);
      this.term.write("\r\n"); // Prepare a function that will resume prompt

      var resume = function resume() {
        _this3._cursor = cursor;

        _this3.setInput(_this3._input);
      }; // Call the given callback to echo something, and if there is a promise
      // returned, wait for the resolution before resuming prompt.


      var ret = callback();

      if (ret == null) {
        resume();
      } else {
        ret.then(resume);
      }
    }
    /**
     * Set the new cursor position, as an offset on the input string
     *
     * This function:
     * - Calculates the previous and current
     */

  }, {
    key: "setCursor",
    value: function setCursor(newCursor) {
      if (newCursor < 0) newCursor = 0;
      if (newCursor > this._input.length) newCursor = this._input.length; // Apply prompt formatting to get the visual status of the display

      var inputWithPrompt = this.applyPrompts(this._input);
      var inputLines = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["countLines"])(inputWithPrompt, this._termSize.cols); // Estimate previous cursor position

      var prevPromptOffset = this.applyPromptOffset(this._input, this._cursor);

      var _offsetToColRow3 = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["offsetToColRow"])(inputWithPrompt, prevPromptOffset, this._termSize.cols),
          prevCol = _offsetToColRow3.col,
          prevRow = _offsetToColRow3.row; // Estimate next cursor position


      var newPromptOffset = this.applyPromptOffset(this._input, newCursor);

      var _offsetToColRow4 = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["offsetToColRow"])(inputWithPrompt, newPromptOffset, this._termSize.cols),
          newCol = _offsetToColRow4.col,
          newRow = _offsetToColRow4.row; // Adjust vertically


      if (newRow > prevRow) {
        for (var i = prevRow; i < newRow; ++i) {
          this.term.write("\x1B[B");
        }
      } else {
        for (var _i = newRow; _i < prevRow; ++_i) {
          this.term.write("\x1B[A");
        }
      } // Adjust horizontally


      if (newCol > prevCol) {
        for (var _i2 = prevCol; _i2 < newCol; ++_i2) {
          this.term.write("\x1B[C");
        }
      } else {
        for (var _i3 = newCol; _i3 < prevCol; ++_i3) {
          this.term.write("\x1B[D");
        }
      } // Set new offset


      this._cursor = newCursor;
    }
    /**
     * Move cursor at given direction
     */

  }, {
    key: "handleCursorMove",
    value: function handleCursorMove(dir) {
      if (dir > 0) {
        var num = Math.min(dir, this._input.length - this._cursor);
        this.setCursor(this._cursor + num);
      } else if (dir < 0) {
        var _num = Math.max(dir, -this._cursor);

        this.setCursor(this._cursor + _num);
      }
    }
    /**
     * Erase a character at cursor location
     */

  }, {
    key: "handleCursorErase",
    value: function handleCursorErase(backspace) {
      var _cursor = this._cursor,
          _input = this._input;

      if (backspace) {
        if (_cursor <= 0) return;

        var newInput = _input.substr(0, _cursor - 1) + _input.substr(_cursor);

        this.clearInput();
        this._cursor -= 1;
        this.setInput(newInput, false);
      } else {
        var _newInput = _input.substr(0, _cursor) + _input.substr(_cursor + 1);

        this.setInput(_newInput);
      }
    }
    /**
     * Insert character at cursor location
     */

  }, {
    key: "handleCursorInsert",
    value: function handleCursorInsert(data) {
      var _cursor = this._cursor,
          _input = this._input;

      var newInput = _input.substr(0, _cursor) + data + _input.substr(_cursor);

      this._cursor += data.length;
      this.setInput(newInput);
    }
    /**
     * Handle input completion
     */

  }, {
    key: "handleReadComplete",
    value: function handleReadComplete() {
      if (this.history) {
        this.history.push(this._input);
      }

      if (this._activePrompt) {
        this._activePrompt.resolve(this._input);

        this._activePrompt = null;
      }

      this.term.write("\r\n");
      this._active = false;
    }
    /**
     * Handle terminal resize
     *
     * This function clears the prompt using the previous configuration,
     * updates the cached terminal size information and then re-renders the
     * input. This leads (most of the times) into a better formatted input.
     */

  }, {
    key: "handleTermResize",
    value: function handleTermResize(data) {
      var rows = data.rows,
          cols = data.cols;
      this.clearInput();
      this._termSize = {
        cols: cols,
        rows: rows
      };
      this.setInput(this._input, false);
    }
    /**
     * Handle terminal input
     */

  }, {
    key: "handleTermData",
    value: function handleTermData(data) {
      var _this4 = this;

      if (!this._active) return; // If we have an active character prompt, satisfy it in priority

      if (this._activeCharPrompt != null) {
        this._activeCharPrompt.resolve(data);

        this._activeCharPrompt = null;
        this.term.write("\r\n");
        return;
      } // If this looks like a pasted input, expand it


      if (data.length > 3 && data.charCodeAt(0) !== 0x1b) {
        var normData = data.replace(/[\r\n]+/g, "\r");
        Array.from(normData).forEach(function (c) {
          return _this4.handleData(c);
        });
      } else {
        this.handleData(data);
      }
    }
    /**
     * Handle a single piece of information from the terminal.
     */

  }, {
    key: "handleData",
    value: function handleData(data) {
      var _this5 = this;

      if (!this._active) return;
      var ord = data.charCodeAt(0);
      var ofs; // Handle ANSI escape sequences

      if (ord == 0x1b) {
        switch (data.substr(1)) {
          case "[A":
            // Up arrow
            if (this.history) {
              var value = this.history.getPrevious();

              if (value) {
                this.setInput(value);
                this.setCursor(value.length);
              }
            }

            break;

          case "[B":
            // Down arrow
            if (this.history) {
              var _value = this.history.getNext();

              if (!_value) _value = "";
              this.setInput(_value);
              this.setCursor(_value.length);
            }

            break;

          case "[D":
            // Left Arrow
            this.handleCursorMove(-1);
            break;

          case "[C":
            // Right Arrow
            this.handleCursorMove(1);
            break;

          case "[3~":
            // Delete
            this.handleCursorErase(false);
            break;

          case "[F":
            // End
            this.setCursor(this._input.length);
            break;

          case "[H":
            // Home
            this.setCursor(0);
            break;

          case "b":
            // ALT + LEFT
            ofs = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["closestLeftBoundary"])(this._input, this._cursor);
            if (ofs != null) this.setCursor(ofs);
            break;

          case "f":
            // ALT + RIGHT
            ofs = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["closestRightBoundary"])(this._input, this._cursor);
            if (ofs != null) this.setCursor(ofs);
            break;

          case "\x7F":
            // CTRL + BACKSPACE
            ofs = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["closestLeftBoundary"])(this._input, this._cursor);

            if (ofs != null) {
              this.setInput(this._input.substr(0, ofs) + this._input.substr(this._cursor));
              this.setCursor(ofs);
            }

            break;
        } // Handle special characters

      } else if (ord < 32 || ord === 0x7f) {
        switch (data) {
          case "\r":
            // ENTER
            if (Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["isIncompleteInput"])(this._input)) {
              this.handleCursorInsert("\n");
            } else {
              this.handleReadComplete();
            }

            break;

          case "\x7F":
            // BACKSPACE
            this.handleCursorErase(true);
            break;

          case "\t":
            // TAB
            if (this._autocompleteHandlers.length > 0) {
              var inputFragment = this._input.substr(0, this._cursor);

              var hasTailingSpace = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["hasTailingWhitespace"])(inputFragment);
              var candidates = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["collectAutocompleteCandidates"])(this._autocompleteHandlers, inputFragment); // Sort candidates

              candidates.sort(); // Depending on the number of candidates, we are handing them in
              // a different way.

              if (candidates.length === 0) {
                // No candidates? Just add a space if there is none already
                if (!hasTailingSpace) {
                  this.handleCursorInsert(" ");
                }
              } else if (candidates.length === 1) {
                // Just a single candidate? Complete
                var lastToken = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["getLastToken"])(inputFragment);
                this.handleCursorInsert(candidates[0].substr(lastToken.length) + " ");
              } else if (candidates.length <= this.maxAutocompleteEntries) {
                // search for a shared fragement
                var sameFragment = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["getSharedFragment"])(inputFragment, candidates); // if there's a shared fragement between the candidates
                // print complete the shared fragment

                if (sameFragment) {
                  var _lastToken = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["getLastToken"])(inputFragment);

                  this.handleCursorInsert(sameFragment.substr(_lastToken.length));
                } // If we are less than maximum auto-complete candidates, print
                // them to the user and re-start prompt


                this.printAndRestartPrompt(function () {
                  _this5.printWide(candidates);
                });
              } else {
                // If we have more than maximum auto-complete candidates, print
                // them only if the user acknowledges a warning
                this.printAndRestartPrompt(function () {
                  return _this5.readChar("Display all ".concat(candidates.length, " possibilities? (y or n)")).then(function (yn) {
                    if (yn == "y" || yn == "Y") {
                      _this5.printWide(candidates);
                    }
                  });
                });
              }
            } else {
              this.handleCursorInsert("    ");
            }

            break;

          case "\x03":
            // CTRL+C
            this.setCursor(this._input.length);
            this.term.write("^C\r\n" + ((this._activePrompt || {}).prompt || ""));
            this._input = "";
            this._cursor = 0;
            if (this.history) this.history.rewind();
            break;
        } // Handle visible characters

      } else {
        this.handleCursorInsert(data);
      }
    }
  }]);

  return LocalEchoController;
}();



/***/ }),

/***/ "./lib/Utils.js":
/*!**********************!*\
  !*** ./lib/Utils.js ***!
  \**********************/
/*! exports provided: wordBoundaries, closestLeftBoundary, closestRightBoundary, offsetToColRow, countLines, isIncompleteInput, hasTailingWhitespace, getLastToken, collectAutocompleteCandidates, getSharedFragment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wordBoundaries", function() { return wordBoundaries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closestLeftBoundary", function() { return closestLeftBoundary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closestRightBoundary", function() { return closestRightBoundary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offsetToColRow", function() { return offsetToColRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countLines", function() { return countLines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIncompleteInput", function() { return isIncompleteInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTailingWhitespace", function() { return hasTailingWhitespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLastToken", function() { return getLastToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collectAutocompleteCandidates", function() { return collectAutocompleteCandidates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharedFragment", function() { return getSharedFragment; });
/* harmony import */ var shell_quote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shell-quote */ "./node_modules/shell-quote/index.js");
/* harmony import */ var shell_quote__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shell_quote__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


/**
 * Detects all the word boundaries on the given input
 */

function wordBoundaries(input) {
  var leftSide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var match;
  var words = [];
  var rx = /\w+/g;

  while (match = rx.exec(input)) {
    if (leftSide) {
      words.push(match.index);
    } else {
      words.push(match.index + match[0].length);
    }
  }

  return words;
}
/**
 * The closest left (or right) word boundary of the given input at the
 * given offset.
 */

function closestLeftBoundary(input, offset) {
  var found = wordBoundaries(input, true).reverse().find(function (x) {
    return x < offset;
  });
  return found == null ? 0 : found;
}
function closestRightBoundary(input, offset) {
  var found = wordBoundaries(input, false).find(function (x) {
    return x > offset;
  });
  return found == null ? input.length : found;
}
/**
 * Convert offset at the given input to col/row location
 *
 * This function is not optimized and practically emulates via brute-force
 * the navigation on the terminal, wrapping when they reach the column width.
 */

function offsetToColRow(input, offset, maxCols) {
  var row = 0,
      col = 0;

  for (var i = 0; i < offset; ++i) {
    var chr = input.charAt(i);

    if (chr == "\n") {
      col = 0;
      row += 1;
    } else {
      col += 1;

      if (col > maxCols) {
        col = 0;
        row += 1;
      }
    }
  }

  return {
    row: row,
    col: col
  };
}
/**
 * Counts the lines in the given input
 */

function countLines(input, maxCols) {
  return offsetToColRow(input, input.length, maxCols).row + 1;
}
/**
 * Checks if there is an incomplete input
 *
 * An incomplete input is considered:
 * - An input that contains unterminated single quotes
 * - An input that contains unterminated double quotes
 * - An input that ends with "\"
 * - An input that has an incomplete boolean shell expression (&& and ||)
 * - An incomplete pipe expression (|)
 */

function isIncompleteInput(input) {
  // Empty input is not incomplete
  if (input.trim() == "") {
    return false;
  } // Check for dangling single-quote strings


  if ((input.match(/'/g) || []).length % 2 !== 0) {
    return true;
  } // Check for dangling double-quote strings


  if ((input.match(/"/g) || []).length % 2 !== 0) {
    return true;
  } // Check for dangling boolean or pipe operations


  if (input.split(/(\|\||\||&&)/g).pop().trim() == "") {
    return true;
  } // Check for tailing slash


  if (input.endsWith("\\") && !input.endsWith("\\\\")) {
    return true;
  }

  return false;
}
/**
 * Returns true if the expression ends on a tailing whitespace
 */

function hasTailingWhitespace(input) {
  return input.match(/[^\\][ \t]$/m) != null;
}
/**
 * Returns the last expression in the given input
 */

function getLastToken(input) {
  // Empty expressions
  if (input.trim() === "") return "";
  if (hasTailingWhitespace(input)) return ""; // Last token

  var tokens = Object(shell_quote__WEBPACK_IMPORTED_MODULE_0__["parse"])(input);
  return tokens.pop() || "";
}
/**
 * Returns the auto-complete candidates for the given input
 */

function collectAutocompleteCandidates(callbacks, input) {
  var tokens = Object(shell_quote__WEBPACK_IMPORTED_MODULE_0__["parse"])(input);
  var index = tokens.length - 1;
  var expr = tokens[index] || ""; // Empty expressions

  if (input.trim() === "") {
    index = 0;
    expr = "";
  } else if (hasTailingWhitespace(input)) {
    // Expressions with danging space
    index += 1;
    expr = "";
  } // Collect all auto-complete candidates from the callbacks


  var all = callbacks.reduce(function (candidates, _ref) {
    var fn = _ref.fn,
        args = _ref.args;

    try {
      return candidates.concat(fn.apply(void 0, [index, tokens].concat(_toConsumableArray(args))));
    } catch (e) {
      console.error("Auto-complete error:", e);
      return candidates;
    }
  }, []); // Filter only the ones starting with the expression

  return all.filter(function (txt) {
    return txt.startsWith(expr);
  });
}
function getSharedFragment(fragment, candidates) {
  // end loop when fragment length = first candidate length
  if (fragment.length >= candidates[0].length) return fragment; // save old fragemnt

  var oldFragment = fragment; // get new fragment

  fragment += candidates[0].slice(fragment.length, fragment.length + 1);

  for (var i = 0; i < candidates.length; i++) {
    // return null when there's a wrong candidate
    if (!candidates[i].startsWith(oldFragment)) return null;

    if (!candidates[i].startsWith(fragment)) {
      return oldFragment;
    }
  }

  return getSharedFragment(fragment, candidates);
}

/***/ }),

/***/ "./node_modules/shell-quote/index.js":
/*!*******************************************!*\
  !*** ./node_modules/shell-quote/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.quote = function (xs) {
  return xs.map(function (s) {
    if (s && typeof s === 'object') {
      return s.op.replace(/(.)/g, '\\$1');
    } else if (/["\s]/.test(s) && !/'/.test(s)) {
      return "'" + s.replace(/(['\\])/g, '\\$1') + "'";
    } else if (/["'\s]/.test(s)) {
      return '"' + s.replace(/(["\\$`!])/g, '\\$1') + '"';
    } else {
      return String(s).replace(/([A-z]:)?([#!"$&'()*,:;<=>?@\[\\\]^`{|}])/g, '$1\\$2');
    }
  }).join(' ');
}; // '<(' is process substitution operator and
// can be parsed the same as control operator


var CONTROL = '(?:' + ['\\|\\|', '\\&\\&', ';;', '\\|\\&', '\\<\\(', '>>', '>\\&', '[&;()|<>]'].join('|') + ')';
var META = '|&;()<> \\t';
var BAREWORD = '(\\\\[\'"' + META + ']|[^\\s\'"' + META + '])+';
var SINGLE_QUOTE = '"((\\\\"|[^"])*?)"';
var DOUBLE_QUOTE = '\'((\\\\\'|[^\'])*?)\'';
var TOKEN = '';

for (var i = 0; i < 4; i++) {
  TOKEN += (Math.pow(16, 8) * Math.random()).toString(16);
}

exports.parse = function (s, env, opts) {
  var mapped = parse(s, env, opts);
  if (typeof env !== 'function') return mapped;
  return mapped.reduce(function (acc, s) {
    if (typeof s === 'object') return acc.concat(s);
    var xs = s.split(RegExp('(' + TOKEN + '.*?' + TOKEN + ')', 'g'));
    if (xs.length === 1) return acc.concat(xs[0]);
    return acc.concat(xs.filter(Boolean).map(function (x) {
      if (RegExp('^' + TOKEN).test(x)) {
        return JSON.parse(x.split(TOKEN)[1]);
      } else return x;
    }));
  }, []);
};

function parse(s, env, opts) {
  var chunker = new RegExp(['(' + CONTROL + ')', // control chars
  '(' + BAREWORD + '|' + SINGLE_QUOTE + '|' + DOUBLE_QUOTE + ')*'].join('|'), 'g');
  var match = s.match(chunker).filter(Boolean);
  var commented = false;
  if (!match) return [];
  if (!env) env = {};
  if (!opts) opts = {};
  return match.map(function (s, j) {
    if (commented) {
      return;
    }

    if (RegExp('^' + CONTROL + '$').test(s)) {
      return {
        op: s
      };
    } // Hand-written scanner/parser for Bash quoting rules:
    //
    //  1. inside single quotes, all characters are printed literally.
    //  2. inside double quotes, all characters are printed literally
    //     except variables prefixed by '$' and backslashes followed by
    //     either a double quote or another backslash.
    //  3. outside of any quotes, backslashes are treated as escape
    //     characters and not printed (unless they are themselves escaped)
    //  4. quote context can switch mid-token if there is no whitespace
    //     between the two quote contexts (e.g. all'one'"token" parses as
    //     "allonetoken")


    var SQ = "'";
    var DQ = '"';
    var DS = '$';
    var BS = opts.escape || '\\';
    var quote = false;
    var esc = false;
    var out = '';
    var isGlob = false;

    for (var i = 0, len = s.length; i < len; i++) {
      var c = s.charAt(i);
      isGlob = isGlob || !quote && (c === '*' || c === '?');

      if (esc) {
        out += c;
        esc = false;
      } else if (quote) {
        if (c === quote) {
          quote = false;
        } else if (quote == SQ) {
          out += c;
        } else {
          // Double quote
          if (c === BS) {
            i += 1;
            c = s.charAt(i);

            if (c === DQ || c === BS || c === DS) {
              out += c;
            } else {
              out += BS + c;
            }
          } else if (c === DS) {
            out += parseEnvVar();
          } else {
            out += c;
          }
        }
      } else if (c === DQ || c === SQ) {
        quote = c;
      } else if (RegExp('^' + CONTROL + '$').test(c)) {
        return {
          op: s
        };
      } else if (RegExp('^#$').test(c)) {
        commented = true;

        if (out.length) {
          return [out, {
            comment: s.slice(i + 1) + match.slice(j + 1).join(' ')
          }];
        }

        return [{
          comment: s.slice(i + 1) + match.slice(j + 1).join(' ')
        }];
      } else if (c === BS) {
        esc = true;
      } else if (c === DS) {
        out += parseEnvVar();
      } else out += c;
    }

    if (isGlob) return {
      op: 'glob',
      pattern: out
    };
    return out;

    function parseEnvVar() {
      i += 1;
      var varend, varname; //debugger

      if (s.charAt(i) === '{') {
        i += 1;

        if (s.charAt(i) === '}') {
          throw new Error("Bad substitution: " + s.substr(i - 2, 3));
        }

        varend = s.indexOf('}', i);

        if (varend < 0) {
          throw new Error("Bad substitution: " + s.substr(i));
        }

        varname = s.substr(i, varend - i);
        i = varend;
      } else if (/[*@#?$!_\-]/.test(s.charAt(i))) {
        varname = s.charAt(i);
        i += 1;
      } else {
        varend = s.substr(i).match(/[^\w\d_]/);

        if (!varend) {
          varname = s.substr(i);
          i = s.length;
        } else {
          varname = s.substr(i, varend.index);
          i += varend.index - 1;
        }
      }

      return getVar(null, '', varname);
    }
  }) // finalize parsed aruments
  .reduce(function (prev, arg) {
    if (arg === undefined) {
      return prev;
    }

    return prev.concat(arg);
  }, []);

  function getVar(_, pre, key) {
    var r = typeof env === 'function' ? env(key) : env[key];
    if (r === undefined && key != '') r = '';else if (r === undefined) r = '$';

    if (typeof r === 'object') {
      return pre + TOKEN + JSON.stringify(r) + TOKEN;
    } else return pre + r;
  }
}

/***/ })

/******/ })["default"];
//# sourceMappingURL=local-echo.js.map
