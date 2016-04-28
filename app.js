$(document).ready(function () {
	App.init();
});

var App = {
	socket:{},

	PlayersManager: {},

	data: {
		train: {
			image: "media/img/train.jpg",
			audio: "media/audio/train.mp3"
		},
		heli: {
			image: "media/img/heli.jpg",
			audio: "media/audio/heli.mp3"
		},
		plain: {
			image: "media/img/plain.jpg",
			audio: "media/audio/plain.mp3"
		},
		michael: {
			image: "media/img/michael.jpg",
			audio: "media/audio/michael.m4a"
		},
		papa: {
			image: "media/img/papa.jpg",
			audio: "media/audio/papa.m4a"
		},
		mama: {
			image: "media/img/mama.jpg",
			audio: "media/audio/mama.m4a"
		},
		robotMichael: {
			image: "media/img/robotMichael.jpg",
			audio: "media/audio/robotMichael.m4a"
		},
		robotPapa: {
			image: "media/img/robotPapa.jpg",
			audio: "media/audio/robotPapa.m4a"
		},
		robotMama: {
			image: "media/img/robotMama.jpg",
			audio: "media/audio/robotMama.m4a"
		}
	},

	init: function () {
		this.PlayersManager = new PlayersManager();
		var html = "<div class='row'>";

		for (var name in this.data){
			this.PlayersManager.addPlayer(name, this.data[name].audio);
			html += '<div class="col-md-3 col-sm-3 col-lg-3" style="margin-bottom: 20px;"><button class="btn btn-default"><img src="' + this.data[name].image + '" name="' + name + '" onclick="App.makeAction(\'' + name + '\')" class="icon"></button></div>';
		}
		$("#container").append(html+"</div>");

		//this.bindEvents();

		this.socket = io();

		this.socket.on("connect", function(){
			//alert("ASDAS")
		});

		this.socket.on("playReceived", function(data){
			$("#logger").html("plays now : " + data.id);
			$("img").closest('button').removeClass("active");
			$("img[name='" + data.id + "']").closest('button').addClass("active");
			App.PlayersManager.play(data.id);
		});

	},

	//bindEvents: function(){
	//
	//},

	makeAction: function(playerID){
		if ($("#mycheckbox").prop("checked")){
			App.socket.emit("playSend", {id :playerID});
			this.PlayersManager.play(playerID);
		}
	}

};
