import React from "react";
import { Space, Spin } from "antd";

export default function Loader() {
    return (
    <div>
        <Space size="middle">
            <Spin size="large" />
        </Space>
        <h2>Loader</h2>
    </div>
    )
}