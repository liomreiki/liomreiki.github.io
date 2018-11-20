/******* Do not edit this file *******
Simple Custom CSS and JS - by Silkypress.com
Saved: Mar 16 2018 | 17:17:57 */
/* Default comment here */ 


var quantInterval = false;

function selectMeditationPart(toBeSelected) {
  jQuery('.menuElement').removeClass('selected');
  toBeSelected.addClass('selected');
  jQuery('.meditationElements > div').hide().removeClass('selected');
  jQuery('#' + toBeSelected.find('img').attr('alt')).show().addClass('selected');
}

function nextMeditationPart() {
  var next = jQuery('.menuElement.selected').next('.menuElement');
  if (next.length === 0)
    next = jQuery('.menuElement').first();
  selectMeditationPart(next);
}

function scaledUpGrail(toUp){
  jQuery('.GrailImage').toggleClass('fullScreen', toUp).toggleClass('small', !toUp).toggleClass('big', toUp);
}

function setElephantTimers(containerSel, elementSel, intervalDuration) {
  return setInterval(function() {
    jQuery(elementSel).last().prependTo(jQuery(containerSel));
  }, intervalDuration);
}

function setReverseElephantTimers(containerSel, elementSel, intervalDuration) {
  return setInterval(function() {
    jQuery(elementSel).first().appendTo(jQuery(containerSel));
  }, intervalDuration);
}

function setElephantTempos() {
    var elephTempo = jQuery(".elephTempo").val();
    
    setCookie("elephanttempo", elephTempo);

    clearInterval(elephTimer);      
    clearInterval(daraTimer);     
    clearInterval(dicTimer);
    
    elephTimer = setElephantTimers('.elephant', '.elephant > img.selected', elephTempo);
    daraTimer = setElephantTimers('.daraparacontainer', '.darapara', elephTempo);
    dicTimer = setReverseElephantTimers('.elephDictionary tbody', '.elephDictionary tr:nth-child(n+3)', elephTempo);
}

  
function selectAffirmation(toBeSelected) {
  jQuery('.selectAffirmation li').removeClass('selected');
  toBeSelected.addClass('selected');
  jQuery('.affirmationContent').hide();
  jQuery('#' + toBeSelected.attr('affirmation')).show();
}
  
var elephTimer, daraTimer, dicTimer;

