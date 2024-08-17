"use client";

import { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { useFlyoutContext } from "@/app/flyout-context";
import { useChurchDetail } from "./transaction-context";
import { TransactionsProperties } from "./transactions-properties";
import Image from "next/image";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Toast from "@/components/toast";

export default function ChurchPanel({ onReload }: { onReload: () => void }) {
  const { flyoutOpen, setFlyoutOpen } = useFlyoutContext();
  const { church, setChurch } = useChurchDetail();
  const { statusColor, amountColor } = TransactionsProperties();
  const panelContent = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState("");
  const [chmsName, setChmsName] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [hasCrm, setHasCrm] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const axiosAuth = useAxiosAuth();

  
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const clearForm = () => {
    setName("");
    setChmsName("");
    setPhysicalAddress("");
    setHasCrm(false);
    setLogoFile(null);
    setChurch(null); // Clear the church state as well
  };

  useEffect(() => {
    if (!flyoutOpen) {
      clearForm(); // Clear the form when the panel is closed
    }
  }, [flyoutOpen]);

  useEffect(() => {
    if (church) {
      setName(church.name);
      setChmsName(church.chmsName);
      setPhysicalAddress(church.physicalAddress);
      setHasCrm(church.hasCrm);
    } else {
      clearForm();
    }
  }, [church]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("chmsName", chmsName);
    formData.append("physicalAddress", physicalAddress);
    formData.append("hasCrm", hasCrm.toString());
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      let response;
      if (church) {
        response = await axiosAuth.patch(
          `/admin/churches/${church.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axiosAuth.post("/admin/churches", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await onReload();
      setFlyoutOpen(false);
      clearForm();
      setToastMessage("Church saved successfully!");
      setToastType("success");
      setToastOpen(true);
    } catch (error) {
      console.error("Error uploading church data:", error);
      setToastMessage("Failed to save the church. Please try again.");
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
              {church ? "Update church" : "Add church"}
            </div>
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Logo
              </div>
              <form
                encType="multipart/form-data"
                className="rounded bg-gray-100 dark:bg-gray-700/30 border border-dashed border-gray-300 dark:border-gray-700/60 text-center px-5 py-8"
                onClick={() => document?.getElementById("logo")?.click()}
              >
                {logoFile ? (
                  <Image
                    src={URL.createObjectURL(logoFile)}
                    className="inline-flex"
                    width={160}
                    height={160}
                    alt="Church Logo"
                  />
                ) : church?.logo ? (
                  <Image
                    src={church.logo} // Use the existing logo from the API
                    className="inline-flex"
                    width={160}
                    height={160}
                    alt="Church Logo"
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
                  id="logo"
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="logo"
                  className="block text-sm text-gray-500 dark:text-gray-400 italic"
                >
                  {logoFile ? "Change logo" : "Upload logo"}
                </label>
              </form>
            </div>
            <div className="mt-6">
              <div>
                <label
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                  htmlFor="name"
                >
                  Church name
                </label>
                <input
                  id="name"
                  className="form-input w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name of the church"
                />
              </div>
            </div>
            <div className="mt-6">
              <div>
                <label
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                  htmlFor="chmsName"
                >
                 ChMs Name
                </label>
                <input
                  id="chmsName"
                  className="form-input w-full"
                  type="text"
                  value={chmsName}
                  onChange={(e) => setChmsName(e.target.value)}
                  placeholder="Name in the CRM"
                />
              </div>
            </div>
            <div className="mt-6">
              <div>
                <label
                  className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2"
                  htmlFor="physicalAddress"
                >
                  Physical Address
                </label>
                <input
                  id="physicalAddress"
                  className="form-input w-full"
                  type="text"
                  value={physicalAddress}
                  onChange={(e) => setPhysicalAddress(e.target.value)}
                  placeholder="Location of the church"
                />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Church has CRM
              </h2>
              <div className="flex flex-wrap items-center -m-3">
                <div className="m-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasCrm"
                      className="form-radio"
                      checked={hasCrm}
                      onChange={() => setHasCrm(true)}
                    />
                    <span className="text-sm ml-2">Yes</span>
                  </label>
                </div>
                <div className="m-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasCrm"
                      className="form-radio"
                      checked={!hasCrm}
                      onChange={() => setHasCrm(false)}
                    />
                    <span className="text-sm ml-2">No</span>
                  </label>
                </div>
              </div>
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
