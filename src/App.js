import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManager from "./artifacts/contracts/TaskManager.sol/TaskManager.json";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  // const [newtitle, setNewtitle] = useState("");
  const [employee, setEmployee] = useState("");
  // const [newemployee, setNewemployee] = useState("");
  // const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [currentId, setCurrentId] = useState();
  const [tasks, setTasks] = useState([]);

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const newSigner = provider.getSigner();

  const getTasks = async () => {
    // let count = await contract.connect(newSigner).taskCounter();
    // console.log(count);
    const res = await contract.getTasks();
    // const parseRes = {
    //   id: res[0],
    // };
    console.log(res);
    setTasks(res);
  };

  const currentvalue = () => {
    const number = tasks;
    console.log(number);
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  useEffect(() => {
    console.log(currentId);
  }, [currentId]);

  // const employees = async () => {
  //   let res = await contract.tasks();
  //   console.log(res);
  //   setTask(res);
  // };

  const createTask = async () => {
    // console.log(`${title} ${employee} ${account} ${contract}`);
    const transaction = await contract.createTask(title, employee);
    await transaction.wait();
    setCurrentId(await contract.taskCounter());
    // console.log(transaction);
    // await transaction.wait();
    getTasks();
  };

  const updateTaskTitle = async (_index) => {
    let newtitle = prompt("Please enter new task name", "");
    // let index = prompt("Please enter task number", "");
    const transaction = await contract.updateTaskTitle(_index, newtitle);
    await transaction.wait();
    getTasks();
  };

  const updateTaskCompleteStatus = async (_index, _status) => {
    // let status = prompt("Please enter the task status 0-ToDo, 1-Completed", "");
    const transaction = await contract.updateTaskCompleteStatus(
      _index,
      _status
    );
    await transaction.wait();
    getTasks();
  };

  const updateAllocation = async (_index) => {
    let newemployee = prompt("Please enter employee name", "");

    const transaction = await contract.updateAllocation(_index, newemployee);
    await transaction.wait();
    getTasks();
  };

  let Employee = ["amit", "jakub", "Bart", "Michal", "ad"];

  // function format_time(s) {
  //   return new Date(s * 1e3).toISOString().slice(-13, -5);
  // }

  function format_time(s) {
    var date = new Date(s * 1000);
    return (
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2)
    );
  }

  // function getOccurrence(array, value) {
  //   return array.filter((v) => v === value).length;
  // }

  // function getOccurrence(array, value) {
  //   var count = 0;
  //   array.forEach((v) => v === value && count++);
  //   return count;
  // }

  // const calculateCount = (arr, query) => {
  //   let count = 0;
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i][2] === query) {
  //       count++;
  //       continue;
  //     }
  //     if (Array.isArray(arr[i])) {
  //       count += calculateCount(arr[i], query);
  //     }
  //   }
  //   return count;
  // };
  var countValuesInObj = function (obj, value) {
    var count = 0;
    for (const property in obj) {
      if (typeof obj[property] === "object") {
        count = count + countValuesInObj(obj[property], value);
      }

      if (obj[property] === value) {
        return 1; // count = count + 1; // count++;
      }
    }
    return count;
  };

  // function numberoftime(array, value) {
  //   var n = 0;
  //   for (i = 0; i < array.length; i++) {
  //     if (array[i] == value) {
  //       n++;
  //     }
  //   }
  //   return n;
  // }
  // function format_time(unix_tm) {
  //   var dt = new Date(unix_tm * 1000);
  //   document.writeln(
  //     dt.getHours() +
  //       "/" +
  //       dt.getMinutes() +
  //       "/" +
  //       dt.getSeconds() +
  //       " -- " +
  //       dt +
  //       "<br>"
  //   );
  // }

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // <button className="big_button">Connected to Metamask</button>;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = provider.getSigner();

      setAccount(accounts[0]);
      setContract(
        new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          TaskManager.abi,
          newSigner
        )
      );
    } else {
      console.log("Please install metamask.");
      // <button className="big_button" onClick={initConnection}>
      //   Connect
      // </button>;
    }
  };
  // const testFn = () => {
  const result1 = tasks.map((t, i) => ({ id: i, item: t }));
  // console.log(result1);
  const result2 = result1.filter((t) => t.item[1] == 1);
  // console.log(result2);
  // };

  useEffect(() => {
    initConnection();
  }, []);
  console.log(tasks);
  // console.log(calculateCount(tasks, "amit"));

  return (
    <div className="page">
      <div className="header">
        <p>Task Manager</p>
        {account != "" ? (
          <p>
            {"Connected to Wallet from address:"} {account.substring(0, 9)}
          </p>
        ) : (
          <button className="big_button" onClick={initConnection}>
            Connect
          </button>
        )}
      </div>

      <div className="input_section">
        <div>
          <button className="big_button" onClick={createTask}>
            Create Task
          </button>
          <input
            className="input"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <input
            className="input"
            onChange={(e) => setEmployee(e.target.value)}
            placeholder="Task employee"
          />
        </div>
        <button
          className="big_button"
          onClick={() => {
            currentvalue();
            // testFn();
          }}
        >
          OngoingTasks
        </button>
      </div>

      <div className="main">
        <div className="main_col" style={{ backgroundColor: "lightPink" }}>
          <div className="main_col_heading">
            {" "}
            <span style={{ fontWeight: "bold" }}>ToDo</span>
          </div>
          {tasks
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item[1] == 0)
            .map((task, index) => {
              return (
                <div key={index} className="main_ticket_card">
                  <p className="main_ticket_card_id">#{task.id}</p>
                  <p>
                    {"TaskName:"} {task.item[2]} {","} {"AssignedTo:"}{" "}
                    {task.item[3]}
                  </p>

                  <div className="main_ticket_button_section">
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightBlue" }}
                      onClick={() => updateTaskCompleteStatus(task.id, 1)}
                    >
                      Move to Completed
                    </button>
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightGrey" }}
                      onClick={() => updateTaskTitle(task.id)}
                    >
                      UpdateTaskName
                    </button>
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightGrey" }}
                      onClick={() => updateAllocation(task.id)}
                    >
                      UpdateEmployee
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="main_col" style={{ backgroundColor: "lightGreen" }}>
          <div className="main_col_heading">
            {" "}
            <span style={{ fontWeight: "bold" }}>Completed</span>
          </div>
          {tasks
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item[1] == 1)
            .map((task, index) => {
              return (
                <div key={index} className="main_ticket_card">
                  <p className="main_ticket_card_id">#{task.id}</p>
                  <p>
                    {"TaskName:"} {task.item[2]} {","} {"AssignedTo:"}{" "}
                    {task.item[3]}
                  </p>
                  <div className="main_ticket_button_section">
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightBlue" }}
                      onClick={() => updateTaskCompleteStatus(task.id, 0)}
                    >
                      Move to ToDo
                    </button>
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightGrey" }}
                      onClick={() => updateTaskTitle(task.id)}
                    >
                      UpdateTaskName
                    </button>

                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightGrey" }}
                      onClick={() => updateAllocation(task.id)}
                    >
                      UpdateEmployee
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="main_col" style={{ backgroundColor: "lightBlue" }}>
          <div className="main_col_heading">
            <span style={{ fontWeight: "bold" }}>
              Ongoing tasks with timelines
            </span>
          </div>
          {tasks
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item[1] == 0)
            .map((task, index) => {
              return (
                <div key={index} className="main_ticket_card">
                  <p className="main_ticket_card_id">#{task.id}</p>
                  <p>
                    {"TaskName: "}
                    <span style={{ fontWeight: "bold" }}>{task.item[2]}</span>
                    {<br></br>}
                    {"AssignedTo: "}
                    <span style={{ fontWeight: "bold" }}>{task.item[3]}</span>
                    {<br></br>}
                    {" CreatedAt: "}
                    <span style={{ fontWeight: "bold" }}>
                      {format_time(task.item[4])}
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
        <div className="main_col" style={{ backgroundColor: "yellow" }}>
          <div className="main_col_heading">
            <span style={{ fontWeight: "bold" }}>
              Employee: number of Total/Completed Tasks
            </span>
          </div>
          {Employee.map((t, i) => {
            return (
              <div key={i} className="main_ticket_card">
                <p className="main_ticket_card_id">
                  <span style={{ fontWeight: "bold" }}>#{Employee[i]}</span>
                </p>
                <p>
                  {"   Total Number of Assigned Tasks: "}{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {countValuesInObj(tasks, Employee[i])}
                  </span>
                  {"  (Completed: "} {"  "}{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {countValuesInObj(result2, Employee[i])}{" "}
                  </span>{" "}
                  {")"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
