import React, { useState, useEffect } from "react";
import "./App.css";
import { Avatar, Layout, List, Tabs } from "antd";
const { Header, Content, Sider } = Layout;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://node-vercel-api-demo.vercel.app/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://node-vercel-api-demo.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, contact, company }),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setName("");
      setEmail("");
      setContact("");
      setCompany("");
      setActiveKey("1");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Users",
      children: (
        <div style={{ height: "60vh", overflowY: "auto" }}>
          <h1>Users</h1>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  // avatar={
                  //   <Avatar
                  //     src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  //   />
                  // }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={
                    <div>
                      <p className="text-sm text-gray-500">
                        Email: <b>{item.email}</b>
                      </p>

                      <p className="text-sm text-gray-500">
                        Contact: <b>{item.contact}</b>
                      </p>
                      <p className="text-sm text-gray-500">
                        Company: <b>{item.company}</b>
                      </p>
                    </div>
                  }
                />
                {/* <div>{item.contact}</div>
              <div>{item.company}</div> */}
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Add User",
      children: (
        <div>
          <h1>Add User</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <button type="submit">Add User</button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <Layout>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <Layout
            style={{
              padding: "24px 0",
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              <Tabs
                activeKey={activeKey}
                items={items}
                onChange={(e) => setActiveKey(e)}
              />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
