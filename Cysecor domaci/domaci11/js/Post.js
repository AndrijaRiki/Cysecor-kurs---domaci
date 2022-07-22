class Post {
    post_id = "";
    post_content = "";
    user_id = "";
    likes = "";
    users_liked = [];
    api_url = "https://62d3fe2fcd960e45d4514770.mockapi.io";

    async create() {
        let session = new Session();
        session_id = session.getSession();

        let data = {
            user_id: session_id,
            content: this.post_content,
            likes: 0,
            users_liked: this.users_liked
        }

        data = JSON.stringify(data);

        let response = await fetch(this.api_url + "/posts/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        data = await response.json();

        return data;
    };

    async getAllPosts() {
        let response = await fetch(this.api_url + "/posts/");
        let data = await response.json();
        return data;
    }

    async get(post_id) {
        let response = await fetch(this.api_url + "/posts/" + post_id);
        let data = await response.json();
        return data;
    }

    like(post_id, likes, usersLiked) {
        let data = {
            likes: likes,
            users_liked: usersLiked
        };
        data = JSON.stringify(data);

        fetch(this.api_url + '/posts/' + post_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {});
    };

    delete(post_id) {
        fetch(this.api_url + '/posts/' + post_id,  {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {alert("Post je obrisan")});
    };
}