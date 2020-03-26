$(function(){
  
  var buildHTML = function(message) {
    if ( message.content && message.image ) {
      var html =
       `<div class="message_contents_list" data-message-id = ${message.id} >
          <div class="message_contents_list_text_1">
            <div class="message_contents_list_text_1_name">
              ${message.user_name}
            </div>
            <div class="message_contents_list_text_1_day">
              ${message.created_at}
            </div>
          </div>
          <div class="message_contents_list_text_2">
            <p class="message_contents_list_text_2_lower_message">
              ${message.content}
            </p>
            <img src=${message.image} >
          </div>
        </div>`
        return html;
    } else if (message.content) {
      var html =
      `<div class="message_contents_list" data-message-id = ${message.id} >
          <div class="message_contents_list_text_1">
            <div class="message_contents_list_text_1_name">
              ${message.user_name}
            </div>
            <div class="message_contents_list_text_1_day">
              ${message.created_at}
            </div>
          </div>
          <div class="message_contents_list_text_2">
            <p class="message_contents_list_text_2_lower_message">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    } else if (message.image) {
      var html =
      `<div class="message_contents_list" data-message-id = ${message.id} >
          <div class="message_contents_list_text_1">
            <div class="message_contents_list_text_1_name">
              ${message.user_name}
            </div>
            <div class="message_contents_list_text_1_day">
              ${message.created_at}
            </div>
          </div>
          <div class="message_contents_list_text_2">
            <img src=${message.image} >
          </div>
        </div>`
        return html;
    };
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message_contents').append(html);      
      $('form')[0].reset();
      $('.message_contents').animate({ scrollTop: $('.message_contents')[0].scrollHeight});
    })
    .fail(function() {
      alert('メッセージを送信できません');
    });
    return false;
  })

  var reloadMessages = function() {
    var last_message_id = $('.message_contents_list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message_contents').append(insertHTML);
        $('.message_contents').animate({ scrollTop: $('.message_contents')});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});