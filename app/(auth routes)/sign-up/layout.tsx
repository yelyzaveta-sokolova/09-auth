import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function SignUpLayout({ children }: Props) {
  return <>{children}</>;
}
