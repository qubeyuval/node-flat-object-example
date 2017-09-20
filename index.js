const q = require('q');

const data = {
    orgA: {
        au1: {
            name: 'user1 orgA'
        },
        au2: {
            name: 'user2 orgA'
        },
    },
    orgB: {
        bu1: {
            name: 'user1 orgB'
        },
        bu2: {
            name: 'user2 orgB'
        },
        bu3: {
            name: 'user3 orgB'
        },
    }
}

function getUser(userId) {
    const deferred = q.defer();
    setTimeout(function() {
        deferred.resolve(`${userId} as promissed`);
    }, 300);

    return deferred.promise;
}

const getUserAsync = async (uid) => {
    const user = await getUser(uid);
    return `waited for ${user}`;
}

const getAllUsers = async (userIds) => {
    const arr = [];
    for (var uid in userIds) {
        arr.push(await getUser(userIds[uid]));
    }

    return arr;
}

// get all users ids
const users = Object.keys(data)
                .reduce((arr, orgId) => [...arr, ...Object.keys(data[orgId])], []);


console.log(users); // ["au1", "au2", "bu1", "bu2", "bu3"]

// create promises to all users
const promises = users.map(uid => getUser(uid));
q.all(promises)
    .then(result => console.log('using promisees', result));

// use async/await instaed of promises.
getAllUsers(users).then(all => console.log('using async/await', all));
