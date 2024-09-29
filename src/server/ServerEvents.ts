export type ServerEvents = {
  onInitBefore?(): void | Promise<void>
  onInit?(): void | Promise<void>
  onInitAfter?(): void | Promise<void>

  onStartBefore?(): void | Promise<void>
  onStart?(): void | Promise<void>
  onStartAfter?(): void | Promise<void>

  onStopBefore?(): void | Promise<void>
  onStop?(): void | Promise<void>
  onStopAfter?(): void | Promise<void>
}
