import "./getExpense.css";
import Table from "react-bootstrap/Table";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MyTheme } from "../App";
import { saveAs } from "file-saver";

const GetExpenses = (props) => {
  const [list, setList] = useState({});
  const [arr, setArr] = useState([]);
  const [active, setActive] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState({});
  const toggleTheme = useContext(MyTheme);
  const [myStyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "white",
  });
  let dwnldData = [];

  useEffect(() => {
    if (list) {
      setArr(Object.entries(list));
    }
  }, [list]);

  let crntPrice = 0;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://exptracker-fe0ab-default-rtdb.firebaseio.com/expenses.json"
      );

      const response = await data.json();
      setList(response);
    };

    setTotalAmount(crntPrice);
    if (totalAmount > 10000) {
      setActive(true);
    }

    setData({ ...data, dwnldData });

    fetchData();
  }, [arr]);

  const deleteHandler = (key) => {
    console.log(key);
    fetch(
      `https://exptracker-fe0ab-default-rtdb.firebaseio.com/expenses/${key}.json`,
      { method: "DELETE", headers: { "content-type": "application/json" } }
    );
  };

  const editHandler = async (key, amount, desc, cat) => {
    console.log(key);
    try {
      const res = await fetch(
        `https://exptracker-fe0ab-default-rtdb.firebaseio.com/expenses/${key}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            amount: amount,
            description: desc,
            category: cat,
          }),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await res.json();

      props.getData.amount = data.amount;
      props.getData.description = data.description;
      props.getData.category = data.category;

      console.log(props.getData.amount);
      props.editHandler(key);
    } catch (error) {
      console.log(error);
    }
  };

  let index = 0;

  const downloadHandler = () => {
    const csv = arr.map((res) => {
      return [res[1].description, res[1].amount, res[1].category];
    });
    console.log(csv);
    const makeCSV = (rows) => {
      return rows.map((r) => r.join(",")).join("\n");
    };
    const blob1 = new Blob([makeCSV(csv)]);

    const temp = URL.createObjectURL(blob1);
    saveAs(temp, "file1.csv");
  };

  const colorHandler = () => {
    console.log("done");
    if (myStyle.color === "white") {
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
    } else {
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
    }
  };

  return (
    <div>
      <ul>
        {arr.map((result) => {
          index = index + 1;
          crntPrice = crntPrice + Number(result[1].amount);
          dwnldData = result[1];

          return (
            <div key={result[0]}>
              <Table striped bordered hover>
                <tbody>
                  <tr style={myStyle}>
                    <td>{index}</td>
                    <td>{result[1].description}</td>
                    <td>{result[1].amount}</td>
                    <td>{result[1].category}</td>
                    <td>
                      <Button
                        style={{ marginLeft: "0.5rem" }}
                        variant="link"
                        onClick={() => {
                          editHandler(
                            result[0],
                            result[1].amount,
                            result[1].description,
                            result[1].category
                          );
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        style={{ marginLeft: "0.5rem" }}
                        variant="danger"
                        onClick={() => {
                          deleteHandler(result[0]);
                        }}
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        })}
      </ul>
      <div>
        <span>{`total-amount : ${totalAmount}`}</span>
        {active && (
          <button
            onClick={() => {
              toggleTheme();
              colorHandler();
            }}
            style={{
              marginLeft: "0.5rem",
              backgroundColor: "rgb(0, 100, 0)",
              border: "none",
              borderBottom: "rgb(0,255,0)",
              borderRadius: "1rem",
            }}
          >
            add premium
          </button>
        )}
      </div>
      <div>
        <Button onClick={downloadHandler} variant="link">
          download my expenses
        </Button>
      </div>
    </div>
  );
};

export default GetExpenses;
