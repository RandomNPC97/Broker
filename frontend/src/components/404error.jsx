import React from "react";

function ErrorPage() {
  return (
    <>
      <section className="w-full h-full bg-[#EDF7F5]">
        <div className="min-h-screen sm:h-full p-14 flex justify-center items-center">
          <img className="object-cover" src="./assets/404.png" alt="" />
        </div>
      </section>
    </>
  );
}

export default ErrorPage;
