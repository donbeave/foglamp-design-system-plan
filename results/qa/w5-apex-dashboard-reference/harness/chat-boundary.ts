// Boundary-only AI SDK adapter. Original Foggy visual and resize functions are unchanged.
export class DefaultChatTransport{constructor(_options:unknown){}}
export function useChat(){const p=globalThis.__referenceBoundaryProps??{};return {messages:p.messages??[],status:p.status??'ready',error:p.error,sendMessage:p.onSendMessage??(()=>undefined),stop:p.onStop??(()=>undefined),regenerate:p.onRegenerate??(()=>undefined)};}
