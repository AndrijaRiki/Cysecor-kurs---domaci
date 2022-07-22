class Comment {
    post_id = '';
    user_id = '';
    content = '';
    comment_id = '';
    user_username = ''; /* *************OVO SAM DODAO************** */
    api_url = "https://62d3fe2fcd960e45d4514770.mockapi.io";

    create() {
        let data = {
            post_id: this.post_id,
            user_id: this.user_id,
            content: this.content,
            id: this.comment_id,
            user_username: this.user_username
        };

        data = JSON.stringify(data);

        fetch(this.api_url + '/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {});
    };

    async get(post_id) {
        let api_url = this.api_url + '/comments';

        const response = await fetch(api_url);
        const data = await response.json();
        let post_comments = [];

        data.forEach(item => {
            if(item.post_id === post_id) {
                post_comments.push(item);
            }
        });

        return post_comments;
    };

    /* ***********************BRISANJE KOMENTARA ZA OBRISANU OBJAVU*********************** */

    delete(comments, Post_id) {
        comments.forEach(com => {
            if(com.post_id === Post_id) {
                fetch(this.api_url + '/comments/' + com.id, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {});
            }
        })
    }
}