### API Endpoints
##### `GET`
- `v1/definitions/`
  - `word` param: Gets definition of a word.
    E.g.: `v1/definitions/?word=book`
##### `POST`
- `v1/definitions`
  - Whichever parameters given are used with **word:definition** as **key:value**
    E.g.: `v1/definitions`
        `{ "book": "Written or printed work consisting of pages glued or sewn together" }`

### API Responses
##### On Success
```json
{
    "status": "success",
    "code": 200,
    "response": {
        "key1": "value1",
        "key2": "value2"
    }
}
```
##### On Error
```json
{
    "status": "error",
    "code": 400,
    "response": "Error message."
}
```