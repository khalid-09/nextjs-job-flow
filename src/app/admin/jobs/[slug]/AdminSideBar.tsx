"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveSubmission, rejectSubmisson } from "./actions";

interface AdminSideBarProps {
  job: Job;
}

const AdminSideBar = ({ job }: AdminSideBarProps) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved!
        </span>
      ) : (
        <ApproveSubmissonButton jobId={job.id} />
      )}
      <DelteJobButton jobId={job.id} />
    </aside>
  );
};

interface AdminButtonProps {
  jobId: number;
}

const ApproveSubmissonButton = ({ jobId }: AdminButtonProps) => {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
};

const DelteJobButton = ({ jobId }: AdminButtonProps) => {
  const [formState, formAction] = useFormState(rejectSubmisson, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Reject
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
};

export default AdminSideBar;
