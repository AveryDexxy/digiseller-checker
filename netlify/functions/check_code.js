const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const code = event.queryStringParameters.code;
    const API_KEY = process.env.API_KEY;
    const url = `https://trustytop.exaccess.com/api/checkcode?code=${code}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            if (result.status === 'valid') {
                return {
                    statusCode: 200,
                    body: 'Код действителен',
                };
            } else {
                return {
                    statusCode: 200,
                    body: 'Код недействителен',
                };
            }
        } else {
            return {
                statusCode: response.status,
                body: 'Ошибка при запросе к API',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Внутренняя ошибка сервера',
        };
    }
};