export class MyHttp {
    get(url) {
        return this.request('GET', url);
    }

    post(url, postData) {
        return this.request('POST', url, postData);
    }

    request (method, url, postData) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(
                        JSON.parse(xhr.response)
                    );
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };

            postData ?
                xhr.send(JSON.stringify(postData)) :
                xhr.send();
        });
    }
}

export const http = new MyHttp();