let session = new Session();
session_id = session.getSession();

if(session_id !== "") {
    async function populateUserData() {
        let user = new User();
        user = await user.get(session_id);
        document.querySelector("#username").innerHTML = user['username'];
        document.querySelector('#email').innerHTML = user['email'];

        document.querySelector("#korisnicko_ime").value = user['username'];
        document.querySelector('#edit_email').value = user['email'];
    }

    populateUserData();
} else {
    window.location.href = "/";
}

document.querySelector("#logout").addEventListener('click', e => {
    e.preventDefault();

    session.destroySession();
    window.location.href = "/";
});

document.querySelector('#editAccount').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'block';
});
document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'none';
});

document.querySelector("#editForm").addEventListener('submit', e => {
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector('#korisnicko_ime').value;
    user.email = document.querySelector('#edit_email').value;
    user.edit();
});

document.querySelector('#deleteProfile').addEventListener('click', e => {
    e.preventDefault();

    let text = "Da li ste sigurni da zelite da obrisete profil?";

    if(confirm(text) === true) {
        let user = new User(session_id);
        user.delete();
    }
});

document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();

    async function createPost() {
        let content = document.querySelector('#postContent').value;
        document.querySelector('#postContent').value = "";
        let post = new Post();
        post.post_content = content;
        post = await post.create();

        let current_user = new User();
        current_user = await current_user.get(session_id);

        let delete_post_html = '';

        if(session_id === post.user_id) {
            delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';

        }

        document.querySelector("#allPostsWrapper").innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                    <div class="post-content">${post.content}</div>
                                                                    <div class="post-actions">
                                                                        <p><b>Autor:</b> ${current_user.username}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="like-btn">
                                                                                <span class="likes" onclick="showLikes(this)">${post.likes} Likes</span>
                                                                            </button>
                                                                            <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                            ${delete_post_html}
                                                                            <button class="show-likes" onclick="showLikes(this)">Lajkovali</button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="post-comment">
                                                                        <form>
                                                                            <input placeholder="Napisi komentar..." type="text">
                                                                            <button onclick="commentPostSubmit(event)">Comment</button>
                                                                        </form>
                                                                    </div>
                                                                    <div class="lajkovali">
                                                                        <button onclick="close_modal2(this)">X</button>
                                                                    </div>
                                                                </div>
                                                                ` + document.querySelector("#allPostsWrapper").innerHTML;
    };

    createPost();
});

async function getAllPosts() {
    let all_posts = new Post();
    all_posts = await all_posts.getAllPosts();

    all_posts.forEach(post => {
        async function getPostUser() {
            let user = new User();
            user = await user.get(post.user_id);
            
            let comments = new Comment();
            comments = await comments.get(post.id);

            let comments_html = '';
            if(comments.length > 0) {
                comments.forEach(comment => {
                    comments_html += `<div class="single-comment">${comment.content}<span>${comment.user_username}</span></div>`
                });
            }

            let delete_post_html = '';
            if(session_id === post.user_id) {
                delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
            }

            document.querySelector("#allPostsWrapper").innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                        <div class="post-content">${post.content}</div>
                                                                        <div class="post-actions">
                                                                            <p><b>Autor:</b> ${user.username}</p>
                                                                            <div>
                                                                                <button onclick="likePost(this)" class="like-btn">
                                                                                    <span class="likes">${post.likes} Likes</span>
                                                                                </button>
                                                                                <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                                ${delete_post_html}
                                                                                <button class="show-likes" onclick="showLikes(this)">Lajkovali</button>
                                                                            </div>
                                                                        </div>
                                                                        <div class="post-comment">
                                                                            <form>
                                                                                <input placeholder="Napisi komentar..." type="text">
                                                                                <button onclick="commentPostSubmit(event)">Comment</button>
                                                                            </form>
                                                                            ${comments_html}
                                                                        </div>
                                                                        <div class="lajkovali">
                                                                            <button onclick="close_modal2(this)">X</button>
                                                                        </div>
                                                                    </div>
                                                                    ` + document.querySelector("#allPostsWrapper").innerHTML;
        };
        getPostUser();
    });
}
getAllPosts();
async function commentPostSubmit(e) {
    e.preventDefault();

    let btn = e.target;
    btn.setAttribute('disable', 'true');
    let main_post_el = btn.closest('.single-post');
    let post_id = main_post_el.getAttribute('data-post_id');
    let comment_value = main_post_el.querySelector('input').value;
    let user = new User();
    user = await user.get(session_id);
    
    let comment = new Comment();
    comment.content = comment_value;
    comment.user_id = session_id;
    comment.post_id = post_id;
    comment.user_username = user.username;

    main_post_el.querySelector('.post-comment').innerHTML += `<div class="single-comment">${comment_value}<span>${user.username}</span></div>`/*  + main_post_el.querySelector('.post-comment').innerHTML */;
    
    comment.create();
};


/* POST ACTIONS */


async function removeMyPost(btn) {
    if(confirm("Da li stvarno zelite da obriste ovaj post?")) {
        comment.delete(comments, post_id);
        let post_id = btn.closest('.single-post').getAttribute('data-post_id');
        btn.closest('.single-post').remove();
    
        let post = new Post();
        let comment = new Comment();
        let comments = await comment.get(post_id);
    
        post.delete(post_id);
    }
};

/************************* LAJKOVANJE OBJAVA ************************ */

async function likePost(btn) {
    let post_id = btn.closest('.single-post').getAttribute('data-post_id');
    let ovajpost = new Post();
    ovajpost = await ovajpost.get(post_id);
    let user = new User();
    user = await user.get(session_id);

    if(!ovajpost.users_liked.includes(user.username)) {
        let users = ovajpost.users_liked;
        users.push(user.username);

        let n_likes = parseInt(btn.querySelector('span').innerText);
        btn.querySelector('span').innerText = n_likes + 1 + 'Likes';
        btn.setAttribute('disabled', 'true');
    
        let post = new Post();
        post.like(post_id, n_likes + 1, users);
    } else {
        btn.setAttribute('disabled', 'true');
    }
};

/************************* FUNKCIJA ZA POJAVLJIVANJE I NESTAJANJE DUGMETA ZA KOMENTARE NA OBJAVE ************************ */

const commentPost = btn => {
    let main_post_el = btn.closest('.single-post');
    let stil = getComputedStyle(main_post_el.querySelector('.post-comment')).display;
    
    if(stil === "none") {
        main_post_el.querySelector('.post-comment').style.display = "block";
    } else {
        main_post_el.querySelector('.post-comment').style.display = "none";
    }
};

/* ***********PRIKAZ ONIH KOJI SU LAJKOVALI************ */
async function showLikes(el) {
    let elem = el.closest('.single-post');
    elem.querySelector('.lajkovali').style.display = "block";
    elem.querySelector('.like-btn').setAttribute('disabled', 'true');

    let post_id = el.closest('.single-post').getAttribute('data-post_id');
    let ovajpost = new Post();
    ovajpost = await ovajpost.get(post_id);

    let likes_html = ''
    ovajpost.users_liked.forEach(user => {
        likes_html = `<p>${user}</p>` + likes_html
    });
    el.closest('.single-post').querySelector('.lajkovali').innerHTML += likes_html;
}
const close_modal2 = el => {
    let elem = el.closest('.single-post');
    elem.querySelector('.lajkovali').style.display = "none";
    elem.querySelector('.like-btn').removeAttribute('disabled');
}