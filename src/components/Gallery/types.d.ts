export interface GalleryProps {
  children: any,
  active?: number,
  onMouseDown?: (e: any) => void,
  onMouseUp?: (e: any) => void,
  onChange?: (e: number) => void
}

export interface GalleryItemProps {
  children: any
}
