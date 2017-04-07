$(document).ready(function(){
  var loaded = false;
  var myline = false;

  var create_msg = function(id,img,author,title,date,likes){
    msg = '<div class="OneMessage">';
    msg += '<img class="img-circle pull-left" src="'+img+'" width="50px" height="50px">';
    msg += '<div class="message-info">';
    msg += '<p><span class="msg-title text-primary">'+title+'</span>';
    msg += ' -<span class="user-name text-primary">'+author+'</span>';
    msg += '<small class="pull-right text-muted"><i class="fa fa-calendar"></i> '+date+'</small></p>';
    id_text = id + "-text";
    msg += '<i id="'+id+'" class="fa fa-arrow-circle-down"></i>'
    msg += '<p id="'+id_text+'" class="OneMessage-text">';
    msg += '<i class="pull-right fa fa-thumbs-up"> '+likes+'</i></p>';
    msg += '</div></div>';
    return msg;
  }

  var create_listener = function(id, content){
    $("#"+id).click(function(){
      id_text = id + "-text";
      msg = content + document.getElementById(id_text).innerHTML;
      document.getElementById(id_text).innerHTML = msg;
      $("#"+id).remove();
    });
  }


// TIMELINE CODE
  $(".timeline").click(function(e){
    if (!loaded){
      $("#messages").addClass("messages");
      loaded = true;
    }
    $("#messages").html('<h1 id="title">Timeline<h1>');
    e.preventDefault();
    $.getJSON("json/timeline.json",function(data){
      for (var i=0; i<data.messages.length; i++){
        img = data.messages[i].img;
        author = data.messages[i].author;
        title = data.messages[i].title;
        date = data.messages[i].date;
        content = data.messages[i].content;
        likes = data.messages[i].likes;
        id = "tl-" + i.toString();
        msg = create_msg(id,img,author,title,date,likes);
        $("#messages").append(msg);
        create_listener(id,content);
      }
    });
    $.getJSON("json/update.json",function(data){
      if (data.messages.length > 0){
        newMsg = '</br><p class="new-messages">Se han encontrado ';
        newMsg += data.messages.length;
        newMsg += " nuevos mensajes.</p>";
        $("#messages").prepend(newMsg);
        $(".badge").html(data.messages.length);
      }
    });
    myline = false;
  })

// UPDATE CODE
  $(".update").click(function(e){
    if (myline){
      $("#messages").removeClass("messages");
      loaded = false;
    }
    if (!loaded){
      alert = '<div class="alert alert-danger"><strong>Error. </strong>'
      alert += 'Debes visualizar tu timeline primero.</div>'
      $("#messages").html(alert);
    } else {
      $(".badge").html("");
      $("#title").html('New messages loaded');
      e.preventDefault();
      $.getJSON("json/update.json",function(data){
        for (var i=0; i<data.messages.length; i++){
          img = data.messages[i].img;
          author = data.messages[i].author;
          title = data.messages[i].title;
          date = data.messages[i].date;
          content = data.messages[i].content;
          likes = data.messages[i].likes;
          id = "up-" + i.toString();
          msg = create_msg(id,img,author,title,date,likes);
          $("#title").after(msg);
          create_listener(id,content);
        }
      });
      $(".new-messages").remove();
    }
  })

// MY LINE CODE
  $(".myline").click(function(e){
    if (!loaded){
      $("#messages").addClass("messages");
      loaded = true;
    }
    $("#messages").html('<h1 id="title">My line<h1>');
    e.preventDefault();
    $.getJSON("json/myline.json",function(data){
      for (var i=0; i<data.messages.length; i++){
        img = data.messages[i].img;
        author = data.messages[i].author;
        title = data.messages[i].title;
        date = data.messages[i].date;
        content = data.messages[i].content;
        likes = data.messages[i].likes;
        id = "ml-" + i.toString();
        msg = create_msg(id,img,author,title,date,likes);
        $("#messages").append(msg);
        create_listener(id,content);
      }
    });
    myline = true;
  });
});
