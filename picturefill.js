/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w, $ ){

	// Enable strict mode
	"use strict";

	w.picturefill = function() {
		var ps = w.document.getElementsByTagName( "span" );

		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			if( ps[ i ].getAttribute( "data-picture" ) !== null ){

				var sources = ps[ i ].getElementsByTagName( "span" ),
					matches = [];

				// See if which sources match
				for( var j = 0, jl = sources.length; j < jl; j++ ){
					var media = sources[ j ].getAttribute( "data-media" );
					// if there's no media specified, OR w.matchMedia is supported 
					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
						matches.push( sources[ j ] );
					}
				}

				// Find any existing img element in the picture element
				var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

				if( matches.length ){
					var matchedEl = matches.pop();
					if( !picImg || picImg.parentNode.nodeName === "NOSCRIPT" ){
						picImg = w.document.createElement( "img" );
						picImg.alt = ps[ i ].getAttribute( "data-alt" );
					}

					if ( isInView(matchedEl) ) {
						picImg.src =  matchedEl.getAttribute( "data-src" );
						matchedEl.appendChild( picImg );
					}
				}
				else if( picImg ){
					picImg.parentNode.removeChild( picImg );
				}
			}
		}
	};

	function isInView(elem) {
		var vpH = getViewportHeight(),
			scrolltop = ( document.documentElement.scrollTop ?
				document.documentElement.scrollTop :
				document.body.scrollTop ),
			top = getOffsetTop(elem);
		
		//console.log("viewport height: ", vpH, " scrolltop: ", scrolltop, " offset top: ", top);

		if ( scrolltop > top || scrolltop + vpH < top ) {
			return false;
		} else if ( scrolltop < top ) {
			return true;
		}
	}

	function getOffsetTop(elem) {
		var top = 0;
		while (elem.tagName != "BODY") {
			top = top + elem.offsetTop;
			elem = elem.offsetParent;
		}
		return top;
	}

	function getViewportHeight() {
		var height = window.innerHeight; // Safari, Opera
		var mode = document.compatMode;

		if ( (mode || !$.support.boxModel) ) { // IE, Gecko
			height = (mode == 'CSS1Compat') ?
			document.documentElement.clientHeight : // Standards
			document.body.clientHeight; // Quirks
		}

		return height;
	}

	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.picturefill, false );
		w.addEventListener( "scroll", w.picturefill, false );
		w.addEventListener( "DOMContentLoaded", function(){
			w.picturefill();
			// Run once only
			w.removeEventListener( "load", w.picturefill, false );
		}, false );
		w.addEventListener( "load", w.picturefill, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill );
		w.attachEvent( "onscroll", w.picturefill );
	}

}( this, jQuery ));
