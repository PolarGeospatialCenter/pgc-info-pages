(function(name, factory){
    typeof require == "undefined" ?
        (typeof dojo != "undefined" && dojo.provide(name)) &
            // direct script
            factory(this[name] = {}) :
        typeof exports == "undefined" ?
            // browser transport/C loader or RequireJS
            define(name, ["exports"], factory) :
            // CommonJS environment
            factory(exports);
})("settings", function(exports){
	exports.data = 
		{
			"zip"		:	55108
		};
});