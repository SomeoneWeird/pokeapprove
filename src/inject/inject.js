chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);
      checkAndInsert()
  	}
	}, 10);
});

var buttonStr = '<a class="btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s" href="#" data-hotkey="d w" aria-label="Insert a random Pokemon gif into your review">Add a Pokemon</a>'

var d = document.createElement('div'); d.innerHTML = buttonStr;
var buttonNode = d.childNodes[0]

buttonNode.addEventListener('click', function () {
  var i = Math.floor(Math.random() * 155)
  document.querySelectorAll('#pull_request_review_body')[0].value += '\n![](https://randompokemon.com/sprites/normal/' + i + '.gif)'
})

function checkAndInsert () {
  var menu = document.querySelectorAll('.pull-request-review-menu')

  if (!menu[0]) return

  menu[0].querySelectorAll('.form-actions')[0].appendChild(buttonNode)
}

var oldUrl = ''

function check () {
  if (window.location.href !== oldUrl) {
    oldUrl = window.location.href
    checkAndInsert()
  }
  setTimeout(check, 250)
}

check()
