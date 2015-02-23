var main = function() {
		$('#projNav').mouseover(function() {
			$('#projNav').html('Coming Soon');
		});

		$('#projNav').mouseout(function() {
			$('#projNav').html("Projects");
		});
};

$(document).ready(main);
