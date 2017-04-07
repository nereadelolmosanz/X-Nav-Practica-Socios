$(document).ready(function(){
  var loaded = false;

  var create_msg = function(img,author,date,content,likes){
    msg = '<div class="OneMessage">';
    msg += '<img class="img-circle pull-left" src="'+img+'" width="50px" height="50px">';
    msg += '<div class="message-info">';
    msg += '<small class="user-name text-primary">'+author+'</small>';
    msg += '<small class="pull-right text-muted"><i class="fa fa-calendar"></i> '+date+'</small>';
    msg += '<p class="OneMessage-text">'+content;
    msg += '<i class="pull-right fa fa-thumbs-up"> '+likes+'</i>';
    msg += '</p></div></div>';
    $("#messages").append(msg);
  }

// TIMELINE CODE
  $(".timeline").click(function(e){
    if (!loaded){
      $("#messages").addClass("messages");
      loaded = true;
    }
    $("#messages").html('<h1 id="title">Timeline<h1>');
    console.log("titulo OK");
    e.preventDefault();
    $.getJSON("json/timeline.json",function(data){
      console.log("getJSON");
      for (var i=0; i<data.messages.length; i++){
        img = data.messages[i].img;
        author = data.messages[i].author;
        date = data.messages[i].date;
        content = data.messages[i].content;
        likes = data.messages[i].likes;
        create_msg(img,author,date,content,likes);
      }
      console.log("fin");
    });
  })

// UPDATE CODE
  $(".update").click(function(){
    if (!loaded){
      $("#messages").addClass("messages");
      loaded = true;
    }
    $("#messages").html('<h1 id="title">New messages loaded<h1>');
  })

// MY LINE CODE
  $(".myline").click(function(){
    if (!loaded){
      $("#messages").addClass("messages");
      loaded = true;
    }
    $("#messages").html('<h1 id="title">My line<h1>');
  })

});
