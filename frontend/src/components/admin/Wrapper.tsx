import React, { PropsWithChildren } from "react";
import Menu from "./Menu";

const Wrapper = (props: PropsWithChildren<any>) => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
