import { PropsWithChildren } from 'react';
import { Footer } from './Footer';

export const Layout = (props: PropsWithChildren<unknown>) => {
  return (
    <div className="max-w-xl mx-auto px-4 md:px-0 my-4">
      {props.children}
      <hr className="my-8" />
      <Footer />
    </div>
  );
};
