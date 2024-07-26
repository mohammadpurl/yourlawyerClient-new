"use client";

// import { trpc } from '@/app/_trpc/client'
// import UploadButton from './UploadButton'
import {
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
  BookmarkIcon,
  SquareActivityIcon,
  Square,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// import  {groups, subGroups}  from "/co"
// import { getUserSubscriptionPlan } from '@/lib/stripe'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { subGroups, formatTypes } from "../../../public/constants";
import { RegisterForm } from "@/components/forms/RegisterForm";

// interface PageProps {
//   subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
// }

const Dashboard = () => {
  //   const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
  //     string | null
  //   >(null);

  const isLoading = false;

  //   const utils = trpc.useContext()

  //   const { data: files, isLoading } =
  //     trpc.getUserFiles.useQuery()

  //   const { mutate: deleteFile } =
  //     trpc.deleteFile.useMutation({
  //       onSuccess: () => {
  //         utils.getUserFiles.invalidate()
  //       },
  //       onMutate({ id }) {
  //         setCurrentlyDeletingFile(id)
  //       },
  //       onSettled() {
  //         setCurrentlyDeletingFile(null)
  //       },
  //     })

  return (
    <main className="flex flex-col mx-auto max-w-10xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">
          انواع درخواست ها
        </h1>

        {/* <UploadButton isSubscribed={subscriptionPlan.isSubscribed} /> */}
      </div>
      <div className="flex flex-row w-full">
        <div className="flex  w-fit bg-white border-border shadow-xl m-2">
          {subGroups && subGroups?.length !== 0 ? (
            <Accordion type="multiple">
              {subGroups.map((subGroup, index) => (
                <AccordionItem value={`item-${index}`} key={subGroup.id}>
                  <AccordionTrigger>
                    <span className=" flex text-xl text-blue-700 p-2 m-2">
                      {subGroup.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {formatTypes && formatTypes?.length !== 0
                      ? formatTypes.map((formatType) => {
                          if (formatType.subId === subGroup.id)
                            return (
                              <div
                                className="flex flex-col w-full m-2 items-start justify-start p-2 hover:bg-gray-200 gap-2"
                                key={formatType.id}
                              >
                                <div className="flex gap-2">
                                  <Plus />
                                  <span className=" font-sans font-bold hover:bg-none cursor-pointer">
                                    {formatType.name}
                                  </span>
                                </div>
                                <div className="flex p-2 font-medium ">
                                  <span>{formatType.desk}</span>
                                </div>
                              </div>
                            );
                        })
                      : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : null}
        </div>
        <div className="flex  w-3/4 max-h-screen h-full bg-white border-border shadow-xl  p-6 m-2">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
