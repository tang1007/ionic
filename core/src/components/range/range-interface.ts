
export const enum Knob {
  None,
  A,
  B
}

export type RangeValue = number | {lower: number, upper: number};

export interface RangeEventDetail extends Event {
  isIncrease: boolean;
  knob: Knob;
}
