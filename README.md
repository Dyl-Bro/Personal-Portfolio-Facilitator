# Personal-Portfolio-Facilitator
API meant to make it easier for individuals to administer their professional portfolios
## Log In An Existing Portfolio Administrator

**Request**...

` POST http://localhost:4000/api/v1/adminRoute/login`

```
var axios = require('axios');

var data = JSON.stringify({
  "email": "EXAMPLE-ADMIN-EMAIL",
  "password": "EXAMPLE-ADMIN-PASSWORD"
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/adminRoute/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* The logged in Administrator's email and Authentication token generated from JWT.
```
{
    "admin": "EXAMPLE-ADMIN-EMAIL",
    "token": "EXAMPLE-ADMIN-JWT"
}
```
## Register a New Portfolio Administrator

**Request**...

` POST http://localhost:4000/api/v1/adminRoute/register`

```
var axios = require('axios');
var data = JSON.stringify({
  "name": "ADMIN FIRST AND LAST NAME",
  "email": "ADMIN@GMAIL.COM",
  "password": "ADMIN-PASSWORD"
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/adminRoute/register',
  headers: { 
    'Authorization': 'Bearer <Auth Token>', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* The newly registered Administrator's name, email, and bcrypt hashed password
```
{
    "name": "ADMIN FIRST AND LAST NAME",
    "email": "ADMIN@GMAIL.COM",
    "password": "ADMIN-HASHED-PASSWORD",
    "_id": "6232bf06ef6c31cfb12f0afd",
    "__v": 0,
    "id": "6232bf06ef6c31cfb12f0afd"
}
```
##  Create a New Portfolio Project

**Request**...

` POST http://localhost:4000/api/v1/projectRoute/`

```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('title', 'Portfolio Project #3');
data.append('image', fs.createReadStream('<Path Of Image To Be Uploaded>'));
data.append('description', 'Portfolio Project #3 description');
data.append('projectLink', 'Link to Project');

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/projectRoute/',
  headers: { 
    'Authorization': 'Bearer <AuthToken>', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* The newly created Portfolio Project
```
{
    "title": "Portfolio Project #3",
    "image": "http://localhost:4000/UPLOAD-FILES/<Image Uploaded>",
    "description": "Portfolio Project #3 description",
    "documents": [],
    "projectLink": "Link to Project",
    "_id": "6232c266ef6c31cfb12f0aff",
    "__v": 0,
    "id": "6232c266ef6c31cfb12f0aff"
}
```

##  Upload Design Documents to an existing Portfolio Project

**Request**...

` PUT http://localhost:4000/api/v1/projectRoute/documents/:id`

```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('documents', fs.createReadStream('<Path of File to be Uploaded>'));
data.append('documents', fs.createReadStream('<Path of Other File to be Uploaded>'));

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/projectRoute/documents/<Project Object ID>',
  headers: { 
    'Authorization': 'Bearer <Auth Token>', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* The updated Portfolio Project with Design Documents
```
{
    "_id": "62303f29ac6d8c4d89fe0fec",
    "title": "Project example 1",
    "image": "http://localhost:4000/UPLOAD-FILES/<Uploaded File>",
    "description": "DESCRIPTION",
    "documents": [
        "http://localhost:4000/UPLOAD-FILES/<Uploaded File>",
        "http://localhost:4000/UPLOAD-FILES/<Other Uploaded File>"
    ],
    "projectLink": " Project Link",
    "__v": 0,
    "id": "62303f29ac6d8c4d89fe0fec"
}
```
##  Update an existing Portfolio Project

**Request**...

` PUT http://localhost:4000/api/v1/projectRoute/:id`

```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('title', 'Project example 1');
data.append('image', fs.createReadStream('<Path ofFile to be Uploaded>'));
data.append('description', 'Updated Description');
data.append('projectLink', 'Updated Project Link');

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/projectRoute/<Project Object ID>',
  headers: { 
    'Authorization': 'Bearer <Auth Token>', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* The updated Portfolio Project
```
{
"_id": "62303f29ac6d8c4d89fe0fec",
    "title": "Project example 1",
    "image": "http://localhost:4000/UPLOAD-FILES/<Uploaded File>",
    "description": "Updated Description",
    "documents": [
        "<Document File>",
        "<Other Document File>"
    ],
    "projectLink": "Updated Project Link",
    "__v": 0,
    "id": "62303f29ac6d8c4d89fe0fec"
}
```


##  Retreive a list of Portfolio Projects

**Request**...

` GET http://localhost:4000/api/v1/projectRoute/`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/projectRoute/',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* A list of Portfolio Projects

##  Retreive a single Portfolio Project

**Request**...

` GET http://localhost:4000/api/v1/projectRoute/:id`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/projectRoute/<Project Object ID>',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* A single Portfolio Project
```
{
    "_id": "<Project Object ID specified in REQ.PARAMS>",
    "title": "Project example 1",
    "image": "http://localhost:4000/UPLOAD-FILES/<project image file>",
    "description": " Description",
    "documents": [
        "<Another Design Document>",
        "<Another Design Document>"
    ],
    "projectLink": " Project Link",
    "__v": 0,
    "id": "<Project Object ID specified in REQ.PARAMS>"
}
```

##  Delete Portfolio Project

**Request**...

` DELETE http://localhost:4000/api/v1/projectRoute/:id`

