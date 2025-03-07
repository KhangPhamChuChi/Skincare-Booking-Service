"use client";

import { Card, Row, Col, Image, Button, Divider, Spin } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useRouter, useParams } from "next/navigation";
import { useServiceById } from "../hooks/useGetServiceId";
import { PagePath } from "@/app/enums/page-path.enum";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const ServiceDetail = () => {
  const router = useRouter();
  const { serviceId } = useParams();
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceById((serviceId as string) || "");

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError || !service) {
    return <div>Không tìm thấy người dùng</div>;
  }

  const handleNavigate = () => {
    router.push(PagePath.BOOKING_SERVICE);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#FBFEFB" }}>
      <Card
        style={{
          maxWidth: 1200,
          margin: "20px auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Image
              src={service.image}
              alt={service.name}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={14}>
            <Title level={2} style={{ marginBottom: 16 }}>
              {service.name}
            </Title>
            <Text style={{ fontSize: 16, color: "#555" }}>
              {service.description}
            </Text>
            <Divider />
            <div style={{ marginBottom: 16 }}>
              <DollarOutlined style={{ color: "#52c41a", marginRight: 8 }} />
              <Text strong>Giá:</Text> {service.price}
            </div>
            <Button
              type="primary"
              size="large"
              style={{ marginTop: 20 }}
              onClick={() => handleNavigate()}
            >
              Đặt lịch ngay
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ServiceDetail;
