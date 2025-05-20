import React from "react";
import { Link } from "react-router-dom";

function Inactive() {
  return (
    <>
      <section className="w-full h-[100dvh] bg-primary_theme sm:pt-4">
        <div className="w-full lg:w-[70%] h-[100dvh] sm:h-[95vh] mx-auto block sm:flex flex-row p-3 bg-gray_100">
          <div className="w-full sm:w-1/2 h-[30dvh] sm:h-full order-last">
            <img
              className="w-full h-full object-cover rounded-md"
              src="./assets/auth.png"
              alt="Inactive Account"
            />
          </div>
          <div className="w-full h-[65dvh] sm:h-full sm:w-1/2 p-0 sm:p-4 text-gray-900">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-full text-center pb-4 pt-8">
                <h1 className="text-3xl font-semibold">Account Inactive</h1>
                <p className="text-base font-medium">
                  Your account is currently under verification, Please Hold.
                </p>
              </div>
              <div className="w-[90%] flex flex-col gap-3">
                <Link to="/login">
                  <button className="py-3 rounded-full border-2 border-secondary_theme2 hover:bg-secondary_theme2 hover:text-white w-full">
                    Back to Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Inactive;