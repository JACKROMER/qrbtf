import * as tcb from 'tcb-js-sdk';

const app = tcb.init({
    env: 'qrbtf-1d845d'
});
const auth = app.auth();

async function login() {
    await auth.signInAnonymously();
    const loginState = await auth.getLoginState();
    isLogin = loginState
}

login();

let isLogin;
const db = app.database();
const _ = db.command

export function increaseDownloadData(value) {
    if (!isLogin) return;
    db.collection('QRCounter').where({
        value: _.eq(value)
    }).get().then(res => {
        if (res.data.length > 0) {
            db.collection('QRCounter').where({
                value: _.eq(value)
            }).update({
                count: _.inc(1),
                date: new Date().toString()
            }).catch(console.error)
        }
        else {
            db.collection('QRCounter').add({
                value: value,
                count: 1,
                date: new Date().toString()
            }).catch(console.error)
        }
    })
}

export function recordDownloadDetail({text, value, type, params, history}) {
    if (!isLogin) return;
    db.collection('QRDownloadData').add({
        date: new Date().toString(),
        text: text,
        value: value,
        type: type,
        params: params,
        history: history
    }).catch(console.error)
}