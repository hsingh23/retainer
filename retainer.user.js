// ==UserScript==
// @name         Retainer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Test your knowledege on websites like
// @author       You
// @match        https://en.wikipedia.org/wiki/*
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @require https://code.getmdl.io/1.3.0/material.min.js
// @downloadURL  https://github.com/vyahhi/retainer/raw/master/retainer.user.js
// @updateURL    https://github.com/vyahhi/retainer/raw/master/retainer.user.js
// ==/UserScript==

function shuffleArray (array) {
	// http://stackoverflow.com/a/12646864/92396
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
function addStyle (url) {
  var link = window.document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  document.querySelector('head').appendChild(link)
}
function createQuizzes () {
	          links = $('#mw-content-text p a').not($('.reference a'))
	          words = new Set(links.toArray().map(link => link.text))
	          words = Array.from(new Set(words)) // keep only unique

	          if (links.length >= 4) { // if less – we don't have enough options to choose for dropdowns
		          links.replaceWith(function () {
			          var correct = $(this).text()
			          var options = [correct]
			          while (options.length < 4) {
				          word = words[Math.floor(Math.random() * words.length)]
				          if (!options.includes(word)) {
					          options.push(word)
				}
			}
			          options = shuffleArray(options)
			          var select = '<select><option>' + options.join('</option><option>') + '</option></select>'
			          var item = $(select)
			          item.change(function () {
				          val = $(this).val()
				          if (val === correct) {
					          $(this).css('background-color', 'lightgreen')
				}
				          else {
					          $(this).css('background-color', 'lightcoral')
				}
			})
			          item.prop('selectedIndex', -1)
			          return item
		})
	}
}

addStyle('https://fonts.googleapis.com/icon?family=Material+Icons')
addStyle('https://code.getmdl.io/1.3.0/material.orange-blue.min.css')

switcher = $('<a>[TEST YOURSELF]</a>').click(createQuizzes).css('color', 'red')
$('#firstHeading').append(' ').append(switcher)
