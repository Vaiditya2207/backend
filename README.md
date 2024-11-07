# Codemelon

## Introduction
This API provides user authentication and code compilation services using Judge0 CE.

## Authentication APIs

### POST `/auth/signup`
**Description:** Register a new user.

**Request Body:**
```json
{
   "username": "string",
   "email": "string",
   "password": "string"
}
```

**Response:**
```json
{
    "message": "User registered",
    "userId": "string",
    "token": "string"
}
```

### POST `/auth/signin`
**Description:** Authenticate a user.

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "message": "Authentication successful",
    "token": "string"
}
```

## User Management APIs

### PUT `/auth/update-email`
**Description:** Update user's email address.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "newEmail": "string"
}
```

**Response:**
```json
{
    "message": "Email updated successfully."
}
```

### PUT `/auth/update-password`
**Description:** Update user's password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "newPassword": "string"
}
```

**Response:**
```json
{
    "message": "Password updated successfully."
}
```

### DELETE `/auth/delete-mail`
**Description:** Delete a mail associated with the user.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "mailId": "string"
}
```

**Response:**
```json
{
    "message": "Mail deleted successfully."
}
```

## Code Compilation APIs

### POST `/code/compile`
**Description:** Compile and execute code using Judge0.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "source_code": "string",
    "language_id": number,
    "stdin": "string" (optional)
}
```

**Response:**
```json
{
    "codeId": "string",
    "compiledOutput": {
        // Judge0 compilation response
    }
}
```

### GET `/code/compile-result/:codeId`
**Description:** Get compilation results for a specific submission.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
    "codeId": "string",
    "compiledOutput": {
        // Judge0 compilation result
    }
}
```

## Supported Languages
Here are the common language IDs supported by the Judge0 CE API:

| Language ID | Name                        |
|-------------|-----------------------------|
| 45          | Assembly (NASM 2.14.02)     |
| 46          | Bash (5.0.0)                |
| 47          | Basic (FBC 1.07.1)          |
| 48          | C (GCC 7.4.0)               |
| 52          | C++ (GCC 7.4.0)             |
| 49          | C (GCC 8.3.0)               |
| 53          | C++ (GCC 8.3.0)             |
| 50          | C (GCC 9.2.0)               |
| 54          | C++ (GCC 9.2.0)             |
| 51          | C# (Mono 6.6.0.161)         |
| 55          | Common Lisp (SBCL 2.0.0)    |
| 56          | D (DMD 2.089.1)             |
| 57          | Elixir (1.9.4)              |
| 58          | Erlang (OTP 22.2)           |
| 44          | Executable                  |
| 59          | Fortran (GFortran 9.2.0)    |
| 60          | Go (1.13.5)                 |
| 61          | Haskell (GHC 8.8.1)         |
| 62          | Java (OpenJDK 13.0.1)       |
| 63          | JavaScript (Node.js 12.14.0)|
| 64          | Lua (5.3.5)                 |
| 65          | OCaml (4.09.0)              |
| 66          | Octave (5.1.0)              |
| 67          | Pascal (FPC 3.0.4)          |
| 68          | PHP (7.4.1)                 |
| 43          | Plain Text                  |
| 69          | Prolog (GNU Prolog 1.4.5)   |
| 70          | Python (2.7.17)             |
| 71          | Python (3.8.1)              |
| 72          | R (4.0.0)                   |
| 73          | Ruby (2.7.0)                |
| 74          | Rust (1.40.0)               |
| 75          | TypeScript (3.7.4)          |
