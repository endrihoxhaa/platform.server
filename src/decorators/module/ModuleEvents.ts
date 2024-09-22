export interface ModuleEvents {
  onBoot?(): void | Promise<void>
  onStart?(): void | Promise<void>
  onStop?(): void | Promise<void>
}
