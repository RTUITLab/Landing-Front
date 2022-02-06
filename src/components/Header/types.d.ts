import React from "react";

declare module 'react'{
  export interface HTMLAttributes<T> {
    scroll?:any,
    show?:any,
  }
}

export interface HeaderProps{
  appContainer:React.RefObject<any>
}
