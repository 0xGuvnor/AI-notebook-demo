import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
};
export default AuthLayout;
