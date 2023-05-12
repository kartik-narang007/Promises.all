function updateLastUserActivityTime(user, post, deletePost) {
    const createPostPromise = new Promise((resolve, reject) => {
      // Assume that the createPost function creates a post and returns a promise
      createPost(post)
        .then((post) => {
          resolve(post);
        })
        .catch((error) => {
          reject(error);
        });
    });
  
    const updateUserActivityPromise = new Promise((resolve, reject) => {
      // Assume that the updateUserActivity function updates the last activity time of the user and returns a promise
      updateUserActivity(user)
        .then((lastActivityTime) => {
          resolve(lastActivityTime);
        })
        .catch((error) => {
          reject(error);
        });
    });
  
    Promise.all([createPostPromise, updateUserActivityPromise])
      .then(([post, lastActivityTime]) => {
        console.log(`Post created: ${post}`);
        console.log(`Last activity time of user ${user}: ${lastActivityTime}`);
        deletePost(post)
          .then((deletedPost) => {
            console.log(`Post deleted: ${deletedPost}`);
            // Assume that getPosts function returns a promise that fetches the posts of the user
            getPosts(user)
              .then((posts) => {
                console.log(`Posts of user ${user}: ${posts}`);
              })
              .catch((error) => {
                console.log(`Error fetching posts of user ${user}: ${error}`);
              });
          })
          .catch((error) => {
            console.log(`Error deleting post: ${error}`);
          });
      })
      .catch((error) => {
        console.log(`Error creating post or updating user activity: ${error}`);
      });
  }
  