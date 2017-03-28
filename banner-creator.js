var currentForm = "";
var imgUploadPath = "";

////////////////////////// Banner Groups Toggle ////////////////////////////////
$(document).ready(function() {

  $(document).on('change', '.div-toggle', showTemplateOptions);//event for template toggle select

  $('.banner-thumb').click(showFormOnClick);//event for template toggle select

  $("#preview").click(textPreview);//generate preview button selected
});

/*********************************************************
function to show the template options based
on the selection in the dropdown
*********************************************************/
function showTemplateOptions (event){
  var target = $(this).data('target');//gets reference to ".banner-groups"
  var show = $("option:selected", this).data('show');//gets the class of the selected item

  $(target).children().addClass('hide');//hides all children of target/ ".banner-groups"
  $(show).removeClass('hide');//removes hide class from the selected div, shows

  //hide any visible form
  $(".form.active").hide();

  //hide any visible image
  $("#img-uploader").hide();

}

/*********************************************************
function to show correct for selected banner
*********************************************************/
function showFormOnClick (event){

    var clickedBanner =  $(this).attr("id");//get which banner was clicked
    var formToShow = "#" + clickedBanner + "-form";
    currentForm = formToShow;

    //remove active state if already active
    $(".active-banner-toggle").removeClass("active-banner-toggle");

    //add active state to selected banner toggle
    $(this).addClass("active-banner-toggle");

    //hide any visible form
    $(".form.active").hide();
    $(formToShow).removeClass("active");

    $(formToShow).show();//show new form
    $(formToShow).addClass("active");

    //show image uploader
    $("#img-uploader").show();

    //scroll down to form
    $('html, body').animate({
        scrollTop: $("#form-holder").offset().top
    }, 1000, 'swing');

}

/*********************************************************
Background image preview
*********************************************************/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-preview').attr('src', e.target.result);
            imgUploadPath = e.target.result;
            $('#img-preview').show();
        };

        reader.readAsDataURL(input.files[0]);
    }
}

/*********************************************************
Input Text Preview
*********************************************************/
function textPreview(event) {

  var headline = $(currentForm + ' .input_headline').val();
  var subhead = $(currentForm + ' .input_subhead').val();
  var disclaimer = $(currentForm + ' .input_disclaimer').val();
  var cta = $(currentForm + ' .input_cta').val();


  $("#banner-preview-holder").show();

  //add background img

  if(imgUploadPath){
      //set up as background image
      $(".banner-preview").css('background-image', 'url(' + imgUploadPath + ')');
  }

  $(".banner-preview .bannerHeadline").html(headline);
  $(".banner-preview .subhead").html(subhead);
  $(".banner-preview .disclaimer").html(disclaimer);
  $(".banner-preview .bannerBTN").html(cta);

  //scroll down to banner preview
    $('html, body').animate({
        scrollTop: $("#banner-preview-holder").offset().top
    }, 1000, 'swing');

}

/*********************************************************
Create Canvas Elements
*********************************************************/


  var canvas = document.getElementById('bannerCanvas');
  ctx = canvas.getContext('2d');

  // Set the text style to that to which we are accustomed

  canvas.width = 444;
  canvas.height = 296;

  //  Grab the nodes
  var img = document.getElementById('start-image');
  var topText = document.getElementById('top-text');
  var bottomText = document.getElementById('bottom-text');
  var cta = document.getElementById('cta');

  // When the image has loaded...
  img.onload = function() {
    drawCanvas()
  }

  topText.addEventListener('keydown', drawCanvas)
  topText.addEventListener('keyup', drawCanvas)
  topText.addEventListener('change', drawCanvas)

  bottomText.addEventListener('keydown', drawCanvas)
  bottomText.addEventListener('keyup', drawCanvas)
  bottomText.addEventListener('change', drawCanvas)

  cta.addEventListener('keydown', drawCanvas)
  cta.addEventListener('keyup', drawCanvas)
  cta.addEventListener('change', drawCanvas)


  function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw Headline
    var text1 = document.getElementById('top-text').value;
    ctx.font = '42px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    wrapText(ctx, text1, 25, 25, 600, 50, false);

    // Draw Subhead
    var text2 = document.getElementById('bottom-text').value;
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    wrapText(ctx, text2, 31, 75, 300, 50, false);

    //CTA Text
    var cta = document.getElementById('cta').value;
    var btnTxt = document.getElementById('cta').value;
    var btnTextWidth = ctx.measureText(btnTxt).width;
    console.log(btnTextWidth);

    // Draw Button
    ctx.beginPath();
    ctx.fillStyle = "#007ab6";
    ctx.rect(35, 220, btnTextWidth + 15, 50);
    ctx.fill();

    // Render Text
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    wrapText(ctx, cta, 95, 237, btnTextWidth, 20, false);

    //visual feeback
    // ctx.fillText("width:" + ctx.measureText(btnTxt).width, 400, 50)
    // ctx.fillText(btnTxt, 400, 100);

  }

  function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {

    var pushMethod = (fromBottom)?'unshift':'push';

    lineHeight = (fromBottom)?-lineHeight:lineHeight;

    var lines = [];
    var y = y;
    var line = '';
    var words = text.split(' ');

    for (var n = 0; n < words.length; n++) {
      var testLine = line + ' ' + words[n];
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;

      if (testWidth > maxWidth) {
        lines[pushMethod](line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines[pushMethod](line);

    for (var k in lines) {
      context.strokeText(lines[k], x, y + lineHeight * k);
      context.fillText(lines[k], x, y + lineHeight * k);
    }


  }
