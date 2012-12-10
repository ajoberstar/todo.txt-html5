# todo.txt-html5

A simple HTML5 app (optimized for Chrome) to manage your todo.txt file.

Design was created by [Reed Fulghum](https://github.com/ReedFulghum) and inspired
by [Sublime Text](http://www.sublimetext.com/).

todo.txt-html5 uses [Gina Trapani's](https://github.com/ginatrapani) todo.txt
format, popularized with [todo.txt-cli](https://github.com/ginatrapani/todo.txt-cli).

This application is licensed under the [GNU Affero General Public License v3](
http://www.gnu.org/licenses/agpl-3.0.html).

---

## Support

todo.txt-html5 is only supported and tested in Chrome. Right now I don't
believe it works anywhere else due to use of the HTML5 Filesystem API.

If you have any issues with this app, please open an
[issue](https://github.com/ajoberstar/todo.txt-html5/issues) or, if so inclined,
submit a pull request.

## Features

### Current

* Edit/Store todo.txt/done.txt files in Chrome's sandboxed local filesystem.
* Import contents of other todo.txt formated files via drag-and-drop.
* Create new tasks.
* Edit description/priority of existing tasks.
* Mark tasks complete.
* Tasks are dynamically sorted by status, priority, then age.
* Changes are auto saved to the filesystem.

### Planned

See our [Pivotal Tracker](https://www.pivotaltracker.com/projects/620597) for
information on future features. Dropbox integration is probably the most
significant upcoming feature.

## Documentation

### Access/Install

The simplest way to access todo.txt-html5 is to go to the public install at
[http://todo.ajoberstar.org](http://todo.ajoberstar.org). However, you can
easily host it yourself by dropping the contents of the `src` directory into
a web-accessible directory on your server.

### Usage

Any changes to tasks or new tasks will be automatically saved to the filesystem.

#### Import

If you have existing todo.txt file(s) you can import their contents into the
app by dragging them into the box at the top of the page.

#### Create Tasks

To add new tasks input the priority (if any) into the small text box, and the
description into the large one. Press `ENTER` or click "Add" to get the
task onto the list.

#### Edit Tasks

To edit an existing task just click on it. The display will be swapped out for
text fields. Just like with adding a task, press `ENTER` or click "Save" to
accept the changes.

#### Complete Tasks

If you want to mark a task complete, click the checkbox (duh...).
