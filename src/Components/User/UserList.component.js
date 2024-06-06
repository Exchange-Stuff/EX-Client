import React, { useEffect } from "react";
import "./UserList.component.css";
export const UserList = () => {
  const users = [
    {
      Id: "1",
      StudentId: "123",
      Name: "Gia Han",
      Address: "DOng Nai",
      Phone: "12345678",
      gender: "woman",
      email: "han@gmail.com",
      RoleId: "1",
      IsActived: "1",
      UserBalanceId: "1",
    },
    {
      Id: "2",
      StudentId: "234",
      Name: "Gia Han",
      Address: "DOng Nai",
      Phone: "12345678",
      gender: "woman",
      email: "han@gmail.com",
      RoleId: "2",
      IsActived: "1",
      UserBalanceId: "1",
    },
    {
      Id: "3",
      StudentId: "345",
      Name: "Gia Han",
      Address: "DOng Nai",
      Phone: "12345678",
      gender: "woman",
      email: "han@gmail.com",
      RoleId: "2",
      IsActived: "1",
      UserBalanceId: "1",
    },
  ];
  return (
    <div>
      <h2>Manage User</h2>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>StudentId</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Email</th>
            <th>RoleId</th>
            <th>IsActived</th>
            <th>UserBalanceId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.Id}</td>
              <td>{user.StudentId}</td>
              <td>{user.Name}</td>
              <td>{user.Address}</td>
              <td>{user.Phone}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={
                    user.RoleId === "1" ? "admin-badge" : "player-badge"
                  }
                >
                  {user.RoleId}
                </span>
              </td>
              <td>{user.IsActived}</td>
              <td>{user.UserBalanceId}</td>
              <td>
                <button className="edit-btn" title="Edit">
                  ✎
                </button>
                <button className="delete-btn" title="Delete">
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserList;
