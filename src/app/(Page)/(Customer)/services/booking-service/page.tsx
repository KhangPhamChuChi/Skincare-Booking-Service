/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Card, Row, Col, Calendar, Badge, Button, Space, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useBookedSlot } from "../hooks/useGetBookedSlot";
import { useTherapists } from "../../therapists/hooks/useGetTherapist";
import { useBookingss } from "@/app/(Page)/(admin-staff-therapist)/booking-management/hooks/useGetBooking";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const generateSlots = () => {
  const slots = [];
  let currentTime = dayjs().set("hour", 8).set("minute", 0).set("second", 0);

  while (currentTime.hour() < 19) {
    slots.push(currentTime.format("HH:mm"));
    currentTime = currentTime.add(1, "hour").add(15, "minute");
  }

  return slots;
};

const SkincareBooking = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [slots] = useState<string[]>(generateSlots());
  const { data: therapists } = useTherapists();
  const { data: bookings } = useBookingss();
  const { data: bookedSlots } = useBookedSlot();

  const today = dayjs().startOf("day");

  const getBookedSlotsForDate = (date: string) => {
    if (!bookedSlots || !bookings) return [];
    const bookedSlotsForDate = bookedSlots
      .filter((slot) => {
        const booking = bookings.find((b) => b.bookingId === slot.bookingId);
        return booking?.date === date;
      })
      .map((slot) => slot.time);
    return bookedSlotsForDate;
  };

  const dateCellRender = (value: Dayjs) => {
    const date = value.format("YYYY-MM-DD");
    const bookedSlotsForDate = getBookedSlotsForDate(date);

    const morningSlots = slots.filter(
      (slot) => dayjs(slot, "HH:mm").hour() < 12
    );
    const afternoonSlots = slots.filter(
      (slot) => dayjs(slot, "HH:mm").hour() >= 12
    );

    return (
      <div>
        <div>
          <strong>Sáng:</strong>
          <Space direction="vertical" style={{ width: "100%" }}>
            {morningSlots.map((slot) => (
              <Badge
                key={slot}
                status={bookedSlotsForDate.includes(slot) ? "error" : "success"}
                text={
                  bookedSlotsForDate.includes(slot)
                    ? `Booked - ${slot}`
                    : `Available - ${slot}`
                }
              />
            ))}
          </Space>
        </div>
        <div style={{ marginTop: "10px" }}>
          <strong>Chiều:</strong>
          <Space direction="vertical" style={{ width: "100%" }}>
            {afternoonSlots.map((slot) => (
              <Badge
                key={slot}
                status={bookedSlotsForDate.includes(slot) ? "error" : "success"}
                text={
                  bookedSlotsForDate.includes(slot)
                    ? `Booked - ${slot}`
                    : `Available - ${slot}`
                }
              />
            ))}
          </Space>
        </div>
      </div>
    );
  };

  const disabledDate = (current: Dayjs) => {
    return current.isBefore(today);
  };

  const handleSelectExpert = (id: number, time: string) => {
    setSelectedExpert(id);
    setSelectedTime(time);
  };

  return (
    <div
      style={{
        backgroundColor: "#F1EBE4",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#3A5A40",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
      >
        Đặt Lịch Chăm Sóc Da
      </Title>

      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={18}>
          <Card
            title="Lịch làm việc"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Calendar
              cellRender={dateCellRender}
              disabledDate={disabledDate}
              onSelect={(value) => setSelectedDate(value.format("YYYY-MM-DD"))}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card
            title="Thông tin chuyên viên"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {selectedDate ? (
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Ngày đã chọn: {selectedDate}
                </Text>
                <div style={{ marginTop: "20px" }}>
                  {therapists?.map((expert) => (
                    <Card
                      key={expert.skintherapistId}
                      style={{
                        marginBottom: "10px",
                        backgroundColor: "#f9f9f9",
                        padding: "16px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease-in-out",
                      }}
                      hoverable
                    >
                      <Row align="middle">
                        <Col>
                          <img
                            src={expert.image}
                            alt={expert.name}
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <Title
                            level={4}
                            style={{ marginTop: "10px", color: "#3A5A40" }}
                          >
                            {expert.name}
                          </Title>
                          <Text style={{ color: "#6B705C" }}>
                            {expert.expertise}
                          </Text>

                          <div style={{ marginTop: "10px" }}>
                            <Space>
                              {slots.map((time) => (
                                <Button
                                  key={time}
                                  type={
                                    selectedExpert === expert.skintherapistId &&
                                    selectedTime === time
                                      ? "primary"
                                      : "default"
                                  }
                                  onClick={() =>
                                    handleSelectExpert(
                                      expert.skintherapistId,
                                      time
                                    )
                                  }
                                  disabled={getBookedSlotsForDate(
                                    selectedDate
                                  ).includes(time)}
                                  style={{
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    padding: "8px 16px",
                                  }}
                                >
                                  {time}
                                </Button>
                              ))}
                            </Space>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Text style={{ color: "#888" }}>
                Vui lòng chọn ngày trên lịch để xem lịch làm việc.
              </Text>
            )}

            {selectedExpert && (
              <div style={{ marginTop: "20px" }}>
                <Title level={4}>Xác nhận đặt lịch</Title>
                <Text>
                  Bạn đã chọn{" "}
                  <strong>
                    {
                      therapists?.find(
                        (e) => e.skintherapistId === selectedExpert
                      )?.name
                    }
                  </strong>{" "}
                  vào lúc <strong>{selectedTime}</strong> ngày{" "}
                  <strong>{selectedDate}</strong>.
                </Text>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => message.success("Đặt lịch thành công")}
                    style={{
                      backgroundColor: "#A7C957",
                      border: "none",
                      fontSize: "16px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#8AA851")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#A7C957")
                    }
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SkincareBooking;
