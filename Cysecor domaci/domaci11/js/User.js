class User {
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = "https://62d3fe2fcd960e45d4514770.mockapi.io";

    create() {
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        }
        data = JSON.stringify(data);

        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.user_id = data.id;
            session.startSession();

            window.location.href = "hexa.html";
        })
    }

    async get(user_id) {
        let response = await fetch(this.api_url + "/users/" + user_id);
        let data = await response.json();
        return data;
    }

    edit() {
        let data = {
            username: this.username,
            email: this.email,
        };
        data = JSON.stringify(data);
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'hexa.html';
        });
    }

    async getUsersById(id) {
        let api_url = this.api_url + '/comments';

        const response = await fetch(api_url);
        const data = await response.json();
        let users = [];

        data.forEach(user => {
            if(user.user_id === id) {
                users.push(user);
            }
        })
    }

    login() {
        fetch(this.api_url + '/users')
        .then(response => response.json())
        .then(data => {
            
            let loginSuccess = 0;

            data.forEach(db_user => {
                if(db_user.email === this.email && db_user.password === this.password) {
                    
                    let session = new Session();
                    session.user_id = db_user.id;
                    session.startSession();
                    loginSuccess = 1;
                    window.location.href = "hexa.html";
                }
            });
            if(!loginSuccess) {
                alert("Pogresan email ili lozinka");
            }
        });
    };

    delete() {
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.destroySession();
            
            window.location.href = "/";
        });
    }
};