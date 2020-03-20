$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message_content_list">
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
      return html;
    } else {
      var html =
       `<div class="message_content_list">
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
      return html;
    };
  }
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
    //追記部分
    return false;
})
});