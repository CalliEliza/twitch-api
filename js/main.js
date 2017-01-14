//run jquery
$(document).ready(function(){
  var following = [];

  var url = "https://api.twitch.tv/kraken/streams/freecodecamp";
  //fcc stream info and status api call
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/freecodecamp',
    headers: {
      'Client-ID': 'j273illwhdbh1b6df26yckvgmc0bo6c'
    },
    success: function(data1) {
      //console.log(data1);
        if(data1.stream===null) {
        $("#fccStatus").html("Free Code Camp is Currently OFFLINE");
      } else  {
        $("#fccStatus").html("Free Code Camp is Currently ONLINE");
      }
    }
  });

  $.ajax({
    type: 'GET',
    url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels",
    headers: {
      'Client-ID': 'j273illwhdbh1b6df26yckvgmc0bo6c'
    },
    success: function(data2){
      for (var i=0;i<data2.follows.length;++i) {
        var displayName = data2.follows[i].channel.display_name;
        var logo = data2.follows[i].channel.logo;
        var status = data2.follows[i].channel.status;
        if (status===null) {
          status = 'offline';
        }
        if (logo===null) {
                logo = "https://dl.dropboxusercontent.com/s/t32vlfurm56q216/nologo.png?dl=0";
                }
        $("#followerInfo").prepend("<div class='row underline'>"+"<div class='col-md-4 txt'>"+"<img src='"+logo+"'>" + "</div>"+"<div class='col-md-4 txt'>"+displayName+"</div>"+"<div class='col-md-4 txt'>"+status+"</div></div>");
      }
    }
  });


for (var i=0;i<following.length;++i) {
  $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/" +following[i] + "/?callback=?',
      headers: {
        'Client-ID': 'j273illwhdbh1b6df26yckvgmc0bo6c'
      },
    success: function(data3){
        var logo;
        var name;
        var status;
        if(data3.error){
          logo = "https://dl.dropboxusercontent.com/s/t32vlfurm56q216/nologo.png?dl=0";
          name = data3.message;
          status = data3.error;
          $("#followerInfo").prepend("<div class='row'>"+"<div class='col-md-4 txt'>"+"<img src='"+logo+"'>" + "</div>"+"<div class='col-md-4 txt'>"+name+"</div>"+",div class='col-md-4 txt'>"+status+"</div></div>");
        }
    }
});

  var deletedFollowers = ['brunofin', 'comster404'];
  for (var i=0;i<deletedFollowers.length;++i) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/'+deletedFollowers[i],
      headers: {
        'Client-ID': 'j273illwhdbh1b6df26yckvgmc0bo6c'
      },
      error: function(data3) {
        var logo = "https://dl.dropboxusercontent.com/s/t32vlfurm56q216/nologo.png?dl=0";
        var displayName = data3.statusText;
        var status = data3.status;
        if (status===null) {
          status = 'offline';
        }
        $("#followerInfo").prepend("<div class='row'>"+"<div class='col-md-4'>"+"<img src='"+logo+"'>" + "</div>"+"<div class='col-md-4'>"+name+"</div>"+",div class='col-md-4'>"+status+"</div></div>");
      }
    });
  }
}
});
