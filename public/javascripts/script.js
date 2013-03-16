var popupProductHaml = 
  Haml.compile('div(id="popup")',
               '  div(id="popup-content")',
               '    div(id="title") #{title}',
               '    div(id="close-button") close',
               '    div(id="content")',
               '      div(id="big-image-cover")',
               '        img(src="img/uploads/products/#{productId}/#{productId}0.jpg", id="big-image")',
               '      div(id="small-image")',
               '        img(src="img/uploads/products/#{productId}/#{productId}0.jpg", class="small-image")',
               '        img(src="img/uploads/products/#{productId}/#{productId}1.jpg", class="small-image")',
               '        img(src="img/uploads/products/#{productId}/#{productId}2.jpg", class="small-image")');
var popupServiceHaml = 
  Haml.compile('div(id="popup")',
               '  div(id="popup-content")',
               '    div(id="title") #{title}',
               '    div(id="close-button") close',
               '    div(id="content")',
               '      div(id="popup-service-image")',
               '        img(src="img/uploads/services/#{serviceId}0.jpg", class="service-image")',
               '        img(src="img/uploads/services/#{serviceId}1.jpg", class="service-image")',
               '        img(src="img/uploads/services/#{serviceId}2.jpg", class="service-image")',
               '      div(id="popup-service-fullDes")');

var serviceDes = [
  { 'id': 0, 'name': 'Sửa Chữa', 'shordDes': 'asdas asd asd asd asd gdfg ', 'fullDes': 'Sửa chữa chi tiết và máy móc công trình' },
  { 'id': 1, 'name': 'Gia Công', 'shordDes': 'Gia công những sản phẩm về cơ khí có độ chính xác cao, có tính bền', 'fullDes': 'Gia công những sản phẩm về cơ khí có độ chính xác cao, có tính bền' },
  { 'id': 2, 'name': 'Sản Xuất', 'shordDes': 'Chế tạo những cụm chi tiết trong máy thuỷ lực', 'fullDes': 'Chế tạo những cụm chi tiết trong máy thuỷ lực:<br>- Các cụm piston, xylanh, mặt chia dầu… dùng cho các loại bơm piston có điều chỉnh công suất tự động<br>- Các cụm chi tiết trong bơm hương kính<br>- Các cụm chi tiết trong bơm cánh gạt<br>- Các cụm chi tiết trom bơm bánh răng<br>- Chế tạo mới và phục hồi các loại ngăn kéo thuỷ lực<br>- Chế tạo mới và phục hồi các loại van thuỷ lực' },
  { 'id': 3, 'name': 'Lắp Đặt', 'shordDes': 'Tư vấn, chuyển giao công nghệ về chế tạo các cụm chi tiết thuỷ lực và cơ khí', 'fullDes': '- Có đội ngũ cán bộ đi khảo sát và lắp giáo điều chỉnh máy tại công trường<br>- Tư vấn thiết kế và chế tạo các loại máy thuỷ lực<br>- Chuyển giao công nghệ chế tạo các cụm chi tiết thuỷ lực và cơ khí' },
];

$(".parent-menu").hover(
  function() {
    var subMenu = $(this).find("#subMenu");
    if(subMenu.length > 0) {
      $(subMenu).slideDown('fast');
    }
  }, 
  function(){
    var subMenu = $(this).find("#subMenu");
    if(subMenu.length > 0) {
      $(subMenu).slideUp('fast');
    }
  });

$("#back-top").hide();

// fade in #back-top
$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('#back-top a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});

$(".product").click(function() {
  var popup = createNode(popupProductHaml({ 'title': $(this).data('title'),
                                     'productId': $(this).data('id')
                                  })
                        );
  popup.style.display = 'none';
  Popup.open(document.body, popup);
  $(popup).fadeIn(200);
  $("#big-image").css('height', window.innerHeight - 200 + 'px');
});

$('#dim, #close-button').live('click', function() { 
  $('#popup').fadeOut(400 , function() {
	  Popup.close(); 
  }); 
  return false;
});

$('.small-image').live('click', function() { 
  document.getElementById('big-image').src = this.src;
});

$('#productType-select').change(function() {
  window.location.href = '/products?startIndex=0&type=' + $(this).val();
});

$(".service-panel").click(function() {
  var popup = createNode(popupServiceHaml({ 'title': this.querySelector('#service-name').innerHTML,
                                            'serviceId': this.querySelector('#id').innerHTML
                                  })
                        );
  popup.style.display = 'none';
  popup.querySelector('#popup-service-fullDes').innerHTML = serviceDes[this.querySelector('#id').innerHTML].fullDes;
  Popup.open(document.body, popup);
  $(popup).fadeIn(200);
  // $("#big-image").css('height', window.innerHeight - 200 + 'px');
});

function scrollToProducts() {
  if (window.location.pathname == '/products') {
    $('body').animate({ scrollTop: $("#products").offset().top }, 800);
  }
}