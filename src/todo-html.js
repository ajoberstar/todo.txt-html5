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
var html = {
	_displayTemplate: Handlebars.compile($('#todo-display-template').html()),
	_editTemplate: Handlebars.compile($('#todo-edit-template').html()),
	_renderTodo: function(templateFun, todo) {
		var elem = $('#todo-' + todo.id)
		if (elem.length > 0) {
			elem.html(templateFun(todo))
		} else {
			$('#todo-list').append('<div id="todo-' + todo.id + '" class="todo">' + templateFun(todo) + '</div>')
		}
		this.renderCheckbox(todo)
	},
	renderAllDisplays: function(todos) {
		$('#todo-list').html('')
		for (var i = 0; i < todos.length; i++) {
			this.renderDisplay(todos[i])
		}
	},
	renderDisplay: function(todo) {
		this._renderTodo(this._displayTemplate, todo)
	},
	renderEdit: function(todo) {
		this._renderTodo(this._editTemplate, todo)
	},
	renderCheckbox: function(todo) {
		var canvasJ = $('#todo-' + todo.id + ' canvas.checkbox')
		if (canvasJ.length == 1) {
			var canvas = canvasJ[0]
			var ctx = canvas.getContext('2d')
			ctx.lineWidth = 3
			ctx.strokeStyle = '#5f5f57'
			ctx.strokeRect(3, 3, 19, 19)
			if (todo.complete) {
				ctx.moveTo(3, 3)
				ctx.lineTo(22, 22)
				ctx.stroke()
				ctx.moveTo(3, 22)
				ctx.lineTo(22, 3)
				ctx.stroke()
			}
			canvasJ.on('click', function(event) {
				controller.updateTodo(todo.id, { complete: !todo.complete })
				controller.sortTodos()
				controller.saveTodosToLocal()
				controller.saveTodosToDropbox()
			})
		}
	}
}
