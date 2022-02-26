export declare module 'react'{
  export interface HTMLAttributes<T> {
    hide?:string,
    invert?:string,
    lastelem?:string,
    name?:string,
  }
}

export interface GalleryProps {
  children: any,
  active?: number,
  onMouseDown?: (e: any) => void,
  onMouseUp?: (e: any) => void,
  onChange?: (e: number) => void
}

export interface GalleryItemProps {
  children: any,
  hide?:boolean
}


