(function() {
  var Eventer, Game, Intro, Level, Map, a, intro_layout, main, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Game = (function() {

    function Game() {
      this.update = __bind(this.update, this);
      this.tick = __bind(this.tick, this);      this.t1 = this.t2 = Date.now();
      this.dt = 0;
      this.window = window;
      this.animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
    }

    Game.prototype.tick = function() {
      this.t2 = Date.now();
      this.dt = this.t2 - this.t1;
      this.t1 = this.t2;
      this.update();
      return this.animFrame.call(this.window, this.tick);
    };

    Game.prototype.update = function() {
      return this.level.update(this.dt);
    };

    Game.prototype.start = function(level, canvas_id) {
      this.level = new level(this.window, canvas_id);
      this.tick();
      return console.log("started");
    };

    return Game;

  })();

  Eventer = (function() {

    function Eventer() {}

    Eventer._listeners = {};

    Eventer.prototype.addListener = function(type, listener) {
      if (this._listeners[type] != null) this._listeners[type] = [];
      return this._listeners[type].push(listener);
    };

    Eventer.prototype.trigger = function(event) {
      var listener, listeners, _i, _len, _results;
      if (typeof event("string")) {
        event = {
          type: event
        };
      }
      if (!event.target) event.target = this;
      if (this._listeners[event.type](instanceOf(Array))) {
        listeners = this._listeners[event.type];
        _results = [];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          listener = listeners[_i];
          _results.push(listener.call(this, event));
        }
        return _results;
      }
    };

    Eventer.prototype.removeListener = function(type, listener) {
      var key, listener_in, listeners, _len, _results;
      if (this._listeners[type](instanceOf(Array))) {
        listeners = this._listeners[type];
        _results = [];
        for (listener_in = 0, _len = listeners.length; listener_in < _len; listener_in++) {
          key = listeners[listener_in];
          if (listener_in(listener)) {
            _results.push(listeners.slice(key, (key + 1)));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    return Eventer;

  })();

  Level = (function(_super) {

    __extends(Level, _super);

    function Level(window, canvas_id) {
      this.window = window;
      this.canvas = document.getElementById(canvas_id);
      this.ctx = this.initcanvas();
      this.setup();
    }

    Level.prototype.initcanvas = function() {
      return this.canvas.getContext('2d');
    };

    Level.prototype.setup = function() {
      return console.log("set up");
    };

    Level.prototype.update = function(dt) {
      return console.log("Mode update" + dt);
    };

    return Level;

  })(Eventer);

  Intro = (function(_super) {

    __extends(Intro, _super);

    function Intro() {
      Intro.__super__.constructor.apply(this, arguments);
    }

    Intro.prototype.setup = function() {
      this.map = new Map(intro_layout);
      return console.log("Intro set up");
    };

    Intro.prototype.update = function(dt) {
      this.fps = Math.round(1000 / dt);
      this.ctx.clearRect(0, 0, 200, 200);
      this.ctx.font = "Bold 20px Monospace";
      return this.ctx.fillText("" + this.fps + " FPS", 10, 20);
    };

    return Intro;

  })(Level);

  intro_layout = {
    tiles: [(_ref = "../images/sprite1.png", a = _ref[0], _ref)],
    layout: [[a, a, a, a, a, a], [a, a, a, a, a, a]]
  };

  Map = (function() {

    function Map(layout) {
      this.layout = layout;
      this.load();
    }

    Map.prototype.load = function() {
      var imgSrc, key, _len, _ref2, _results;
      this.tiles = this.layout.tiles;
      console.log('Loading Tile Images');
      _ref2 = this.tiles;
      _results = [];
      for (imgSrc = 0, _len = _ref2.length; imgSrc < _len; imgSrc++) {
        key = _ref2[imgSrc];
        _results.push(console.log('Loading tile ' + key + 'src = ' + imgSrc));
      }
      return _results;
    };

    return Map;

  })();

  main = new Game;

  main.start(Intro, 'game');

}).call(this);
