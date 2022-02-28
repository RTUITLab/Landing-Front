import React from "react";

declare module 'react'{
  export interface HTMLAttributes<T> {
    scroll?:string,
    show?: string,
    ref?:React.RefObject<any>,
  }
}

export interface HeaderProps{
  appContainer:React.RefObject<any>
}
