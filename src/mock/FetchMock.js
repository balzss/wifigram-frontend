const mockData = {
    phone: '1234567',
    apiId: '11112222',
    apiHash: '1111222233334444',
    requestMsg: '**Auto reply:** __You have requested the Wifi password. Waiting for approval...__',
    approvalMsgs: ['ok', 'k', 'rendben töki'],
    approveResponse: 'Pw granted: ********',
    denyResponse: 'No pw for you!',
};

const fetch = (url, body) => {
    if (body.method === 'POST') {

    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const respPromise = new Promise((res, rej) => {
                res({json: () => (mockData)});
            });
            resolve(respPromise);
        }, 200);
    });
}

export default fetch;
