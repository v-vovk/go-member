import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Button, Form, Input, Layout, Skeleton, Space, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { addContact, fetchContacts } from "../../store/actions/contacts";

import "./Contacts.scss";
import { AlertBar } from "../../components/AlertBar/AlertBar";

const { Content } = Layout;

const Contacts: React.FC = () => {
  const { contacts, error, loading } = useTypedSelector(
    (state) => state.contacts
  );
  const [tableContacts, setTableContacts] = useState<any[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    setTableContacts(
      contacts.map((contact, idx) => {
        return {
          key: contact.id,
          number: idx + 1,
          name: contact.identity.name,
          email: contact.identity.email,
          date: new Date(contact.identity.registrationDate).toLocaleString(),
        };
      })
    );
  }, [contacts]);

  const columns = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registration Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    dispatch(addContact(values));
  };

  return (
    <Layout className="layout">
      <Content className="layout__container">
        <div className="site-layout-content">
          {error && <AlertBar error={error} />}

          <Space style={{ width: "100%", marginBottom: "20px" }}>
            <Form
              form={form}
              name="addMember"
              onFinish={onFinish}
              layout="inline"
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Full Name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  htmlType="submit"
                >
                  Add Member
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
              </Form.Item>
            </Form>
          </Space>

          {loading && contacts.length > 0 ? (
            <Skeleton />
          ) : (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Table dataSource={tableContacts} columns={columns} />
            </Space>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Contacts;
