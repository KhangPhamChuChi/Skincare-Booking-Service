"use client";

import { Card, Spin, Descriptions, Row, Col, Breadcrumb } from "antd";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useBookingById } from "../hooks/useGetBookingId";
import dayjs from "dayjs";
import StatusTag from "@/app/components/TagStatus";
import ActionButtons from "@/app/components/ButtonStatus";
import { useCheckInBooking } from "../hooks/useCheckInBooking";
import { useCompletedBooking } from "../hooks/useCompletedBooking";
import { useCancelledBooking } from "../hooks/useCancelledBooking";
import { useDeniedBooking } from "../hooks/useDeniedBooking";
import { useFinishedBooking } from "../hooks/useFinishedBooking";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const { mutate: updateCheckIn } = useCheckInBooking();
  const { mutate: updateCompleted } = useCompletedBooking();
  const { mutate: updateCancelled } = useCancelledBooking();
  const { mutate: updateDenied } = useDeniedBooking();
  const { mutate: updateFinished } = useFinishedBooking();
  const {
    data: booking,
    isLoading,
    isError,
  } = useBookingById((bookingId as string) || "");

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError || !booking) {
    return <div>Không tìm thấy lịch đặt</div>;
  }

  const handleCheckIn = async (bookingId: number) => {
    updateCheckIn({ BookingId: bookingId });
  };

  const handleCompleted = async (bookingId: number) => {
    updateCompleted({ BookingId: bookingId });
  };

  const handleCancelled = async (bookingId: number) => {
    updateCancelled({ BookingId: bookingId });
  };

  const handleDenied = async (bookingId: number) => {
    updateDenied({ BookingId: bookingId });
  };

  const handleFinished = async (bookingId: number) => {
    updateFinished({ BookingId: bookingId });
  };

  return (
    <div style={{ margin: "auto" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link href="/booking-management">Danh sách đặt lịch</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết lịch đặt</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Chi tiết lịch đặt #{booking.bookingId}</h2>
      <Row gutter={16}>
        <Col span={15}>
          <Card>
            <Descriptions title="Thông tin chung" bordered column={1}>
              <Descriptions.Item label="Khách hàng">
                {booking.customerId}
              </Descriptions.Item>
              <Descriptions.Item label="Điện thoại">
                {booking.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {booking.location}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt lịch">
                {dayjs(booking.date).format("DD/MM/YYYY HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="Tình trạng thanh toán">
                <StatusTag status={booking.status} />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={9}>
          <Card>
            <p>
              <b>Trạng thái:</b>{" "}
              <StatusTag status={booking.status} showLabel={true} />
            </p>
            <ActionButtons
              status={booking.status}
              bookingId={booking.bookingId}
              onCheckIn={handleCheckIn}
              onCancelled={handleCancelled}
              onCompleted={handleCompleted}
              onDenied={handleDenied}
              onFinished={handleFinished}
            />
            <h4 style={{ marginTop: 20 }}>Lịch sử trạng thái</h4>
            <p>
              🟢 {dayjs(booking.date).format("DD/MM/YYYY HH:mm:ss")} - Chờ xác
              nhận
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookingDetail;
