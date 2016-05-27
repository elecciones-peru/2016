$(function() {

	var app_id = '261044157583823';
	var scopes = 'email, user_friends, user_online_presence';

	var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar sesión</a>';

	var div_session = "<div id='facebook-session'>"+
					  "<strong></strong>"+
					  "<img>"+
					  "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
					  "</div>";

	window.fbAsyncInit = function() {

	  	FB.init({
	    	appId      : app_id,
	    	status     : true,
	    	cookie     : true, 
	    	xfbml      : true, 
	    	version    : 'v2.6'
	  	});


	  	FB.getLoginStatus(function(response) {
	    	statusChangeCallback(response, function() {});
	  	});
  	};

  	var statusChangeCallback = function(response, callback) {
  		console.log(response);
   		
    	if (response.status === 'connected') {
      		getFacebookData();
    	} else {
     		callback(false);
    	}
  	}

  	var checkLoginState = function(callback) {
       console.log('entro a  login state' );
    	FB.getLoginStatus(function(response) {
      		callback(response);
    	});
  	}

  	var getFacebookData =  function() {


  		FB.api('/me', function(response) {
	  		$('#login-template').after(div_session);        
	  		$('#login-template').remove();
	  		$('#facebook-session strong').text("Bienvenido: "+response.name);
	  		$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
	  	});
  	}



  	var facebookLogin = function() {
      console.log('entro a facebok login');
  		checkLoginState(function(data) {
         console.log('entro a  login state' + data);
  			if (data.status !== 'connected') {
                        FB.login(function(response) {
                           if (response.status === 'connected') {
                            console.log(' entrara al api ');
                                          
                                       
                                        FB.api(
                                          '/me',
                                          'GET',
                                          {"fields":"picture,first_name,gender,link,timezone"},
                                          function(response) {
                                              $('#login-template').after(div_session);
                                              $('#login-template').remove();
                                               $('#facebook-session strong').text("Bienvenido: "+response.first_name);
                                               $('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
                                            console.log('Good to see you, ' + response.name + '...' + response );
                                          });
                                        
                           if (VerificaExiste===true){


                           }else{
                               vota
                           }

                             
                           } else {
                            console.log('User cancelled login or did not fully authorize.');
                           }
                       });

  			               }
        else { getFacebookData();}
  		})
  	}

  	var facebookLogout = function() {
  		checkLoginState(function(data) {
  			if (data.status === 'connected') {
				FB.logout(function(response) {
					$('#facebook-session').before(login-template);
					$('#facebook-session').remove();
				})
			}
  		})

  	}



  	$(document).on('click', '#login', function(e) {
  		e.preventDefault();
       console.log('entro antes de facebok login');
  		facebookLogin();
  	})

  	$(document).on('click', '#logout', function(e) {
  		e.preventDefault();

  		if (confirm("¿Está seguro?"))
  			facebookLogout();
  		else 
  			return false;
  	})

})