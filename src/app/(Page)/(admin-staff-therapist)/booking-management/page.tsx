"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, Flex, Tabs } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useBookings } from "./hooks/useGetBooked";
import { useBookingss } from "./hooks/useGetBooking";
import { useBookingStore } from "./hooks/useBookedStore";
import { useCheckInBooking } from "./hooks/useCheckInBooking";
import { useCompletedBooking } from "./hooks/useCompletedBooking";
import { useCancelledBooking } from "./hooks/useCancelledBooking";
import { useDeniedBooking } from "./hooks/useDeniedBooking";
import { Status } from "@/app/enums/status-booking";
import { showActionConfirmModal } from "@/app/components/ConfirmModal";
import { useRouter } from "next/navigation";
import { BookingDto } from "./dto/booking.dto";
import { ColumnsType } from "antd/es/table";
import StatusTag from "@/app/components/TagStatus";
import useAuthStore from "@/app/(Page)/(Authentication)/login/hooks/useAuthStore";
import { RoleCode } from "@/app/enums/role.enum";

const BookingListTable = () => {
  const {
    data: bookingData,
    isLoading: isLoadingBooking,
    error: errorBooking,
  } = useBookingss();

  const {
    data: bookedData,
    isLoading: isLoadingBooked,
    error: errorBooked,
    refetch: refetchBooked,
  } = useBookings(Status.BOOKED);

  const {
    data: finishedData,
    isLoading: isLoadingFinished,
    error: errorFinished,
    refetch: refetchFinished,
  } = useBookings(Status.FINISHED);

  const {
    data: checkInData,
    isLoading: isLoadingCheckIn,
    error: errorCheckIn,
  } = useBookings(Status.CHECK_IN);

  const {
    data: cancelledData,
    isLoading: isLoadingCancelled,
    error: errorCancelled,
  } = useBookings(Status.CANCELLED);

  const {
    data: deniedData,
    isLoading: isLoadingDenied,
    error: errorDenied,
  } = useBookings(Status.DENIED);

  const {
    data: completedData,
    isLoading: isLoadingCompleted,
    error: errorCompleted,
  } = useBookings(Status.COMPLETED);

  const { setBookings } = useBookingStore();
  const { mutate: updateCheckIn } = useCheckInBooking();
  const { mutate: updateCompleted } = useCompletedBooking();
  const { mutate: updateCancelled } = useCancelledBooking();
  const { mutate: updateDenied } = useDeniedBooking();
  const router = useRouter();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuthStore();

  useEffect(() => {
    if (bookingData && !isLoadingBooking && !errorBooking) {
      setBookings(bookingData);
    }
    if (bookedData && !isLoadingBooked && !errorBooked) {
      setBookings(bookedData);
    }
    if (finishedData && !isLoadingFinished && !errorFinished) {
      setBookings(finishedData);
    }
    if (checkInData && !isLoadingCheckIn && !errorCheckIn) {
      setBookings(checkInData);
    }
    if (deniedData && !isLoadingDenied && !errorDenied) {
      setBookings(deniedData);
    }
    if (completedData && !isLoadingCompleted && !errorCompleted) {
      setBookings(completedData);
    }
    if (cancelledData && !isLoadingCancelled && !errorCancelled) {
      setBookings(cancelledData);
    }
  }, [
    bookingData,
    isLoadingBooking,
    errorBooking,
    bookedData,
    isLoadingBooked,
    errorBooked,
    finishedData,
    isLoadingFinished,
    errorFinished,
    checkInData,
    isLoadingCheckIn,
    errorCheckIn,
    completedData,
    isLoadingCompleted,
    errorCompleted,
    deniedData,
    isLoadingDenied,
    errorDenied,
    cancelledData,
    isLoadingCancelled,
    errorCancelled,
    setBookings,
  ]);

  const handleConfirmAction = async (
    action: "checkin" | "checkout" | "cancel" | "deny",
    bookingId: number
  ): Promise<void> => {
    const actionFunctions = {
      checkin: updateCheckIn,
      checkout: updateCompleted,
      cancel: updateCancelled,
      deny: updateDenied,
    };

    actionFunctions[action](
      { BookingId: bookingId },
      {
        onSuccess: () => {
          if (action === "checkin" || action === "cancel") {
            refetchBooked();
          } else {
            refetchFinished();
          }
        },
      }
    );
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const handleNavigate = (bookingId: number) => {
    router.push(`/booking-management/${bookingId}`);
  };

  const columns: ColumnsType<BookingDto> = [
    {
      title: "No",
      dataIndex: "No",
      fixed: "left",
      width: 50,
      render: (_value: any, _record: any, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "BookingID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Khách hàng",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <StatusTag status={status} />,
      //   {
      //   const statusMap: Record<string, JSX.Element> = {
      //     [Status.BOOKED]: <Tag color="blue">Booked</Tag>,
      //     [Status.FINISHED]: <Tag color="lime">Finished</Tag>,
      //     [Status.CHECK_IN]: <Tag color="gold">Check-In</Tag>,
      //     [Status.COMPLETED]: <Tag color="green">Finished</Tag>,
      //     [Status.DENIED]: <Tag color="red">Denied</Tag>,
      //     [Status.CANCELLED]: <Tag color="error">Cancelled</Tag>,
      //   };
      //   return statusMap[status] || <Tag color="default">Unknown</Tag>;
      // },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: unknown, record: { bookingId: number; status: string }) => (
        <Space>
          {record.status === Status.BOOKED && (
            <Tooltip title="Check-in">
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() =>
                  showActionConfirmModal({
                    action: "checkin",
                    bookingId: record.bookingId,
                    onConfirm: (bookingId) =>
                      handleConfirmAction("checkin", bookingId),
                  })
                }
              />
            </Tooltip>
          )}
          {record.status === Status.FINISHED && (
            <Tooltip title="Không thanh toán">
              <Button
                icon={<PayCircleOutlined />}
                onClick={() =>
                  showActionConfirmModal({
                    action: "deny",
                    bookingId: record.bookingId,
                    onConfirm: (bookingId) =>
                      handleConfirmAction("deny", bookingId),
                  })
                }
              />
            </Tooltip>
          )}
          <Tooltip title="Chi tiết">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleNavigate(record.bookingId)}
            />
          </Tooltip>
          {record.status === Status.BOOKED && (
            <Tooltip title="Hủy">
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={() =>
                  showActionConfirmModal({
                    action: "cancel",
                    bookingId: record.bookingId,
                    onConfirm: (bookingId) =>
                      handleConfirmAction("cancel", bookingId),
                  })
                }
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách đặt lịch</div>
      </Flex>
      <hr style={{ opacity: 0.1 }} />

      {user?.role == RoleCode.STAFF ? (
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Tất cả" key="all">
            <Table
              dataSource={bookingData}
              columns={columns}
              loading={isLoadingBooking}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã đặt" key="booked">
            <Table
              dataSource={bookedData}
              columns={columns}
              loading={isLoadingBooked}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 5 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hoàn thành làm dịch vụ" key="finished">
            <Table
              dataSource={finishedData}
              columns={columns}
              loading={isLoadingFinished}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 5 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã check-in" key="checkIn">
            <Table
              dataSource={checkInData}
              columns={columns}
              loading={isLoadingCheckIn}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 5 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hủy" key="cancelled">
            <Table
              dataSource={cancelledData}
              columns={columns}
              loading={isLoadingCancelled}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 5 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hủy thanh toán" key="denied">
            <Table
              dataSource={deniedData}
              columns={columns}
              loading={isLoadingDenied}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 5 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hoàn thành thanh toán" key="completed">
            <Table
              dataSource={completedData}
              columns={columns}
              loading={isLoadingCompleted}
              rowKey="bookingId"
              bordered
              onChange={handleTableChange}
              pagination={{ pageSize: 5 }}
            />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Table
          dataSource={checkInData}
          columns={columns}
          loading={isLoadingCheckIn}
          rowKey="bookingId"
          bordered
          onChange={handleTableChange}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default BookingListTable;
