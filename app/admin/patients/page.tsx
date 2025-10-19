"use client"

import React from "react"
import { Table, Input, Button, Space } from "antd"
import { SearchOutlined } from "@ant-design/icons"

const PatientsPage: React.FC = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-gray-900 dark:text-gray-100",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      className: "text-gray-900 dark:text-gray-100",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "text-gray-900 dark:text-gray-100",
    },
  ]

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ]

  const [searchText, setSearchText] = React.useState("")
  const [searchedColumn, setSearchedColumn] = React.useState("")

  const handleSearch = (selectedKeys: string[], confirm: any, dataIndex: string) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: any) => {
    clearFilters()
    setSearchText("")
  }

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            if (node) {
              node.focus()
            }
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value: string, record: any) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          document.querySelector(`.rc-table-filter-input-${dataIndex}`)?.focus()
        }, 0)
      }
    },
  })

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700">
      <Table
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            className: "text-gray-900 dark:text-gray-100",
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
            ...getColumnSearchProps("age"),
            className: "text-gray-900 dark:text-gray-100",
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
            ...getColumnSearchProps("address"),
            className: "text-gray-900 dark:text-gray-100",
          },
        ]}
        dataSource={data}
        className="bg-white dark:bg-gray-800"
      />
    </div>
  )
}

export default PatientsPage
