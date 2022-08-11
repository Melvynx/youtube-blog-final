import { PropsWithChildren } from 'react';

export const Layout = (props: PropsWithChildren<unknown>) => {
  return <div className="max-w-xl mx-auto px-4 md:px-0 my-4">{props.children}</div>;
};
