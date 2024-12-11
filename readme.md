# Employee Management System (EMS)

The Employee Management System (EMS) is a Node.js application that allows users to perform CRUD (Create, Read, Update, Delete) operations on employee records stored in a MySQL database. This project is ideal for managing employee information in an organization.

---

## Features

- Add new employees to the database.
- View employee details.
- Update existing employee information.
- Delete employee records.

---

## Prerequisites

### Software Requirements

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)

### Node.js Modules

- `mysql`: For interacting with the MySQL database.
- `express`: For handling HTTP requests.

---

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/AnshRiteshSavadatti/Student-Management-System-Backend
cd employee-management-system
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Database Connection**

- Edit the `node.js` file and update the database credentials:
  ```javascript
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });
  ```

4. **Create the MySQL Database and Table**

- Run the following SQL commands in your MySQL environment:

  ```sql


  CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    department VARCHAR(50),
    joining_date DATE
  );
  ```

5. **Start the Application**

```bash
node node.js
```

---

### API Endpoints

| Endpoint     | Method | Description                   |
| ------------ | ------ | ----------------------------- |
| `/insert`    | POST   | Add a new employee            |
| `/update`    | POST   | Update an employee's details  |
| `/delete`    | POST   | Delete an employee record     |
| `/employees` | GET    | Retrieve all employee records |

#### Example: Adding an Employee

Send a POST request to `/insert` with the following JSON body:

```json
{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "department": "HR",
  "joiningDate": "2024-01-01"
}
```

---

## Project Structure

```
employee-management-system/
├── index.html         # Landing page for the application
├── node.js            # Main application entry point # MySQL database connection setup
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

---

## License

This project is licensed under the MIT License.

### About the MIT License

- The MIT License allows free usage, modification, and distribution of the software for personal or commercial purposes.
- It ensures the software is provided "as is," without any warranties, protecting developers from liability.
- It is one of the most permissive and widely used open-source licenses.
- Users are not required to make their modified code open-source but must retain the original license notice.

---

## Contribution

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## Contact

For any queries or suggestions, please contact [anshsavadatti@gmail.com].
