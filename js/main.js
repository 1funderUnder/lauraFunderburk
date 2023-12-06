//1
function createElemWithText(element = "p", text = "", className) {
    let myElem = document.createElement(element);
    myElem.textContent = text;
    if (className) {
    myElem.classList.add(className);
    }
    return myElem;
}

//2
function createSelectOptions(users) {
    if (!users) { 
        return;   
    }

const newArray = [];
for (const user of users) { 
    const optionElem = document.createElement("option");
    optionElem.value = user.id;
    optionElem.textContent = user.name;
    newArray.push(optionElem);
    
    }
    return newArray;
}

//3
function toggleCommentSection(postId) {
    if (!postId) {
    return;
}
const section = document.querySelector(`section[data-post-id="${postId}"]`);
if (section) {
    section.classList.toggle("hide");
    }
    return section;
}

//4
function toggleCommentButton (postId) {
    if (!postId) {
        return;
    }
    
    const myButton = document.querySelector(`button[data-post-id="${postId}"]`);
    if (myButton != null) {
    
    myButton.textContent = myButton.textContent === "Show Comments" ?
    "Hide Comments"
    : "Show Comments";
    }
    return myButton;
}

//5
function deleteChildElements (parentElement) {
if (!parentElement || !parentElement.nodeType) {
return;
}

let child = parentElement.lastElementChild;

while (child) {
    if (!parentElement?.lastElementChild) {
        return;
        }
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
    }
return parentElement;
}

//6
function addButtonListeners () {
    const buttons = document.querySelectorAll('main button');
    if (buttons.length > 0) {
    
    buttons.forEach((button) => {
        const postId = button.dataset.postId;
        if (postId) {
            button.addEventListener ("click", function (e) {
                toggleComments(e, postId); 
                    },
                false);
             }
        });
        }
        return buttons;
    }

//7
function removeButtonListeners () {
const buttons = document.querySelectorAll('main button'); 
if (!buttons) {
    return;
}  

buttons.forEach((button) => {
    const postId = button.dataset.postId;
    if (postId) {
        button.removeEventListener ("click", function (e) {
            toggleComments (e, postId) 
        },
        false);
    }
});
    return buttons;
}

//8
function createComments (comments) {
    if (!comments) {
        return;
    }
        
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < comments.length; i++) {
            let myComments = comments[i];
            let article = document.createElement('article');
            let h3 = createElemWithText('h3', myComments.name);
            let p = createElemWithText('p', myComments.body);
            let p2 = createElemWithText('p', myComments.email);
            p2.textContent = `From: ${myComments.email}`;
            document.querySelector('article');
            article.append(h3, p, p2);
            fragment.appendChild(article);
            }
        return fragment;
        }

//9
function populateSelectMenu (userData) {
    if (!userData) {
        return;
    }
let selectMenu = document.querySelector('#selectMenu');
let optionsArray = createSelectOptions(userData);
for (let i = 0; i < optionsArray.length; i++) {
    let options = optionsArray[i];
    selectMenu.append(options);
    }
    return selectMenu;
}

//10
const getUsers = async () => {
const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
    const jsonUserData = await response.json();
    return jsonUserData;
}

//11
const getUserPosts = async (userID) => {
    if (!userID) return;
    try {
   const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`);
   if (!response.ok) {
   throw new Error('Unable to retrieve data.');
 }
    return await response.json();
} catch (error) {
    console.error('There was an error: ', error);
    throw error;
};
}

//12
const getUser = async (userID) => {
    if (!userID) return;
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
    if (!response.ok) {
        throw new Error('Unable to retrieve data.');
      }
    return await response.json();
} catch (error) {
    console.error('There was an error: ', error);
    throw error;
    };
}

//13
const getPostComments = async (postID) => {
    if (!postID) return;
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`);
    if (!response.ok) {
        throw new Error('Unable to retrieve data.');
      }
    return await response.json(); 
} catch (error) {
    console.error('There was an error: ', error);
    throw error;
    };
}

//14
const displayComments = async (postId) => {
if (!postId) return;

const sectElem = document.createElement("section");
sectElem.dataset.postId = postId;
if (postId) sectElem.classList.add("comments", "hide");
const comments = await getPostComments(postId);
const frag = createComments(comments);
sectElem.append(frag);
return sectElem;
}

//15
const createPosts = async (posts) => {
    if (!posts) return;
    
    const fragment = document.createDocumentFragment();
    for (const post of posts) {
    const author = await getUser(post.userId);
    if (!author || !author.name || !author.company || !author.company.name || !author.company.catchPhrase) {
        console.error("Sorry, the data is not complete for the author named:", author);
        continue;
    }
    
    const newArticle = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.textContent = post.title;
    const p = document.createElement('p');
    p.textContent = post.body;
    const p2 = document.createElement('p');
    p2.textContent = `Post ID: ${post.id}`;
    // const author = await getUser(post.userID);
    const p3 = document.createElement('p');
    p3.textContent = `Author: ${author.name} with ${author.company.name}`;
    const p4 = document.createElement('p'); 
    p4.textContent = `${author.company.catchPhrase}`;
    const button = document.createElement('button');
    button.textContent = 'Show Comments';
    button.dataset.postId = post.id;
    newArticle.append(h2, p, p2, p3, p4, button);
    
    const section = await displayComments(post.id);
    if (section || section.child) {
    newArticle.appendChild(section);
    } else {
        console.error("This section element is invalid:", section);
    }
    fragment.appendChild(newArticle);
    
        } return fragment;
    }


//16 
const displayPosts = async (posts) => {
const mainElem = document.querySelector('main');
const element = (posts) ? await createPosts(posts) :
document.querySelector('main p'); 
mainElem.append(element);
return element;
} 


//17
function toggleComments (event, postId) {
if (!event || !postId) return;
event.target.listener = true;
const sectElem = toggleCommentSection(postId);
const button = toggleCommentButton(postId);
return [sectElem, button];
}

//18
const refreshPosts = async (posts) => {
if (!posts) return;
let removeButtons = removeButtonListeners();
let myMain = deleteChildElements(document.querySelector('main'));
let fragment = await displayPosts(posts);
let addButtons = addButtonListeners();
return [removeButtons, myMain, fragment, addButtons];
}

//19
const selectMenuChangeEventHandler = async (e) => {
if (!e) return; 
const selectMenu = e.target;
selectMenu.disabled = true;
const userId = e?.target?.value || 1;

try { 
const posts = await getUserPosts(userId);
const refreshPostsArray = await refreshPosts(posts);
selectMenu.disabled = false;
return [userId, posts, refreshPostsArray];
} catch (postsError) {
    console.error("There was an error getting posts for this user.", postsError);
    selectMenu.disabled = false;
    throw postsError;
    }
}

//20
const initPage = async () => {
const users = await getUsers();
const select = populateSelectMenu(users);
return [users, select];
}

//21
function initApp () {
initPage();
const menu = document.getElementById('selectMenu');
menu.addEventListener('change', selectMenuChangeEventHandler);
}

document.addEventListener("DOMContentLoaded", initApp);

