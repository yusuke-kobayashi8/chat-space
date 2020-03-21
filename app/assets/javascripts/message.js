$(function(){
  
  var buildHTML = function(message) {
    if ( message.content & message.image ) {
      var html =
       `<div class="message_content_list" data-message-id = message.id >
          <div class="message_contents_list_text_1">
            <div class="message_contents_list_text_1_name">
              ${message.user_name}
            </div>
            <div class="message_contents_list_text_1_day">
              ${message.created_at}
            </div>
          </div>
          <div class="message_contents_list_text_2">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
    } else if (message.content) {
      var html =
      `<div class="message_content_list" data-message-id = message.id >
          <div class="message_contents_list_text_1">
            <div class="message_contents_list_text_1_name">
              ${message.user_name}
            </div>
            <div class="message_contents_list_text_1_day">
              ${message.created_at}
            </div>
          </div>
          <div class="message_contents_list_text_2">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
    } else if (message.image) {
      var html =
      `<div class="message_content_list" data-message-id = message.id >
          <div class="message_contents_list_text_1">
            <div class="message_contents_list_text_1_name">
              ${message.user_name}
            </div>
            <div class="message_contents_list_text_1_day">
              ${message.created_at}
            </div>
          </div>
          <div class="message_contents_list_text_2">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
    };
    return html;
  };
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
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
        $('.messages_contents').append(insertHTML);
        $('.messages_contents').animate({ scrollTop: $('.messages_contents')});
      }
    })
    .fail(function() {
      alert('error');
    });
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
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});