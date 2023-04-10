import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function TextInput({
  label,
  variant,
  placeholder,
  type,
  important,
}: any) {
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <div>
            <p>
              {label}
              {important ? "*" : ""}
            </p>
            <Input placeholder={placeholder} />
          </div>
        );
      case "password":
        return (
          <div>
            <p>{label}</p>
            <Input.Password
              placeholder={placeholder}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
        );
    }
  };

  return <main>{renderInput()}</main>;
}