```
var axios = require('axios');

var config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/projectRoute/<Valid Project Portfolio Object ID>',
  headers: { 
    'Authorization': 'Bearer <JWT generated Auth Token>'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* A Successful Project Deletion Message
```
Project succesfully deleted
```

##  Create an About Me Section of Project Portfolio

**Request**...

` POST http://localhost:4000/api/v1/aboutRoute/`

```
var axios = require('axios');
var data = JSON.stringify({
  "aboutMeDescription": " Who, What, When, Why, How",
  "skills": [
    "SKill 1",
    "SKill 2",
    "SKill 3"
  ],
  "education": [
    "School 1",
    "Classes Here",
    "Certificate in this",
    "Studied that"
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/aboutRoute/',
  headers: { 
    'Authorization': 'Bearer <JWT Generated Auth Token>', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* newly created About Me Information
```
{
    "aboutMeDescription": " Who, What, When, Why, How",
    "skills": [
        "SKill 1",
        "SKill 2",
        "SKill 3"
    ],
    "education": [
        "School 1",
        "Classes Here",
        "Certificate in this",
        "Studied that"
    ],
    "_id": "6232d064ef6c31cfb12f0b03",
    "__v": 0,
    "id": "6232d064ef6c31cfb12f0b03"
}
```
##  Retreive an About Me Section of Project Portfolio

**Request**...

` GET http://localhost:4000/api/v1/aboutRoute/:id`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/aboutRoute/6232d064ef6c31cfb12f0b03',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* About Me Information specified by About Object ID
```
{
    "_id": "6232d064ef6c31cfb12f0b03",
    "aboutMeDescription": " Who, What, When, Why, How",
    "skills": [
        "SKill 1",
        "SKill 2",
        "SKill 3"
    ],
    "education": [
        "School 1",
        "Classes Here",
        "Certificate in this",
        "Studied that"
    ],
    "__v": 0,
    "id": "6232d064ef6c31cfb12f0b03"
}
```
##  Update an About Me Section of Project Portfolio

**Request**...

` PUT http://localhost:4000/api/v1/aboutRoute/:id`

```
var axios = require('axios');
var data = JSON.stringify({
  "aboutMeDescription": " UPDATED Who, What, When, Why, How",
  "skills": [
    " UPDATED SKill 1",
    " UPDATED SKill 2",
    "UPDATED SKill 3"
  ],
  "education": [
    "School 1",
    "Classes Here",
    "Certificate in this",
    "Studied that",
    "Additional learning here"
  ]
});

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/aboutRoute/6232d064ef6c31cfb12f0b03',
  headers: { 
    'Authorization': 'Bearer <JWT Generated Auth Token>', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* Updated About Me Information specified by About Object ID
```
{
    "_id": "6232d064ef6c31cfb12f0b03",
    "aboutMeDescription": " UPDATED Who, What, When, Why, How",
    "skills": [
        " UPDATED SKill 1",
        " UPDATED SKill 2",
        "UPDATED SKill 3"
    ],
    "education": [
        "School 1",
        "Classes Here",
        "Certificate in this",
        "Studied that",
        "Additional learning here"
    ],
    "__v": 0,
    "id": "6232d064ef6c31cfb12f0b03"
}
```

##  Create a Contact Me Section of Project Portfolio

**Request**...

` POST http://localhost:4000/api/v1/contactRoute/`

```
var axios = require('axios');
var data = JSON.stringify({
  "contact_phone": "123-456-7890",
  "contact_email": "PortfolioOwner@email.com",
  "contact_linkedIn": "link to portfolio owner's linkedIn"
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/contactRoute/',
  headers: { 
    'Authorization': 'Bearer <JWT Generated Auth Token>', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* newly created Contact Me Information
```
{
    "contact_phone": "123-456-7890",
    "contact_email": "PortfolioOwner@email.com",
    "contact_linkedIn": "link to portfolio owner's linkedIn",
    "_id": "6232d56eef6c31cfb12f0b08",
    "__v": 0,
    "id": "6232d56eef6c31cfb12f0b08"
}
```

##  Retreive a Contact Me Section of Project Portfolio

**Request**...

` GET http://localhost:4000/api/v1/contactRoute/:id`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/contactRoute/6232d56eef6c31cfb12f0b08',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* Contact Me Information specified by Contact Object ID
```
{
    "contact_phone": "123-456-7890",
    "contact_email": "PortfolioOwner@email.com",
    "contact_linkedIn": "link to portfolio owner's linkedIn",
    "_id": "6232d56eef6c31cfb12f0b08",
    "__v": 0,
    "id": "6232d56eef6c31cfb12f0b08"
}
```
##  Update an existing Contact Me Section of Project Portfolio

**Request**...

` PUT http://localhost:4000/api/v1/contactRoute/:id`

```
var axios = require('axios');
var data = JSON.stringify({
  "contact_phone": "Updated Phone Number",
  "contact_email": "PortfolioOwner@email.com",
  "contact_linkedIn": "link to portfolio owner's linkedIn"
});

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/contactRoute/6232d56eef6c31cfb12f0b08',
  headers: { 
    'Authorization': 'Bearer <JWT Generated Auth Token>', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* Updated Contact Me Information specified by Contact Object ID
```
{
    "_id": "6232d56eef6c31cfb12f0b08",
    "contact_phone": "Updated Phone Number",
    "contact_email": "PortfolioOwner@email.com",
    "contact_linkedIn": "link to portfolio owner's linkedIn",
    "__v": 0,
    "id": "6232d56eef6c31cfb12f0b08"
}
```
