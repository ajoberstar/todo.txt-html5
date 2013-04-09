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
var controller = {
	_lastId: 0,
	_todos: [],
	_files: {
		todo: null,
		done: null
	},

	getTodo: function(id) {
		return this._todos[id]
	},

	getAllTodos: function() {
		return this._todos
	},

	getFilteredTodos: function(criteria) {
		var filtered = []
		var todos = this.getAllTodos()
		for (var i = 0; i < todos.length; i++) {
			var match = true
			for (key in criteria) {
				if (criteria[key] instanceof Array) {
					for (criterion in criteria[key]) {
						if (!todos[i].hasPropertyValue(key, criterion)) {
							match = false
							break
						}
					}
				} else if (!todos[i].hasPropertyValue(key, criteria[key])) {
					match = false
					break
				}
			}
			if (match) {
				filtered.push(todos[i])
			}
		}
		return filtered
	},

	createTodo: function(contents) {
		var todo = text.parseTodo(contents)
		todo.id = this._lastId++
		this._todos[todo.id] = todo
		html.renderDisplay(todo)
		return todo
	},

	createTodos: function(contents) {
		var todos = []
		var lines = contents.split('\n')
		for (i = 0; i < lines.length; i++) {
			if (lines[i].trim() == '') {
				break
			}
			todos.push(this.createTodo(lines[i]))
		}
		return todos
	},

	deleteTodo: function(id) {
		html.removeTodo(id)
		var todo = this._todos[id]
		this._todos[id] = null
		return todo
	},

	switchToEditMode: function(id) {
		html.renderEdit(this.getTodo(id))
	},

	updateTodo: function(id, changes) {
		var todo = this.getTodo(id)
		for (key in changes) {
			todo[key] = changes[key]
		}
		html.renderDisplay(todo)
		return todo
	},

	sortTodos: function() {
		var current = this.getAllTodos().slice()
		current.sort(function(a, b) {
			if (a.complete == b.complete) {
				if (a.priority == b.priority) {
					var aAge = a.age
					var bAge = b.age
					if (isNaN(aAge)) {
						return isNaN(bAge) ? 0 : 1
					} else if (isNaN(bAge)) {
						return -1
					} else if (aAge == bAge) {
						return a.id - b.id
					} else {
						return bAge - aAge
					}
				} else if (a.priority == '') {
					return 1
				} else if (b.priority == '') {
					return -1
				} else {
					return a.priority < b.priority ? -1 : 1
				}	
			} else if (a.complete) {
				return 1
			} else {
				return -1
			}
		})
		html.renderAllDisplays(current)
	},

	filterBy: function(criteria) {
		var filtered = this.getFilteredTodos(criteria)
		html.renderAllDisplays(filtered)
	},

	saveTodosToLocal: function() {
		writeTodoFile(this._files.todo, renderTodos(this.getFilteredTodos({complete:false})))
		writeTodoFile(this._files.done, renderTodos(this.getFilteredTodos({complete:true})))
	},

	saveTodosToDropbox: function() {
		dropbox_save_todo(renderTodos(this.getFilteredTodos({complete:false})));
		dropbox_save_done(renderTodos(this.getFilteredTodos({complete:true})));
	},

	saveTodos: function() {
		this.saveTodosToDropbox();
		this.saveTodosToLocal();
	}

}
