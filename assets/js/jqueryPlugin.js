/*!
  jQuery [name] plugin
  @name jquery.[name].js
  @author [author name] ([author email] or @[author twitter])
  @version 1.0
  @date 01/01/1970
  @category jQuery Plugin
  @copyright (c) 1970 [company/person name] ([company/person website])
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/

/* the semi-colon before the function invocation is a safety 
 * net against concatenated scripts and/or other plugins 
 * that are not closed properly. */
;(function ( $, window, document, undefined ) {
    
    /* undefined is used here as the undefined global 
     * variable in ECMAScript 3 and is mutable (i.e. it can 
     * be changed by someone else). undefined isn't really 
     * being passed in so we can ensure that its value is 
     * truly undefined. In ES5, undefined can no longer be 
     * modified.
    
     * window and document are passed through as local 
     * variables rather than as globals, because this (slightly) 
     * quickens the resolution process and can be more 
     * efficiently minified (especially when both are 
     * regularly referenced in your plugin). */

    // Create the defaults once
    var pluginName = 'PluginName',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        /* jQuery has an extend method that merges the 
         * contents of two or more objects, storing the 
         * result in the first object. The first object 
         * is generally empty because we don't want to alter 
         * the default options for future instances of the plugin */
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype = {
        
        /* Place initialization logic here
         * You already have access to the DOM element and
         * the options via the instance, e.g. this.element 
         * and this.options */
        init: function() {
            console.log('Init');
        },

        method1: function() {
            response = 'method1 no args';
        },
        
        method2: function(args) {
            response = 'method2. Args = '+args;
        }

    }

    /* A really lightweight plugin wrapper around the constructor, 
     * preventing against multiple instantiations */
    $.fn[pluginName] = function ( options ) {

        /* 
         * this is a global return value, to enable us get values from methods 
         * instead of the selector object itself 
         */
        response = null;

        // slice arguments to leave only arguments after function name
        var args = Array.prototype.slice.call(arguments, 1);        
        
        /* return */
        this.each(function () {
        
            if (!$.data(this, 'plugin_' + pluginName)) {
        
                if(typeof options === 'string') {

                    // get selected operation/method
                    var operation = Plugin.prototype[options];
                    
                    if (operation) {
                        operation.apply(this, args);
                    }else{
                        console.error('Unknow operation: \'' + options + '\'');    
                    }

                } else {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
        
            }
        
        });

        return response;
        
    }

    /* Global Variable to help check if the plugin is installed/included 
     * in the calling script */
    window.Plugin = pluginName;

})( jQuery, window, document );