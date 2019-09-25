export default {
  eventList: new Map(),
  on(event: string, callback?: Function) {
    this.eventList.has(event) || this.eventList.set(event, new Set())
    this.eventList.get(event).add(callback)
    return this
    // return () => this.eventList.get(event).delete(callback)
  },
  emit(event: string, ...args: any[]) {
    if (!this.eventList.has(event)) {
      console.warn(`<${event}> Event is not registered. Did you forgot to bind the event ?`)
      return false
    }
    this.eventList.get(event).forEach((cb: Function) => cb.call(this, ...args))
    return true
  },
  off(event: string) {
    this.eventList.has(event) && this.eventList.delete(event)
    return this
  }
}
