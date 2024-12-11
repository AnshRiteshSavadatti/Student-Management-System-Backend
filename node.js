const mysql = require("mysql");

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("database connected");

  const q1 = "CREATE DATABASE IF NOT EXISTS EMS";
  con.query(q1, function (err) {
    if (err) throw err;
    console.log("database created");

    con.changeUser({ database: "EMS" }, function (err) {
      if (err) throw err;
      console.log("switched to this user");
      const q1 = `
                CREATE TABLE IF NOT EXISTS EmpT(
                empId INT PRIMARY KEY auto_increment,
                fname VARCHAR(30),
                lname VARCHAR(30),
                email VARCHAR(30),  
                phone VARCHAR(10),
                department VARCHAR(30),
                joiningDate datetime
                )`;

      con.query(q1, function (err, result) {
        if (err) throw err;

        console.log(`Table EmpT created`);
      });
    });
  });
});

// importing dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// express app
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/view", function (req, res) {
  const q = `select * from EmpT`;

  con.query(q, function (err, result) {
    if (err) {
      res.status(500).send(`Error in selectiong the record ${err}`);
      return;
    }

    let htmlTable = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    /* General Table Styling */
                    table {
                    width: 100%;
                    border-collapse: collapse; /* Removes spacing between cells */
                    margin: 20px 0;
                    font-size: 18px;
                    font-family: Arial, sans-serif;
                    text-align: left;
                    }

                    /* Table Header */
                    th {
                    background-color: #009879; /* Green shade */
                    color: #ffffff; /* White text */
                    padding: 12px 15px;
                    }

                    /* Table Rows */
                    td {
                    padding: 12px 15px;
                    border-bottom: 1px solid #dddddd;
                    }

                    /* Zebra Stripes */
                    tr:nth-child(even) {
                    background-color: #f3f3f3; /* Light gray */
                    }

                    tr:hover {
                    background-color: #f1f1f1; /* Hover effect */
                    }

                    /* Table Borders */
                    table, th, td {
                    border: 1px solid #dddddd;
                    border-radius: 4px;
                    }

                    /* Responsive Table */
                    @media screen and (max-width: 768px) {
                    table {
                        width: 100%; /* Table adjusts to screen size */
                    }
                    th, td {
                        font-size: 16px; /* Smaller text for mobile */
                    }
                    }

                </style>
                <title>Table</title>
            </head>
            <body>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>phone</th>
                            <th>Joining date</th>
                        </tr>
                    </thead>
                    <tbody>`;
    result.forEach(
      (e) =>
        (htmlTable += `<tr>
                        <td>${e.empId}</td>
                        <td>${e.fname}</td>
                        <td>${e.lname}</td>
                        <td>${e.email}</td>
                        <td>${e.phone}</td>
                        <td>${e.joiningDate}</td>
                        </tr>`)
    );

    htmlTable += `</tbody>
                </table>
            </body>
            </html>
        `;
    res.send(htmlTable);
  });
});

let cnt = 0;

app.post("/insert", function (req, res) {
  const q = `INSERT INTO EmpT (empId, fname, lname, email, phone, department, joiningDate) VALUES (EmpT.empId, ?, ?, ?, ?, ?, ?)`;

  const { fname, lname, email, phone, department, joiningDate } = req.body;

  console.log(fname, lname, email, phone, department, joiningDate);

  con.query(
    q,
    [fname, lname, email, phone, department, joiningDate],
    function (err, results) {
      if (err) {
        res.status(500).send(`Error in inserting into file  ${err}`);
        return;
      }

      cnt++;
      console.log(`Values inserted ${fname}`);
      let html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            :root {
              --tint-3: #fff4eb;
            }

            html {
              font-size: 68.5%;
            }

            body {
              font-size: 1.8rem;
              font-family: sans-serif;
              color: #444;
              font-style: italic;
              background-color: var(--tint-3);
              display : flex;
              align-items : center;
              justify-content : center;
            }
            p{
              font-size : 2.4rem;
            }

            a {
              display: inline-block;
              padding: 12px 24px;
              border-radius: 40px;
              border: 1px solid #d17900;
              background-color: #f5a456;
              font-size: 1.8rem;
              font-family: inherit;
              color: #444;
              text-align: center;
              text-decoration: none;
              cursor: pointer;
              transition: all 0.3s ease;
            }
          </style>
        </head>
        <body>
        <div>
          <p>The Employee Details Mentioned below is deleted from the database</p>
          <p> Employee name : ${fname} ${lname} </p>
          <p> Employee mail : ${email}</p>
          <a href="index.html"> Go Back </a>
        </div>
        </body>
      </html>
    `;

      res.send(html);
    }
  );
});

// delete
app.post("/delete", function (req, res) {
  const del = `DELETE FROM EmpT WHERE empId = ?`;
  const { empID } = req.body;

  con.query(del, [empID], function (err, result) {
    if (err) {
      err.status(500).send(`Error in deleting ${err}`);
      return;
    }
    console.log(`Value ${empID} deleted`);
    let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          :root {
            --tint-3: #fff4eb;
          }

          html {
            font-size: 68.5%;
          }

          body {
            font-size: 1.8rem;
            font-family: sans-serif;
            color: #444;
            font-style: italic;
            background-color: var(--tint-3);
            display : flex;
            align-items : center;
            justify-content : center;
          }
          p{
            font-size : 2.4rem;
          }

          a {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 40px;
            border: 1px solid #d17900;
            background-color: #f5a456;
            font-size: 1.8rem;
            font-family: inherit;
            color: #444;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease;
          }
        </style>
      </head>
      <body>
      <div>
        <p>The Employee Details Mentioned below is inserted into the database</p>
        <p> Employee ID : ${empID} </p>
        <a href="index.html"> Go Back </a>
      </div>
      </body>
    </html>
  `;

    res.send(html);
  });
});

// update
app.post("/update", function (req, res) {
  const del = `UPDATE EmpT
                    SET fname=?, lname=?, email=?, phone=?, department=?, joiningDate=?
                    WHERE empId = ?`;
  const { fname, lname, email, phone, department, joiningDate, empID } =
    req.body;

  con.query(
    del,
    [fname, lname, email, phone, department, joiningDate, empID],
    function (err, result) {
      if (err) {
        err.status(500).send(`Error in deleting ${err}`);
        return;
      }
      console.log(`Value ${empID} deleted`);
      res.send(`Value ${empID} deleted`);
    }
  );
});

app.listen(port, function () {
  console.log("Running at http://localhost:3001");
});
