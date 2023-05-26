$(".custom-select-one").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger-one">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options-one">';
        $(this).find("option").each(function() {
          template += '<span class="custom-option-one ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
    template += '</div></div>';
    
    $(this).wrap('<div class="custom-select-wrapper-one"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option-one:first-of-type").hover(function() {
    $(this).parents(".custom-options-one").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options-one").removeClass("option-hover");
  });
  $(".custom-select-trigger-one").on("click", function() {
    $('html').one('click',function() {
      $(".custom-select-one").removeClass("opened");
    });
    $(this).parents(".custom-select-one").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option-one").on("click", function() {
    $(this).parents(".custom-select-wrapper-one").find("select").val($(this).data("value"));
    $(this).parents(".custom-options-one").find(".custom-option-one").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select-one").removeClass("opened");
    $(this).parents(".custom-select-one").find(".custom-select-trigger-one").text($(this).text());
  });


  $(function() {

    $('.js-check-all').on('click', function() {
  
      if ( $(this).prop('checked') ) {
        $('th input[type="checkbox"]').each(function() {
          $(this).prop('checked', true);
          $(this).closest('tr').addClass('active');
        })
      } else {
        $('th input[type="checkbox"]').each(function() {
          $(this).prop('checked', false);
          $(this).closest('tr').removeClass('active');
        })
      }
  
    });
  
    $('th[scope="row"] input[type="checkbox"]').on('click', function() {
      if ( $(this).closest('tr').hasClass('active') ) {
        $(this).closest('tr').removeClass('active');
      } else {
        $(this).closest('tr').addClass('active');
      }
    });
  });