module.exports = function User(u_id, token, username, profilePictureUrl){

    // The user's id
    this.user_id = 0;

    // The user's twitter id
    this.u_id = u_id;

    // The token returned by the twitter API
	this.token = token

    // The user's twitter username
	this.username = username;

    // The URL for the user's twitter profile picture
    this.profilePictureUrl = profilePictureUrl;
}