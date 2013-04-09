/*
 *  Copyright (C) 2012 Andrew Oberstar
 *
 *  todo.txt-html5 is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  todo.txt-html5 is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with todo.txt-html5.  If not, see <http://www.gnu.org/licenses/>.
 */
$('.todo:not(:has(input))').live('click', function(event) {
	var target = $(event.target)
	var elem = target.hasClass('todo') ? target : target.parents('.todo')
	var id = parseInt(/\d+$/.exec(elem.attr('id'))[0])
	controller.switchToEditMode(id)
	elem.children('.todo-priority').focus()
})

$('#todo-list .todo input').live('keyup', function(event) {
	//on ENTER
	if (event.keyCode == 13) {
		$(event.target).siblings('.todo-save').click()
	}
})

$('.todo-save').live('click', function(event) {
	var todoElem = $(event.target).parent()
	var id = parseInt(/\d+$/.exec(todoElem.attr('id'))[0])
	var priority = $(todoElem).children('.todo-priority').attr('value')[0]
	var description = $(todoElem).children('.todo-description').attr('value')
	controller.updateTodo(id, {
		priority: priority,
		description: description
	})
	controller.sortTodos()
	controller.saveTodos()
	event.preventDefault()
})

$('.todo-add').live('click', function(event) {
	var todoElem = $(event.target).parent()
	var priority = $(todoElem).children('.todo-priority').attr('value')[0]
	var description = $(todoElem).children('.todo-description').attr('value')
	var text = priority ? '(' + priority + ') ' : ''
	text += formatDate(new Date()) + ' '
	text += description
	controller.createTodo(text)
	todoElem.children('input').attr('value', '')
	todoElem.children('.todo-priority').focus()
	controller.sortTodos()
	controller.saveTodos()
	event.preventDefault()
})

$('#todo-add .todo input').live('keyup', function(event) {
	//on ENTER
	if (event.keyCode == 13) {
		$(event.target).siblings('.todo-add').click()
	}
})

$(document).ready(function() {
	$('#todo-add .todo-priority').focus()
})
