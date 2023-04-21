import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";

export default function useBecomeVendor() {

  const router = useRouter()
  const { isLoading, session, error } = useSessionContext();


  const [contactDetail, setContactDetail] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log("Response received", res);
        if (res.status === 200) {
          // console.log("Response succeeded!");
          toast("Thank you for contacting us!");
        } else {
          // console.log("Email/Password is invalid.");
          toast("Email/Password is invalid.");
        }
      })
      .catch((e) => console.log(e));
      reset()
  };

  // console.log("contact Detail", contactDetail);
  if(!session && !isLoading){
    router.push('/login')
  }

  return (
    <>
      <div className="h-screen relative bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="h-full relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Become a Vendor!
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                In order to be eligable for Vendor status, we must approve of you first.
              </p>
              <div className="mt-8 text-base text-gray-500">
                    <p className="pb-3">Send us an application:</p>
                    <div className="pl-4">

                    <p>- Fill out your name</p>
                    <p>- Fill out your Email</p>
                    <p>- Fill in a Description of yourself and what you would like to sell</p>

                </div>
              </div>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="max-w-lg mx-auto lg:max-w-none text-black">
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                className="grid grid-cols-1 gap-y-6"
              >
                <div>
                  <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Full name</h1>
                  <label htmlFor="fullName" className="sr-only">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    autoComplete="name"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="John Doe"

                    {...register("fullName", { required: true })}
                  />
                </div>
                <div>
                  <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Email</h1>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="JohnDoe@example.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Subject</h1>
                  <label htmlFor="subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    type="text"
                    disabled={true}
                    id="subject"
                    autoComplete="subject"
                    className="block w-full shadow-sm py-3 px-4 bg-gray-200 placeholder-gray-600 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="New Vendor Application"
                    {...register("subject", { required: false })}
                  />
                </div>
                <div>
                  <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Vendor Description</h1>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    placeholder="I am a local farmer and would like to set up a shop from my front lawn. I would sell every friday at X time..."
                    defaultValue={""}
                    {...register("message", { required: true })}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
