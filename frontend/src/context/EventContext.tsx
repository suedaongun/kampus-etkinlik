import React, { createContext, useContext, useState, useEffect } from "react";
import type { CampusEvent, EventFormData } from "../types/campus-event";
import { initialEvents } from "../data/events";

interface EventContextType {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => CampusEvent | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem("campus_events");
    return saved ? JSON.parse(saved) : initialEvents;
  });

  useEffect(() => {
    localStorage.setItem("campus_events", JSON.stringify(events));
  }, [events]);

  const addEvent = (data: EventFormData) => {
    const newEvent: CampusEvent = {
      ...data,
      id: `event-${Date.now()}`
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, data: EventFormData) => {
    setEvents((prev) =>
      prev.map((item) => (item.id === id ? { ...data, id } : item))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  const getEventById = (id: string) => events.find((e) => e.id === id);

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEventById }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents bir EventProvider içinde kullanılmalıdır.");
  return context;
};