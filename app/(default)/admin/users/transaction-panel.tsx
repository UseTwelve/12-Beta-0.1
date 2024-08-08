"use client";

import { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { useFlyoutContext } from "@/app/flyout-context";
import { useMemberDetail } from "./transaction-context";
import { TransactionsProperties } from "./transactions-properties";
import Image from "next/image";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Toast from "@/components/toast";
import DropdownFull from "@/components/dropdown-full";
import { fetchRecords } from "@/lib/hooks/useRequests";

export default function MemberPanel({ onReload }: { onReload: () => void }) {
  const { flyoutOpen, setFlyoutOpen } = useFlyoutContext();
  const { member, setMember } = useMemberDetail();
  const { statusColor, amountColor } = TransactionsProperties();
  const panelContent = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(9997);
  const [role, setRole] = useState(9999);
  const [church, setChurch] = useState<number|null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const axiosAuth = useAxiosAuth();
  
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [churches, setChurches] = useState<{ id: number, name: string }[]>([]);

  const clearForm = () => {
    setFullName("");
    setPhoneNumber("");
    setChurch(null);
    setProfileImageFile(null);
    setMember(null); // Clear the member state as well
  };

  useEffect(() => {
    if (!flyoutOpen) {
      clearForm(); // Clear the form when the panel is closed
    }
  }, [flyoutOpen]);

  useEffect(() => {
    if (member) {
      setFullName(member.user.fullName);
      setEmail(member.user.email);
      setPhoneNumber(member.user.phoneNumber);
      setChurch(member.church.id);
    } else {
      clearForm();
    }
  }, [member]);

  const fetchChurches = async () => {
    try {
      const data = await fetchRecords(axiosAuth, "/admin/churches");
      setChurches(data.map((church: any) => ({ id: church.id, name: church.name })));
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  useEffect(() => {
    fetchChurches(); 
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("role", `${role}`);
    formData.append("userType", `${userType}`);
    formData.append("church", `${church}`);
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    try {
      let response;
      if (member) {
        response = await axiosAuth.patch(
          `/admin/users/${member.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axiosAuth.post("/admin/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await onReload();
      setFlyoutOpen(false);
      clearForm();
      setToastMessage("Member was added successfully!");
      setToastType("success");
      setToastOpen(true);
    } catch (error:any) {
      console.error("Error uploading member data:", error);
      if (error.response.data.message) {
        setToastMessage(error.response.data.message);
      } else {
        setToastMessage("Failed to save the member. Please try again.");
        
      }

      setToastType("error");
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition
      show={flyoutOpen}
      unmount={false}
      as="div"
      id="transaction-details"
      ref={panelContent}
      className="absolute inset-0 sm:left-auto z-20 shadow-xl"
      enter="transition-transform duration-200 ease-in-out"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-200 ease-in-out"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className="space-y-3">
      <Toast
        type={toastType}
        open={toastOpen}
        setOpen={setToastOpen}
        duration={5000}
      >
        {toastMessage}
      </Toast>
      </div>

      <div className="sticky top-16 bg-gradient-to-b from-gray-100 to-white dark:from-[#151D2C] dark:to-gray-900 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-l border-gray-200 dark:border-gray-700/60 w-full sm:w-[390px] h-[calc(100dvh-64px)]">
        <button
          ref={closeBtn}
          onClick={() => setFlyoutOpen(false)}
          className="absolute top-0 right-0 mt-6 mr-6 group p-2"
        >
          <svg
            className="fill-gray-400 group-hover:fill-gray-600 pointer-events-none"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
          </svg>
        </button>
        <div className="py-8 px-4 lg:px-8">
          <div className="max-w-sm mx-auto lg:max-w-none">
            <div className="text-gray-800 dark:text-gray-100 font-semibold text-center mb-1">
              {member ? "Update member" : "Add member"}
            </div>
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Profile Image
              </div>
              <form
                encType="multipart/form-data"
                className="rounded bg-gray-100 dark:bg-gray-700/30 border border-dashed border-gray-300 dark:border-gray-700/60 text-center px-5 py-8"
                onClick={() => document?.getElementById("profileImage")?.click()}
              >
                {profileImageFile ? (
                  <Image
                    src={URL.createObjectURL(profileImageFile)}
                    className="inline-flex"
                    width={160}
                    height={160}
                    alt="User profile Image"
                  />
                ) : member?.user.profileImage ? (
                  <Image
                    src={member.user.profileImage} // Use the existing profileImage from the API
                    className="inline-flex"
                    width={160}
                    height={160}
                    alt="User profile Image"
                  />
                ) : (
                  <svg
                    className="inline-flex fill-gray-400 dark:fill-gray-500 mb-3"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 4c-.3 0-.5.1-.7.3L1.6 10 3 11.4l4-4V16h2V7.4l4 4 1.4-1.4-5.7-5.7C8.5 4.1 8.3 4 8 4ZM1 2h14V0H1v2Z" />
                  </svg>
                )}

                <input
                  className="sr-only"
                  id="profileImage"
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profileImage"
                  className="block text-sm text-gray-500 dark:text-gray-400 italic"
                >
                  {profileImageFile ? "Change profileImage" : "Upload profileImage"}
                </label>
              </form>
            </div>
            <div className="mt-6">
              <div>
                <label
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  className="form-input w-full"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div className="mt-6">
              <div>
                <label
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  className="form-input w-full"
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder=" enter phone number"
                />
              </div>
            </div>
            <div className="mt-6">
              <div>
                <label
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                  htmlFor="phoneNumber"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="form-input w-full"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email"
                />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Assign church
              </h2>
              <DropdownFull
                items={churches}
                value={church}
                setValue={setChurch}
                placeholder="Select a church"
              />
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <div className="w-full">
                <button
                  className="btn w-full border-green-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-green-800 dark:text-gray-300"
                  onClick={handleSubmit}
                  disabled={loading} // Disable the button during loading
                >
                  {loading ? (
                    "Saving..." // Display a spinner during loading
                  ) : (
                    <span className="ml-2">Save</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}