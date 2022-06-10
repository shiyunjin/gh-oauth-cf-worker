// 如果你需要保密你的 client_secret 请设置
// 默认为空的时候所有人都可以直接使用
const client_secret = "";

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Content-Type': 'application/json',
};



async function handleRequest(request) {
    let input = await request.formData();

    const body = {};
    for (const entry of input.entries()) {
      body[entry[0]] = entry[1];
    }

    if (client_secret !== "") {
        body["client_secret"] = client_secret;
    }

    let req = new Request('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'gh-oauth-cf-worker',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
    });

    const response = await fetch(req);
    const results = JSON.stringify(await response.json());

    return new Response(results, {
        headers: headers,
        }
    );
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
