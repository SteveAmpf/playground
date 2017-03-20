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
