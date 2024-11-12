import { EventType } from "../types";

export interface IEvent {
  source: string;
  destination: string;
  type: EventType;
}

export interface IComponentPosition {
  x: number;
  y: number;
  scale: number;
}
