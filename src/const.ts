export const working_days = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];
export const times = [
    {start: '08:05', end: '08:10'},
    {start: '08:55', end: '09:05'},
    {start: '09:50', end: '10:00'},
    {start: '10:45', end: '11:00'},
    {start: '11:45', end: '11:55'},
    {start: '12:40', end: '13:00'},
    {start: '13:45', end: '14:05'},
    {start: '14:50', end: '15:00'},
    {start: '15:45', end: '15:55'},
    {start: '16:40', end: '16:45'},
    {start: '17:30', end: '17:35'},
]

export interface ITouchCtx {
    start: number | undefined;
    boundaries: number[];
    index: number;
    width: number;
    // end: number | undefined;
}


