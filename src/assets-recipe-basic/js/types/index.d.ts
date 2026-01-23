export interface Subject {
  attach(observer: any): void

  // Detach an observer from the subject.
  detach(observer: any): void

  // Notify all observers about an event.
  notify(): void
}

export interface Observer {
  // Receive update from subject.
  update(subject: Subject): void
}
