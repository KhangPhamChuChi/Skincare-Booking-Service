import useAuthStore from "../../(Authentication)/login/hooks/useAuthStore";
import { Form } from "antd";
import Text from "antd/es/typography/Text";

export default function ProfileInformation() {
  const [form] = Form.useForm();

  const { user } = useAuthStore();

  return (
    <Form form={form} initialValues={{}}>
      <Form.Item label={"Họ & Tên"}>
        <Text className=" font-medium">{user?.username}</Text>
      </Form.Item>
      <Form.Item label={"Số điện thoại"}>
        {/* <Text className=" font-medium">{user?.phoneNumber}</Text> */}
      </Form.Item>
      <Form.Item label={"Email"}>
        {/* <Text className=" font-medium">{user?.email}</Text> */}
      </Form.Item>
    </Form>
  );
}
