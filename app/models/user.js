module.exports = function User(u_id, token, username, profilePictureUrl, followersCount, followingCount){

    // The user's id
    this.user_id = 0;

    // The user's instagram id
    this.u_id = u_id;

    // The token returned by the instagram API
	this.token = token

    // The user's instagram username
	this.username = username;

    // The URL for the user's instagram profile picture
    this.profilePictureUrl = profilePictureUrl;

    // The amount of followers for this user
    this.followersCount = followersCount;

    // The amount of people that this user is following
    this.followingCount = followingCount;
}