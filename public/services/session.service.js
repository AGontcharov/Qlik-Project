angular
	.module('app.auth')
	.service('session', session);

function session() {

	this.create = function(user, role) {
		this.user = user;
		this.role = role;
	};

	this.destroy = function() {
		this.user = null;
		this.role = null;
	}

	return this;
}