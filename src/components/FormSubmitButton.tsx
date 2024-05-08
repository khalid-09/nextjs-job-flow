"use client";

import { useFormStatus } from "react-dom";
// import LoadingButton from "./LoadingButton";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

// export default function FormSubmitButton(
//   props: React.ButtonHTMLAttributes<HTMLButtonElement>,
// ) {
//   const { pending } = useFormStatus();

//   return <LoadingButton {...props} type="submit" loading={pending} />;
// }

// "use client ";

// import { useFormStatus } from "react-dom";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";

// const FormSubmitButton = (
//   props: React.ButtonHTMLAttributes<HTMLButtonElement>,
// ) => {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" {...props} disabled={props.disabled || pending}>
//       <span className="flex items-center justify-center gap-1">
//         {pending && <Loader2 className="animate-spin" size={16} />}
//         {props.children}
//       </span>
//     </Button>
//   );
// };

// export default FormSubmitButton;
const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-1">
        {pending && <Loader2 className="animate-spin" size={16} />}
        {props.children}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
