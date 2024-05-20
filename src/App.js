import React, { useState, useEffect } from "react";
import { Layout, List, Tabs, Button, Form, Input, Spin } from "antd";
import "./App.css";

const { Content } = Layout;
const API_URL = "https://node-vercel-api-demo.vercel.app";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    company: "",
  });
  const [activeKey, setActiveKey] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsListLoading(true);
    try {
      const response = await fetch(`${API_URL}/employees`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsListLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      setFormData({ name: "", email: "", contact: "", company: "" });
      setActiveKey("1");
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/employees/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const tabs = [
    {
      key: "1",
      label: "Users",
      children: (
        <div style={{ height: "80vh", overflowY: "auto" }}>
          <h1>Users</h1>
          {isListLoading ? (
            <Spin size="large" />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      danger
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <div>
                        <p>
                          Email: <b>{item.email}</b>
                        </p>
                        <p>
                          Contact: <b>{item.contact}</b>
                        </p>
                        <p>
                          Company: <b>{item.company}</b>
                        </p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Add User",
      children: (
        <div>
          <h1>Add User</h1>
          <Form onFinish={handleSubmit}>
            {["name", "email", "contact", "company"].map((field) => (
              <Form.Item key={field}>
                <Input
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
                block
              >
                Add User
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <Layout>
        <Content style={{ padding: "0" }}>
          <Layout style={{ padding: "24px 0" }}>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Tabs
                activeKey={activeKey}
                items={tabs}
                size="large"
                onChange={(key) => setActiveKey(key)}
              />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
