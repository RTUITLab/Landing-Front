export interface StatusbarProps{
  count: number,
  onChange:(i:number)=>void,
  active:number,
}

declare module 'react'{
  export interface HTMLAttributes<T>{
    active?:string,
  }
}
