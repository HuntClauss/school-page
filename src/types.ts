export type ITouchCtx = {
    start: number | undefined;
    boundaries: number[];
    position: number;
    distance: number;
    moving: boolean;
}