jQuery( document ).ready(function() {
 
      
  var cookieTempo = getCookie("elephanttempo");
  console.log('cookieTempo', cookieTempo);
  if (cookieTempo !== "" && cookieTempo !== "undefined") {
    jQuery(".elephTempo").val(cookieTempo);
  }
  setElephantTempos();
  
  jQuery(".elephTempo").change(function(){
	setElephantTempos();
  });
  
  jQuery(".elephant img").addClass('selected');
  
  jQuery(".elephantThumbs img").click(function(){
	jQuery(this).toggleClass('selected');
    clickedIndex = jQuery(this).attr('alt');
    
    console.log('clickedIndex', clickedIndex);    
    console.log('selector', ".elephant > img[alt='" + clickedIndex + "']");
    console.log('image', jQuery(".elephant > img[alt='" + clickedIndex + "']"));    

    jQuery(".elephant > img[alt='" + clickedIndex + "']").toggleClass('selected');
    setElephantTempos();
  });
  
  // animate healing codes
  setInterval(function() {
    jQuery('.HealCodes > div').last().prependTo(jQuery('.HealCodes'));
  }, 790);
  
  // animate first master
  setInterval(function() {
      jQuery('.mastersFreq').each(function(){
          jQuery(this).children().last().prependTo(jQuery(this));
      });
  }, 790);
  
  jQuery(document).on('input', '.affRange', function() {
    jQuery(".affValue").val(121 - jQuery(".affRange").val());
  });
  
  jQuery(".affRange, .affValue").change(function(){

	if (affirmationTimer || pauseFlag) {
      startAffirmation(null, null, null, jQuery(".affValue").val());
      startAffirmation(null, null, null, jQuery(".affValue").val());
    }
    
  });

  jQuery('.startOmReikiButton').click(function(){
    jQuery('.startOmReikiElement ').toggleClass('bordered');
    jQuery('.meditationOptions').toggle();
    jQuery('.affirmationsInOptions').html('');
    jQuery('.affirmationsInOptions').html(jQuery('.selectAffirmation').clone(true, true));
  });
  
  jQuery('.startOmReiki').click(function(){
    var counter = jQuery('.karaokeCounter input').val();    
    var tempo = jQuery('.karaokeTimer input').val();
    selectMeditationPart(jQuery('.mastersElement.menuElement'));
    
    //counter = 1; tempo = 1;
    
    // reload video to make sure video is it loaded
    // onYouTubeIframeAPIReady();

    invocationArr = ["#invocationText"];
    startAffirmation(invocationArr, 1, function() {
      nextMeditationPart();
      scaledUpAffirmation();
      startAffirmation(getAffirmationSelector(), counter, function() {
        nextMeditationPart();
        //onYouTubeIframeAPIReady();
        toggleVideoPause(symbolsPlayer);
        //videoFullScreen("symbolsPlayer");
      });
    }, tempo); 
    jQuery('.startOmReikiElement ').removeClass('bordered');
    jQuery('.meditationOptions').hide();
  });
  
  // handling keys
  jQuery(document).keydown(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    
    // Keys that work everywhere
    
    if (code == 40) { nextMeditationPart(); } // down key: move to next part of meditation
    if (code == 38) { previousMeditationPart(); } // up key: move to previous part of meditation
    if (code == 27 && quantInterval) { stopQuantec(); } // esc: move to previous part of meditation
    
    if (code == 81) {
        
        
        
        var firstAff = function() {
            selectAffirmation(jQuery('[affirmation="Megacasa"]'));
            startAffirmation(getAffirmationSelectorByName('Megacasa'), 1, nextAff, 1); 
        }
        
        var nextAff = function() {
            selectAffirmation(jQuery('[affirmation="sexsisters"]'));
            startAffirmation(getAffirmationSelectorByName('sexsisters'), 1, firstAff, 1); 
        }
        
        firstAff();
    
    }
    
    
    
    // keys that will work on specific meditation page
    

    switch (jQuery('.meditationElements').children('.selected').attr('id')){
        
        case 'masters':
        
          if (code == 32) 
          { 
            startAffirmation("#invocationText", 1, function() {
              nextMeditationPart();
              scaledUpAffirmation();
              startAffirmation(getAffirmationSelector(), 16, function() {
                nextMeditationPart();
                toggleVideoPause(symbolsPlayer);
              });
          	}); 
		  } // space bar: pause/play invocation
		break;
      
      case 'affirmation':
        
        if (code == 39) { nextAffirmation(); } // right arrow: switch to next animation
        if (code == 37) { previousAffirmation(); } // left arrow: switch to previous animation
        if (code == 13) { scaledUpAffirmation(); } // enter key: toggle affirmation size
        if (code == 187 || code == 107) { scaledUpAffirmation(true); } // plus sign: increase affirmation size
        if (code == 189 || code == 109 || code == 27) { scaledUpAffirmation(false); } // minus sign or esc: decrease affirmation size
        if (code == 32) { startAffirmation(getAffirmationSelector(), 16); } // space bar: pause/play affirmation
        //if (code == 27) { startAffirmation(true); }
        break;
      
      case 'meditation':
        
        if (code == 13 || code == 32) { toggleVideoPause(symbolsPlayer); } // enter key or space bar: pause/play symbols video
        
        break;
      
      case 'prayer':
        
        if (code == 13) { scaledUpGrail(); } // enter key: toggle grail size
        if (code == 187 || code == 107) { scaledUpGrail(true); } // plus sign: increase grail size
        if (code == 189 || code == 109 || code == 27) { scaledUpGrail(false); } // minus sign or esc: decrease grail size
        
        break;
    }
  });
  
  function videoFullScreen(videoContainerId) {

    var e = document.getElementById(videoContainerId);
    console.log('e', e);
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
    } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen();
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
    }
}


  
  function getAffirmationSelectorByName(names) {
    var arr = [];
    jQuery.each( names, function( index, value ){
      arr.push(".superLogos, .aveLogos, .jhwhLogos, .allaLogos, #" + value + " p")
    });
    return arr;
  }
  
  function getAffirmationSelector() {
    var arr = [];
    jQuery('.selectAffirmation li.selected').each(function(){
      arr.push(jQuery(this).attr('affirmation'));
    });
    return getAffirmationSelectorByName(arr);
  }
  
  function getAffirmationQuantecSelectors() {
    var names = getAffirmationQuantecNames();
    return getAffirmationSelectorByName(names);
  }
  
  function getAffirmationQuantecNames() {
    var arr = [];
    if (jQuery('.selectAffirmation li.quantec').length>0){
        jQuery('.selectAffirmation li.quantec').each(function(){
          arr.push(jQuery(this).attr('affirmation'));
        });
    } else{
        jQuery('.selectAffirmation li.selected').each(function(){
          arr.push(jQuery(this).attr('affirmation'));
        });
    }
    return arr;
  }
  
  function toggleVideoPause(currentPlayer) {
  	var state = currentPlayer.getPlayerState();
    if(state==1){
      currentPlayer.pauseVideo();
    } else {
      currentPlayer.playVideo();
    }
  }
  
  jQuery('.affirmationContent').hide().first().show();
  jQuery('.selectAffirmation li').first().addClass('selected');
  
  jQuery('.selectAffirmation li').click(function(e){
    if (e.ctrlKey) {
      jQuery(this).toggleClass('quantec');
    }
    else {
      selectAffirmation(jQuery(this));
    }
  });
  
  function nextAffirmation() {
    var nextAffirmation = jQuery('.selectAffirmation li.selected').next();
    if (nextAffirmation.length == 0)
      nextAffirmation = jQuery('.selectAffirmation li').first();
    selectAffirmation(nextAffirmation);
  }
  
  function previousAffirmation() {
    var prevAffirmation = jQuery('.selectAffirmation li.selected').prev();
    if (prevAffirmation.length == 0)
      prevAffirmation = jQuery('.selectAffirmation li').last();
    selectAffirmation(prevAffirmation);
  }
  
  jQuery('.meditationElements > div').hide().first().show();
  jQuery('.mastersElement.menuElement').addClass('selected');
  
  jQuery('.menuElement').click(function(){
    selectMeditationPart(jQuery(this));
  });
    

  
  function previousMeditationPart() {
    var prev = jQuery('.menuElement.selected').prev('.menuElement');
    if (prev.length == 0)
      prev = jQuery('.menuElement').last();
    selectMeditationPart(prev);
  }
  
  function enableFullscreen(player, elemId) {
      
    player.playVideo();
    
    var iframe = document.getElementById(elemId);
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
      if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
      }
  }
  
  function stopQuantec() {
      jQuery(this).html("Start Quantec");
      clearInterval(quantInterval);
      quantInterval = false;
      symbolsPlayer.pauseVideo();
      songPlayer.pauseVideo();
  }

  jQuery('.quantecPlayButton').click(function(){    
    startAffirmation(getAffirmationQuantecSelectors(), 1000000, null, null, getAffirmationQuantecNames());
    counter = 0
    if (quantInterval)
    {
      stopQuantec();
    }
    else {
      jQuery(this).html("Nowy Quantec");
     
    enableFullscreen(symbolsPlayer, "symbolsPlayer");
    enableFullscreen(songPlayer, "songPlayer");
      
      scaledUpAffirmation(true);
      scaledUpGrail(true);

      quantInterval = setInterval(function(){
        jQuery('.meditationElements > div').hide();
        jQuery('.meditationElements > div:eq( '+ counter + ')').show();

        if (counter < 4) {
          counter = counter + 1;
        }
        else 
        {
          counter = 0
        }
      }, jQuery(".quantecFrequency input").val());
    }
    
  });
  
  jQuery('.affirmation').click(function(){
    scaledUpAffirmation();
  });
  
  function scaledUpAffirmation(addOrRemove){
    jQuery('.affirmation').parent().toggleClass('scaledUpAffirmation', addOrRemove);
  }
  
  jQuery('.GrailImage').click(function(){
    scaledUpGrail();
  });
  
  jQuery('.invocationElement').hide().first().show();
  
  jQuery('.mastersIcons').mouseenter(function(){
    jQuery('.invocationElement').hide();
    jQuery('#' + jQuery(this).attr('target')).show();
  });
  
  jQuery('.mastersGallery').mouseleave(function(){
    jQuery('.invocationElement').hide()
    jQuery('#invocationText').show();
  });
  
  jQuery("body").on("mousemove",function(event) {
    if (event.pageY < 32) {
      jQuery('#wpadminbar').slideDown();
    }
  });
  
  jQuery('#wpadminbar').mouseleave(function(){
    jQuery(this).slideUp();
  });
  
  
});




  
