import React from "react";

declare module 'react'{
  export interface HTMLAttributes<T> {
    scroll?:string,
    show?:string,
  }
}

export interface HeaderProps{
  appContainer:React.RefObject<any>
}
