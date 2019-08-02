let config = {
    contentType: 'text/xml',
    responseType: 'xml'
};

let parse = req => {
    let response;
    try {
        if (config.responseType == 'xml') {
            response = req.responseXML;
        } else if (config.responseType == 'text') {
            response = req.responseText;
        }
    } catch (e) {
        response = req.responseText;
    }
    return [response, req];
};

let HTTP = (type, url, data = null) => {
    let atomXHR, methods = {
        success: () => { },
        error: () => { },
        always: () => { }
    };
    let XHR = XMLHttpRequest || ActiveXObject;
    let request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open(type, url);
    request.setRequestHeader('Content-type', config.contentType);
    request.onreadystatechange = () => {
        let req;
        if (request.readyState === 4) {
            req = parse(request);
            if (request.status >= 200 && request.status < 300) {
                methods.success.apply(methods, req);
            } else {
                methods.error.apply(methods, req);
            }
            methods.always.apply(methods, req);
        }
    };
    request.send(data);
    atomXHR = {
        success: callprevious => {
            methods.success = callprevious;
            return atomXHR;
        },
        error: callprevious => {
            methods.error = callprevious;
            return atomXHR;
        },
        always: callprevious => {
            methods.always = callprevious;
            return atomXHR;
        }
    };
    return atomXHR;
};

export default {
    get(src) {
        return HTTP('GET', src);
    },
    put(url, data) {
        return HTTP('PUT', url, data);
    },
    post(url, data) {
        return HTTP('POST', url, data);
    },
    delete(url) {
        return HTTP('DELETE', url);
    },
    setContentType(value) {
        config.contentType = value;
    },
    setResponseType(value) {
        config.responseType = value;
    }
};