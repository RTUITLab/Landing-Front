import React from "react";

declare module 'react'{
  export interface HTMLAttributes<T> {
    scroll?:any,
    show?:any
  }
}
