

$(function() {
		  
	$("#player_form").validate({
	
	  rules: 
	  {
		player_name: "required",
	  },
	  messages: 
	  {
		player_name: 
		{
			required: "<b>Enter Name</b>",
		}  
	  },
	  submitHandler: function(form) 
	  {
		form.submit();
		var player_name = $('#player_name').val();
		localStorage.setItem('playerName', player_name);
	  }
	  
	});
	

  });


jQuery(window).on('load', function(){
    var loader = $(".loader");
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    var progress = 0;
  
    loader.css({
        top: wHeight / 2 - 2.5,
        left: wWidth / 2 - 200
    })

    do {
        loader.animate({
            width: progress
        }, 10)
        progress += 3;
    } while (progress <= 400)
    if (progress === 402) {
        loader.animate({
            left: 0,
            width: '100%'
        })
        loader.animate({
            top: '0',
            height: '100vh'
        })
      setTimeout(function(){
       jQuery(".loader-wrapper").fadeOut(500);
       jQuery(".loader").fadeOut(500);
      }, 3000)
    }
 })
	  
	
	  var player__Name = localStorage.getItem('playerName');

		
	
	$(function(){
		
		var colors = $('#colors li');
		var start = $('#start');
		var gameState = 'waiting';
		var gameSequence = new Array();
		var level = 1;
		var flashNo;
		var clickedNo;
		var setupLightSequence = function() {
			var randomNum =  Math.floor(Math.random() * 4);
			gameSequence[level-1] = randomNum;
			showLightSequence();
		};
		var lightOn = function(no) {
			colors.eq(gameSequence[no]).addClass('on');
		};
		
		var lightOff = function() {
			colors.removeClass('on');
		};
		var showLightSequence = function() {
			lightOff();
	
			if(flashNo < level) {
				var on = setTimeout(function() { 
					var off = setTimeout(function() { 
						showLightSequence(); 
						flashNo++; 
					}, 500);
					lightOn(flashNo);
				}, 500);
			}
			else {
				gameState = 'playing';
				$('body').addClass('playing');
				start.html('<p style="color:#007bff"><i class="fad fa-hand-point-right"></i> Now , Its your turn Choose...</p>');
				clearTimeout(on);
			}	
		};
	
		colors.click(function() {
			if(gameState == 'playing') {
				var selectedSquare = $(this).index();
				if(gameSequence[clickedNo] == selectedSquare) {
					if(clickedNo == level-1) {
						gameState = 'waiting';
						$('body').removeClass('playing');
						start.html('<p style="color:green;"><img src="./img/welcome.svg" class="emoji"> very good , '+player__Name+ '</p> <button class="btn btn-outline-primary"> Next Level <i class="fad fa-chevron-right"></i></button>');
						level++;
					}
											
					lightOn(clickedNo);
					var off = setTimeout(function() { 
						lightOff();
						clickedNo++;
					}, 200);
				}
				else {
					gameState = 'waiting';
					$('body').removeClass('playing');
					start.html('<p style="color:red;"><img src="./img/sad.svg" class="emoji"> game over , '+player__Name+'</p> <button class="btn btn-outline-primary"> Try again <i class="fad fa-redo"></i></button>');
					$('body').removeClass('playing').addClass('game-over');
					level = 1;
					gameSequence = new Array();	
				}
			}
		});
		var init = function() {
			$('#level').html('Level ' + '<span class="badge bg-primary">'+level+'</span>');
			flashNo = 0;
			clickedNo = 0;
			$(this).html('<p style="color:#0066ff;"><i class="far fa-spinner"></i> Watch out ...</p>');
			$('body').removeClass('game-over');
			setupLightSequence();
		}
		start.click(init);
	});
	
