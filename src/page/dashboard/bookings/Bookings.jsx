"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ThumbsUp, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import haircut from "/haircut.png";
import massage from "/massage.png";
import perfume from "/perfume.png";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import BBooking from "@/components/bookings/BBooking";

const bookings = [
  {
    id: 1,
    date: "Jan 14, 2024-10:0 AM",
    salon: "Timeless Salon",
    service: "Hair Trim",
    description: "This is a placeholder for booked services",
    image: haircut,
    remindMe: true,
    status: "upcoming",
  },
  {
    id: 2,
    date: "Jan 9, 2024-10:0 AM",
    salon: "Timeless Salon",
    service: "Hair Trim",
    description: "This is a placeholder for booked services",
    image: massage,
    remindMe: true,
    status: "upcoming",
  },
  {
    id: 3,
    date: "Jan 14, 2024-10:0 AM",
    salon: "Timeless Salon",
    service: "Hair Trim",
    description: "This is a placeholder for booked services",
    image: perfume,
    remindMe: true,
    status: "completed",
  },
  {
    id: 4,
    date: "Jan 14, 2024-10:0 AM",
    salon: "Timeless Salon",
    service: "Hair Trim",
    description: "This is a placeholder for booked services",
    image: haircut,
    remindMe: true,
    status: "cancelled",
  },
];

export default function BookingManagement() {
  const { user } = useAuth();
  const role = user?.role;
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const tabs = ["Upcoming", "Completed", "Cancelled"];

  const getFilteredBookings = () => {
    const statusMap = {
      Upcoming: "upcoming",
      Completed: "completed",
      Cancelled: "cancelled",
    };
    return [...bookings, ...bookings, ...bookings].filter(
      (booking) => booking.status === statusMap[activeTab]
    );
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = async () => {
    setIsProcessing(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setSelectedBooking(null);
  };

  const handleCloseConfirmModal = () => {
    if (!isProcessing) {
      setShowConfirmModal(false);
      setSelectedBooking(null);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // If user is a service provider, show the provider bookings view
  if (role === "service_provider" || role === "business") {
    return (
      <DashboardLayout>
        <BBooking />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Main Content */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-3 flex mt-3 md:mt-3 items-center justify-between">
            <h1 className="md:text-2xl font-bold text-orange-800">Bookings</h1>
          </div>

          {/* Mobile Tabs */}
          <div className="bg-white lg:hidden border-b">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden lg:flex border-b">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Booking Grid */}
          <div className="flex-1 py-6 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {getFilteredBookings().map((booking, index) => (
                <Card
                  key={`${booking.id}-${index}`}
                  className="bg-white py-4 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] border border-gray-200"
                >
                  <CardContent className="p-0">
                    <div className="flex px-6 pt-4 w-full items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {booking.date}
                      </span>
                      {booking.status === "upcoming" && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Remind me</span>
                          <Switch />
                        </div>
                      )}

                      {booking.status !== "upcoming" && (
                        <div className="flex items-center justify-between mb-1">
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.status === "completed"
                                ? "bg-green-500 text-white"
                                : booking.status === "cancelled"
                                ? "bg-red-500 text-white"
                                : "bg-primary text-white"
                            }`}
                          >
                            {booking.status === "completed"
                              ? "Completed"
                              : booking.status === "cancelled"
                              ? "Cancelled"
                              : "Upcoming"}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={`flex px-6 py-4 w-full items-start gap-4`}>
                      <img
                        src={booking.image || "/placeholder.svg"}
                        alt="Salon"
                        width={64}
                        height={64}
                        className="rounded-xl object-cover shadow-md border border-gray-100"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-gray-900">
                          {booking.salon}
                        </h3>
                        <p className="text-sm text-primary font-medium mb-1">
                          {booking.service}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {booking.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex px-6 pb-4 w-full gap-2">
                      {booking.status === "upcoming" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 p-2 text-primary border border-primary rounded-full shadow-sm"
                            onClick={() => handleCancelClick(booking)}
                          >
                            Cancel booking
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 p-2 bg-primary text-white rounded-full shadow-sm"
                          >
                            View receipt
                          </Button>
                        </>
                      )}
                      {booking.status === "completed" && (
                        <Button
                          size="sm"
                          className="w-full p-2 bg-primary text-white rounded-full shadow-sm"
                        >
                          View receipt
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={handleCloseConfirmModal}
                disabled={isProcessing}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Cancel Booking?
                </h2>

                {selectedBooking && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={selectedBooking.image || "/placeholder.svg"}
                        alt="Service"
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-sm">
                          {selectedBooking.salon}
                        </p>
                        <p className="text-sm text-primary">
                          {selectedBooking.service}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedBooking.date}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 leading-relaxed mb-6">
                  Are you sure you want to cancel this booking? This action
                  cannot be undone and a refund will be processed to your
                  wallet.
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCloseConfirmModal}
                    disabled={isProcessing}
                    className="flex-1 p-2 rounded-full bg-white border border-primary hover:bg-gray-50 text-gray-700"
                  >
                    Keep Booking
                  </Button>
                  <Button
                    onClick={handleConfirmCancel}
                    disabled={isProcessing}
                    className="flex-1 p-2 rounded-full bg-red-600 hover:bg-red-700 text-white items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Cancelling...
                      </div>
                    ) : (
                      "Yes, Cancel"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={handleCloseSuccessModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <ThumbsUp className="h-8 w-8 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Booking Cancelled
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  You have successfully cancelled your booking and we`ll process
                  the refund to your wallet soon.
                </p>

                <Button
                  onClick={handleCloseSuccessModal}
                  className="w-full p-2 rounded-full bg-primary hover:bg-primary/90 text-white"
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
