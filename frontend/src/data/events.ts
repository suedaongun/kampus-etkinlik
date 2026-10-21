// src/data/events.ts
import type { CampusEvent } from "../types/campus-event";

export const initialEvents: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 120,
    date: "2026-10-25",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla söyleşiler ve sektör temsilcileri ile buluşma.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Kodlama Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-02",
    time: "10:30",
    location: "B Blok Lab 2",
    description: "Arduino ve temel sensör uygulamaları pratik çalışması.",
    image: "/afis.svg"
  }
];