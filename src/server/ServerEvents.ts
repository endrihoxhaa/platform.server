export type ServerEvents = {
  onInit?(): void | Promise<void>
  onStart?(): void | Promise<void>
  onStop?(): void | Promise<void>
}
