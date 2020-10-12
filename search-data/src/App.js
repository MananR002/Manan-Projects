import React, { Component } from "react";
import "./App.css";
import personData from "./database";
import Header from './submodules-demo/Header';
class App extends Component {
  state = {
    searchKeyword: null,
    tableData: personData,
    dateFlag: false,
  };
  searchElement = (event) => {
    let keyword = event.target.value;
    this.setState({ searchKeyword: keyword });
  };

  sortingFun = (fieldName = "") => {
    let { tableData, dateFlag } = this.state;
    let array = tableData;
    let dateA = null;
    let dateB = null;

    array.sort(function (a, b) {
      if (fieldName == "first_name") {
        dateA = a.first_name;
        dateB = b.first_name;
      }
      if (fieldName == "last_name") {
        dateA = a.last_name;
        dateB = b.last_name;
      }
      if (fieldName === "Date") {
        dateA = new Date(a.Date).getTime();
        dateB = new Date(b.Date).getTime();
      }
      if (fieldName == "currency") {
        dateA = a.currency;
        dateB = b.currency;
      }
      if (fieldName == "id") {
        dateA = a.id;
        dateB = b.id;
      }

      if (dateFlag) {
        return dateA > dateB ? 1 : -1;
      } else {
        return dateA < dateB ? 1 : -1;
      }
    });
    this.setState({ tableData: array, dateFlag: !this.state.dateFlag });
  };
  render() {
    let { tableData } = this.state;
    const styleInfo = {
      border: "1px solid black",
    };
    const elementStyle = {
      border: "solid",
      borderRadius: "10px",
      position: "relative",
      left: "10vh",
      height: "5vh",
      width: "40vh",
      marginTop: "5vh",
      marginBottom: "10vh",
      marginLeft: 100,
      backgroundColor: "#fffff",
      color: "blue",
    };
    const items = tableData.filter((data) => {
      if (this.state.searchKeyword == null) return data;
      else if (
        data.first_name
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase()) ||
        data.last_name
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase()) ||
        data.gender
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase()) ||
        data.Date.includes(this.state.searchKeyword) ||
        data.id.toString().includes(this.state.searchKeyword) ||
        data.currency.toString().includes(this.state.searchKeyword)
      )
        return data;
    });
    return (
      
      <div style={{ backgroundColor: "#107f8d" }}>
        
        <h1 style={{ textAlign: "center", color: "lightblue" }}>
          Employee Data
        </h1>
        <input
          type="text"
          placeholder="Enter data to be searched"
          style={elementStyle}
          onChange={(e) => this.searchElement(e)}
        />
        <div className="App">
          <table
            border="2"
            style={{
              // ...styleInfo,
              width: "80%",
              marginLeft: 150,
              marginBottom: 40,
              justifyContent: "space-between",
              textAlign: "center",
              backgroundColor: "#8ec977",
              backgroundImage: "inherit",
              marginTop: -16,
            }}
          >
            <thead
              style={{
                fontWeight: "bold",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <th onClick={() => this.sortingFun("id")}>ID</th>
              <th onClick={() => this.sortingFun("first_name")}>First Name</th>
              <th onClick={() => this.sortingFun("last_name")}>Last Name</th>
              <th>Gender</th>
              <th onClick={() => this.sortingFun("currency")}>Currency</th>
              <th onClick={() => this.sortingFun("Date")}>Date</th>
            </thead>
            <tbody>
              {items.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.first_name}</td>
                    <td>{data.last_name}</td>
                    <td>{data.gender}</td>
                    <td>{data.currency}</td>
                    <td>{data.Date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Header name = "Manan"/>
      </div>
    );
  }
}
export default App;
