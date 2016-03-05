//Creates the Layer Control
function AdminControl(adminControlDiv, map) {
	
  // Set CSS for the layer control border.
  var adminControlUI = document.createElement('div');
  adminControlUI.style.backgroundColor = '#fff';
  adminControlUI.style.border = '2px solid #fff';
  adminControlUI.style.borderRadius = '3px';
  adminControlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  adminControlUI.style.cursor = 'pointer';
  adminControlUI.style.marginBottom = '22px';
  adminControlUI.style.textAlign = 'center';
  adminControlUI.title = 'Click for Settings';
  adminControlDiv.appendChild(adminControlUI);

  // Set CSS for the layer control interior.
  var adminControlText = document.createElement('div');
  adminControlText.style.color = 'rgb(25,25,25)';
  adminControlText.style.fontSize = '16px';
  adminControlText.style.paddingLeft = '2px';
  adminControlText.style.paddingRight = '2px';
  adminControlText.innerHTML = '<i class="fa fa-cogs fa-2x"></i>';
  adminControlUI.appendChild(adminControlText);

  // Setup the click event listeners
  adminControlUI.addEventListener('click', function() {
  	//$("#sidebar-layers").show('slow').removeClass('displayNone');
  	openSettings();
  });
  
}

function openSettings(){
	$("#settings-page").show('slow');
}

$('li.settings a').on('click', function(){
	//alert($(this).parent().attr('id'));
	var id = $(this).parent().attr('id');
    $(this).parent().addClass('active').siblings().removeClass('active');
    settingListCheck(id);
});

function settingListCheck(id){
	var page = "#settings-" + id;
	$(page).removeClass('hide').siblings('div').addClass('hide divSize');
}

$('.close-button').on('click', function(c){
	$(this).parent().parent().fadeOut('slow', function(c){
	});
});	









