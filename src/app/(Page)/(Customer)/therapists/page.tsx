"use client";

/* eslint-disable @next/next/no-img-element */
import { Card, Col, Row, Typography, Button } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTherapists } from "./hooks/useGetTherapist";
import { useTherapistStore } from "./hooks/useTherapistStore";

const { Title, Text } = Typography;

const SkinTherapistList = () => {
  const router = useRouter();
  const {
    data: therapistData,
    isLoading: isLoadingTherapist,
    error: errorTherapist,
  } = useTherapists();

  const { setTherapists } = useTherapistStore();

  const handleNavigate = (skintherapistId: number) => {
    router.push(`/therapists/${skintherapistId}`);
  };

  useEffect(() => {
    if (therapistData && !isLoadingTherapist && !errorTherapist) {
      setTherapists(therapistData);
    }
  }, [therapistData, isLoadingTherapist, errorTherapist, setTherapists]);

  return (
    <div style={{ padding: "20px" }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "30px", color: "#6f4e37" }}
      >
        Chọn chuyên viên trị liệu da cho bạn
      </Title>
      <Row gutter={[16, 16]}>
        {therapistData?.map((therapist) => (
          <Col xs={24} sm={12} md={8} lg={6} key={therapist.skintherapistId}>
            <Card
              hoverable
              style={{ borderRadius: "10px", textAlign: "center" }}
              cover={
                <img
                  alt={therapist.name}
                  src={therapist.image}
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              }
              actions={[
                <Button
                  type="text"
                  key="wishlist"
                  onClick={() => handleNavigate(therapist.skintherapistId)}
                >
                  Thông tin chi tiết
                </Button>,
              ]}
            >
              <Title level={4} style={{ marginBottom: "5px" }}>
                {therapist.name}
              </Title>
              <Text strong>{therapist.expertise}</Text>
              <br />
              <Text type="secondary">Kinh nghiệm: {therapist.experience}</Text>
              <br />
              <Text type="secondary">Bằng cấp: {therapist.degree}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SkinTherapistList;
