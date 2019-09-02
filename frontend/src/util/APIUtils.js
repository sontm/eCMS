import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

// Used GraphQL
export function login(loginRequest) {

    // TODO this Hardcode User
    const GRAPHQL_LOGIN = (username, password) => `
    {
        login (username: "${username}", password:"${password}") {
            id
            username
            jwt
            mail
            fullname
        }
    }
    `;
    console.log(loginRequest)
    if (!loginRequest) {
        loginRequest = {
            usernameOrEmail: "",
            password: ""
        }
    }
    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_LOGIN(loginRequest.usernameOrEmail, loginRequest.password) })
    });
}
// Used GraphQL
export function getAllUser() {
    const GRAPHQL_ALL_USER = `
    {
        users {
          id
          username
          mail
          fullname
          role
        }
    }
    `;
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_ALL_USER })
    });
}
// Used GraphQL
export function getAllTeam() {
    const GRAPHQL_ALL = `
    {
        teams {
          id
          name
          description
          groupName
          members {
            username
            percent
            role
          }
        }
    }
    `;
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_ALL })
    });
}

export function addMemberToTeam(teamID, username, percent, role) {
    const GRAPHQL_MUTATION = (teamID, username, percent, role) => `
    mutation AddMemberToTeam {
        addMemberToTeam (request: 
            {teamID:"${teamID}", username:"${username}",
            percent: ${percent}, role: "${role}"}) 
        {
            id
            name
            description
            groupName
            members {
                username
                percent
                role
            }
        }
    }
    `;

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_MUTATION(teamID, username, percent, role) })
    });
}

export function deleteMemberFromTeam(teamID, username) {
    const GRAPHQL_MUTATION = (teamID, username, role) => `
    mutation DeleteMemberFromTeam {
        deleteMemberFromTeam (request: 
            {teamID:"${teamID}", username:"${username}"}) 
        {
            id
            name
            description
            groupName
            members {
                username
                percent
                role
            }
        }
    }
    `;

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_MUTATION(teamID, username) })
    });
}

export function registerNewAbsence(requestInfo) {
    console.log("Create Absence Request")
    console.log(requestInfo)
    const GRAPHQL_MUTATION = (requestInfo) => `
    mutation CreateAbsence {
        createAbsence (request:{
            fromDate:"${requestInfo.fromDate}",
            toDate:"${requestInfo.toDate}",
            fromPeriod:"${requestInfo.fromPeriod}",
            toPeriod:"${requestInfo.toPeriod}",
            description:"${requestInfo.description}",
            username:"${requestInfo.username}",
            approver:"${requestInfo.approver}"
        }) 
        {
            id
            fromDate
            fromPeriod
            toDate
            toPeriod
            description
            username
            status
            feedBack
            approver
        }
    }
    `;

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_MUTATION(requestInfo) })
    });
}

export function updateStatusAbsence(requestInfo) {
    const GRAPHQL_MUTATION = (requestInfo) => `
    mutation UpdateAbsenceStatus {
        updateAbsenceStatus (request:{
            id:"${requestInfo.id}",
            status:"${requestInfo.status}",
            feedBack:"${requestInfo.feedBack}"
        }) 
        {
            id
            fromDate
            fromPeriod
            toDate
            toPeriod
            description
            username
            status
            feedBack
            approver
        }
    }
    `;

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_MUTATION(requestInfo) })
    });
}

export function deleteAbsence(id) {
    const GRAPHQL_MUTATION = (id) => `
    mutation UpdateAbsenceStatus {
        deleteAbsence (id:"${id}") 
        {
            id
            fromDate
            fromPeriod
            toDate
            toPeriod
            description
            username
            status
            feedBack
            approver
        }
    }
    `;

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_MUTATION(id) })
    });
}

export function getAllAbsencesOfUser(username, status) {
    let GRAPHQL_ALL = (username, status) => `
    {
        absence(username:"${username}") {
            id
            fromDate
            fromPeriod
            toDate
            toPeriod
            description
            username
            status
            feedBack
            approver
        }
    }
    `;
    if (status) {
        GRAPHQL_ALL = (username, status) => `
        {
            absence(username:"${username}", status:"${status}") {
                id
                fromDate
                fromPeriod
                toDate
                toPeriod
                description
                username
                status
                feedBack
                approver
            }
        }
        `;
    }
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_ALL(username, status) })
    });
}
export function getAllMyApprovingAbsences(username) {
    const GRAPHQL_ALL = (username) => `
    {
        absenceApprove(approver:"${username}") {
            id
            fromDate
            fromPeriod
            toDate
            toPeriod
            description
            username
            status
            feedBack
            approver
        }
    }
    `;
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_ALL(username) })
    });
}

// Used GraphQL
export function getCurrentUser() {
    const GRAPHQL_LOGIN_FIX = `
    {
        me {
          id
          username
          mail
          fullname
        }
    }
    `;
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_LOGIN_FIX })
    });
}

// Used GraphQL
export function getAllPolls(page, size) {
    const GRAPHQL_GET_ALLPOLLS = `
    {
        polls {
          id
          question
          createdBy
          createdDate
          expireDate
          choices {
            id
            text
            votes {
              username
            }
          }
        }
    }
    `;

    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_GET_ALLPOLLS })
    });
}




// Used GraphQL
export function createPoll(pollData) {
    console.log("PollData--->")
    console.log(pollData)

    let createChoices = `choices:[`;
    pollData.choices.forEach(function (item, index) {
        let delimiter = ``;
        if (index > 0) {
            delimiter = `,`;
        }
        createChoices += delimiter + `{text:"${item.text}"}`;
    });
    createChoices += `]`;
    const GRAPHQL_CREATE_FULLPOLL = (pollData, createChoices) => `
        mutation CreatFullPoll {
            createFullPoll (pollWithChoices: 
                {question:"${pollData.question}", createdBy:"${pollData.createdBy.username}",
                inDay: ${pollData.inDay}, inHour: ${pollData.inHour},inMinute: ${pollData.inMinute},
                ${createChoices}}) 
            {
                id
                question
                createdDate
                expireDate
                createdBy
                choices {
                id
                text
            }
            }
        }
    `;
    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({query: GRAPHQL_CREATE_FULLPOLL(pollData, createChoices)})         
    });
}


export function castVote(voteData) {
    console.log("Submit VOte")
    console.log(voteData)

    const GRAPHQL_CREATE_VOTE = (voteData) => `
    mutation CreatVote {
        createVote (
                vote: {username:"${voteData.username}", 
                poll:"${voteData.pollId}",
                choice:"${voteData.choiceId}"}) {
            id
            question
            createdBy
            createdDate
            expireDate
            choices {
            id
            text
            votes {
                username
            }
            }
        }
    }
    `;
    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({query: GRAPHQL_CREATE_VOTE(voteData)})
    });
}


export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getUserProfile(username) {
    const GRAPHQL_PROFILE = (username) => `
    {
        profile (username: "${username}") {
            id
            username
            mail
            fullname
        }
    }
    `;

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL,
        method: 'POST',
        body: JSON.stringify({ query: GRAPHQL_PROFILE(username) })
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}