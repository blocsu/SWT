//Этот код, с помощью https://cucumber.io тестирует приложение 8_7_Pug/pugdemo-main
//команда запуск теста в терминале: yarn cucumber-js

const superagent = require('superagent');
const {When, Then} = require('@cucumber/cucumber');
require('should');

When('the client creates a POST request to \\/user', function () {
    this.request = superagent('POST', 'http://localhost:4321/user');
});
When('attaches a generic malformed Payload', function () {
    this.request.send('{"login": "null@nothing.com"}');
    this.request.set('Content-Type', 'application/json');
});
When(/^sends the request$/, function (callback) {
    this.request
    .then((response) => {
        this.response = response.res;
        callback();
    })
    .catch((error) => {
        this.response = error.response;
        callback();
    });
});
Then('our API should respond whith a 400 HTTP status code', function () {
    this.response.statusCode.should.equal(400);
});
Then('the payloud of the response should be a JSON object', function () {
    const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type'];
    if(!contentType || !contentType.includes('application/json')) {
        throw new Error('Response not of Content-Type applicayion/json')
    }

    //is valid JSON?
    try{
        this.responsePayload = JSON.parse(this.response.text);
    } catch (e) {
        throw new Error('Response not a valid JSON object');
    }
});
Then('contains a message property which says "Не верный формат данных"', function () {
    this.responsePayload.message.should.equal('Не верный формат данных');
});

