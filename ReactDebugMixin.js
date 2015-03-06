/*global console*/

var ReactDebugMixin ;
(function () {
    'use strict';

    // Console Aliases
    var log =     console.log             .bind(console);
    var nfo =     console.info            .bind(console);
    var time =    console.time            .bind(console);
    var timeE =   console.timeEnd         .bind(console);
    var grp =     console.group           .bind(console);
    var grpE =    console.groupEnd        .bind(console);
    var grpC =    console.groupCollapsed  .bind(console);

    ReactDebugMixin = {

        componentWillMount: function() {
          this._consoleCheck();
              this.debugUpdateCount = 0;
              time("MountTime");
        },

        debug: function(name, extra, collapse){
          this.componentName = name || 'componentName';
          this.stateKey = extra || "_x_EMPTY_x_";
          this.collapsed = collapse || false;
          this.log("Wil Mount");
        },

        log: function log(message) {
          if (this.collapsed === true) {
            grpC(this.componentName + " " + message + ": ", this.props);
          } else {
            grp(this.componentName + " " + message + ": ");
          }
        },

        extra: function(){
          if (this.stateKey !== "_x_EMPTY_x_"){
              if (this.stateKey in this.state){
                  nfo(this.stateKey+":", this.state[this.stateKey]);
              } else {
                  throw new Error("ReactDebug: `"+this.stateKey+"` does not exist on this component");
              }
          }
        },

        componentDidMount: function(){
          this.log("Will Mount");
          this.log("Did Mount");
          this.debugmounted = true;
          timeE("MountTime");
          this.extra();
          this.log("Did Mount");
        },

        componentWillReceiveProps: function(nextProps) {
          this.log("Will Receive Props");
          log("next Props: %O", nextProps);
          this.extra();
        },

        componentWillUpdate: function(nextProps, nextState){
          this.log("Will Update");
              log("next Props: %O", nextProps);
              log("next State: %O", nextState);
              this.extra();
              time("UpdateTime");
        },

        componentDidUpdate: function(prevProps, prevState){
          grpE(this.componentName+" Will Receive Props: ");
          grpE(this.componentName+" Will Update: ");

          this.log("Did Update");
              timeE("UpdateTime");
              this.debugUpdateCount++;
              log("UpdateCounter: "+this.debugUpdateCount);
              log("previous Props: %O", prevProps);
              log("previous State: %O", prevState);
              this.extra();
          grpE(this.componentName+" Did Update: ");
        },

        componentWillUnmount: function() {
            this.log('Will Unmount');
              log("Total UpdateCounter: "+this.debugUpdateCount);
              this.extra();
          grpE(this.componentName+" Will Unmount: ");
        },

        _consoleCheck: function() {
          // Avoid `console` errors in browsers that lack a console.
          var fallback = function() {};
          var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn', 'table'];

          if (typeof console === 'undefined') {
              console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
          }

          for(var i in methods) {
              if(typeof console[methods[i]] === 'undefined') {
                  console[methods[i]] = fallback;
              }
          }
        }
    };

})();
