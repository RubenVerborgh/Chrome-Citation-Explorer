var $form = $('#aspnetForm');
var $citationPane;
var buttonClicked;

// Capture submits of the ASP.Net form.
$form.submit(function () {
  // If the 'Export Citation' button was clicked
  if (buttonClicked.value === 'Export Citation') {
    // Submit the form through AJAX
    var data = $form.serializeArray();
    data.push(buttonClicked);
    $.ajax({
      type: "POST",
      url: window.location.toString(),
      data: data,
      success: showCitation
    });
    // Make the citation pane ready
    showCitationPane();
    // Prevent the default form submission
    return false;
  }
});

// Capture click event of submit buttons,
// to determine later on what button was clicked.
$form.find(':submit').click(function () {
  buttonClicked = this;
});

// Show (or create) a pane that will display the citation.
function showCitationPane() {
  if(!$citationPane) {
    $citationPane = $('<textarea>')
       .css({ display: 'block', width: '100%', height: '250px' }); 
    $(buttonClicked).after($citationPane);
  }
  $citationPane.text('');
  $citationPane.hide().fadeIn();
}

// Show the citation in the pane.
function showCitation(data) {
  $citationPane.text(data)
               .focus()
               .select();
}

// Make BibTex the default citation format.
$('option[value="BibTex"]').attr('selected', 'selected');
