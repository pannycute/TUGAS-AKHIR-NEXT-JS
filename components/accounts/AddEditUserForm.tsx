import React, { useState, useEffect } from "react";
import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { User, useUserStore } from "../../stores/userStore";
import { Eye, EyeOff } from "lucide-react";
import InputSelect from "../input/InputSelect";
import { useToast } from "../toast/ToastProvider";

interface AddEditUserProps {
  initialData?: User | null;
  buttonLabel?: any;
}

const AddEditUserForm: React.FC<AddEditUserProps> = ({
  initialData = null,
  buttonLabel,
}) => {
  const [visible, setVisible] = useState(false);
  const isEditMode = !!initialData?.user_id;
  const { showToast } = useToast();

  const [form, setForm] = useState<Partial<User>>({
    user_id: undefined,
    name: "",
    email: "",
    role: "user",
    password: "",
    oldPassword: "", // untuk edit mode
    newPassword: "", // untuk edit mode
  });

  // State untuk toggle visibility password
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { addOne, updateOne, loading } = useUserStore();

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  // Reset form ketika modal dibuka
  useEffect(() => {
    if (visible) {
      if (initialData) {
        setForm({
          user_id: initialData.user_id,
          name: initialData.name || "",
          email: initialData.email || "",
          role: initialData.role || "user",
          oldPassword: "",
          newPassword: "",
        });
      } else {
        setForm({
          user_id: undefined,
          name: "",
          email: "",
          role: "user",
          password: "",
        });
      }
    }
  }, [visible, initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && form.user_id) {
        await updateOne(form.user_id, form);
        showToast("Succses update user", "success");
      } else {
        await addOne(form);
        showToast("Succses create user", "success");
      }
      closeHandler();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div>
      <Button auto onClick={handler}>
        {buttonLabel || (isEditMode ? "Edit User" : "Add User")}
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            {isEditMode ? "Edit User" : "Add New User"}
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            direction={"column"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
              "@lg": { flexWrap: "nowrap", gap: "$12" },
            }}
          >
            <Input
              label="Full Name"
              name="name"
              bordered
              clearable
              fullWidth
              size="lg"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              clearable
              bordered
              fullWidth
              size="lg"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />

            {/* Role Select */}
            <InputSelect
              label="Role"
              options={[
                { id: "admin", label: "Admin" },
                { id: "user", label: "User" },
              ]}
              selectedId={form.role ?? null}
              onChange={(option) => {
                if (option) {
                  setForm((prev) => ({ ...prev, role: option.id as string }));
                }
              }}
            />

            {/* Password Fields */}
            {isEditMode ? (
              // Edit Mode: Old Password dan New Password
              <>
                <Input
                  label="Old Password"
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  bordered
                  clearable
                  fullWidth
                  size="lg"
                  placeholder="Enter current password"
                  value={form.oldPassword ?? ""}
                  onChange={handleChange}
                />

                <Input
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  bordered
                  clearable
                  fullWidth
                  size="lg"
                  placeholder="Enter new password"
                  value={form.newPassword ?? ""}
                  onChange={handleChange}
                />
              </>
            ) : (
              // Add Mode: Single Password
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Enter password"
                value={form.password ?? ""}
                onChange={handleChange}
              />
            )}
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : isEditMode ? "Update User" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddEditUserForm;
