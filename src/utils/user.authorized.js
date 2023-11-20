const isUserAuthorized = (userId, postId) => Number(userId) === Number(postId);

module.exports = isUserAuthorized;