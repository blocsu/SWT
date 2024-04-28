Feature: Create User

 Client should be able to send a request  to our API in order to create a user. Our API should also validate the structure of the payload and respond whith an error if it is invalid.
 Клиент должен иметь возможность отправить запрос к нашему API чтобы создать пользователя. Наше API должно также проверить структуру данных и ответить ошибкой если она неправильная.

 Scenario: Malformed Payload

 if the client sends a POST request to /user whith a unsupported payload,  it should receive a response whith a 400 status code.
 Если клиент посылает пост запрос на маршрут /user с неподдерживаемым форматом данных, то клиент должен получить ответ со статусом кода 400.

When the client creates a POST request to /user
And attaches a generic malformed Payload
And sends the request
Then our API should respond whith a 400 HTTP status code
And the payloud of the response should be a JSON object
And contains a message property which says "Не верный формат данных"