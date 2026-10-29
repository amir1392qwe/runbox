export interface CursorRefs {
  dot: HTMLDivElement | null;
  ring: HTMLDivElement | null;
  label: HTMLDivElement | null;
}

export interface CursorPosition {
  x: number;
  y: number;
}
export interface CursorState {
  x: number;
  y: number;
  ringX: number;
  ringY: number;
  hovered: boolean;
  visible: boolean;
  label: string;
}
