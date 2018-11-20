module.exports = function(app){
	app.factory('ALANServices', ['$q', '$http', function($q, $http) {
		return {
			sendReq: function(method, url, data, options) {
	
				return $q(function(resolve, reject) {
					$http(Object.assign({
						method: method,
						url: url,
						data: data,
						withCredentials: true
					}, options)).then(function(res) {
						resolve(res.data)
					}, function(err) {
						reject(err);
					})
				});
			},
			contextService: function() {
				return this.sendReq('GET', '/security/context');
			},
	
			authCheck: function() {
				return this.sendReq('GET', '/security/auth');
			},
	
			logOut: function() {
				return this.sendReq('POST', '/security/logout');
			},
	
			checkSession: function() {
				return $q(function(resolve, reject) {
					var msg = 'You have been logged out due to inactivity.\nPlease refresh your session to log in again.';
					$http.get('/checkSession', {}).then(function(response) {
						if (!response.data)
							return reject(msg);
						else if (response.data[0] == 'session_ok')
							return resolve("OK");
						else
							return reject(msg);
					}).catch(function(response) {
						return reject(msg);
					})
				});
			}
		}
	}]);
}