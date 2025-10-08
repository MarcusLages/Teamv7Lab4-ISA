### API Endpoints
##### `GET: v1/definitions/`
- `word` param: Gets definition of a word.
- Returns a dictionary with the `word` as key and the definition as value.
- Returns a NotFound Error if definition was not found.
###### Request Example 1:
- Req: `v1/definitions/?word=book`
- Res:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "book": "Written or printed work consisting of pages glued or sewn together"
    }
}
```
###### Request Example 1:
- Req: `v1/definitions/?word=grumper`
- Res:
```json
{
    "status": "success",
    "code": 404,
    "data": "Word not found in dictionary."
}
```

##### `POST: v1/definitions`
- Whichever parameters given are used with **word:definition** as **key:value**
- If the word doesn't exist, returns the number of requests for adding words to dictionary, the number of actual words in the dictionary, the date at which the dictionary was last updated and word:definition back.
- If the word exists, returns a warning with the word definition according to what's in the dictionary and a warning that the word already exists, alongside the data that would also be sent according to the topic above.
###### Request Example 1:
- Req: `v1/definitions`
- Req body: `{ "book": "Written or printed work consisting of pages glued or sewn together" }`
- Res:
```json
{
    "status": "success",
    "code": 201,
    "data": {
        "req_num": 20,
        "words_num": 17,
        "last_updated": "07/10/2025, 15:15:00",
        "book": "Written or printed work consisting of pages glued or sewn together"
    }
}
```
###### Request Example 2:
- Req: `v1/definitions`
- Req body: `{ "book": "Written, printed or digital work consisting of pages together." }`
- Res:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "req_num": 21,
        "words_num": 17,
        "last_updated": "07/10/2025, 15:15:00",
        "warning": "Word already exists in the dictionary.",
        "book": "Written or printed work consisting of pages glued or sewn together"
    }
}
```

### API Responses
##### On Success
```json
{
    "status": "success",
    "code": 200,
    "data": {
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
    "data": "Error message."
}
```